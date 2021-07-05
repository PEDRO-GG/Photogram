using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IPostRepository
    {
        Task<IEnumerable<PostDto>> GetPostsAsync();
        Task<IEnumerable<Post>> GetPostsByUsernameAsync(string username);
    }
}