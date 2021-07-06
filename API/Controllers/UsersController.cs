using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        private readonly IPostRepository _postRepository;

        public UsersController(IUserRepository userRepository, IMapper mapper, IPhotoService photoService, IPostRepository postRepository)
        {
            _postRepository = postRepository;
            _photoService = photoService;
            _mapper = mapper;
            _userRepository = userRepository;

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await _userRepository.GetMembersAsync();
            return Ok(users);
        }

        [HttpGet("{username}", Name = "GetUser")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            var user = await _userRepository.GetMemberAsync(username);
            return user;
        }

        [Authorize]
        [HttpPut]
        public async Task<ActionResult> UpdateUser(UpdateUserDto updatedUser)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier).Value; // get username out of Bearer token
            var user = await _userRepository.GetUserByUsernameAsync(username);

            _mapper.Map(updatedUser, user);

            _userRepository.Update(user);

            if (await _userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update user");
        }

        [Authorize]
        [HttpPost("create-post")]
        public async Task<ActionResult<PostDto>> CreatePost([FromForm] string Caption, [FromForm] IFormFile Photo)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier).Value; // get username out of Bearer token

            var user = await _userRepository.GetUserByUsernameAsync(username); // find that user by username

            var result = await _photoService.AddPhotoAsync(Photo); // upload provided photo to Cloudinary

            if (result.Error != null) return BadRequest(result.Error.Message);

            var post = new Post
            {
                Caption = Caption,
                Photo = new Photo
                {
                    PublicId = result.PublicId,
                    Url = result.SecureUrl.AbsoluteUri
                }
            };

            user.Posts.Add(post); // this new post belongs to this user

            if (await _userRepository.SaveAllAsync())
            {
                // If post successfully created, send 201 response
                return CreatedAtRoute("GetUser", new { username = user.Username }, _mapper.Map<PostDto>(post));
            }


            return BadRequest("Problem creating post");
        }

        [Authorize]
        [HttpPut("set-main-photo/{photoId}")]
        public async Task<ActionResult> SetMainPhoto(int photoId)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier).Value; // get username out of Bearer token

            var user = await _userRepository.GetUserByUsernameAsync(username); // find user with that username

            var posts = await _postRepository.GetPostsByUsernameAsync(username); // find the posts belonging to this user

            var photo = posts.SingleOrDefault(post => post.Photo.Id == photoId).Photo; // find the desired photo

            if (photo.Id == user.ProfilePicture.Id) return BadRequest("This is already your main photo");

            user.ProfilePicture = photo;

            if (await _userRepository.SaveAllAsync()) return NoContent(); // 204

            return BadRequest("Failed to set main photo");
        }
    }
}