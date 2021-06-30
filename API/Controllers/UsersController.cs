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

        public UsersController(IUserRepository userRepository, IMapper mapper, IPhotoService photoService)
        {
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

        [HttpGet("{username}", Name="GetUser")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            var user = await _userRepository.GetMemberAsync(username);
            return user;
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
    }
}