using System;
using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    // Instead of sending a AppUser back, we send this more condensed Dto to avoid sending the password
    public class MemberDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public int Age { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string Introduction { get; set; }
        
        public ICollection<PostDto> Posts { get; set; }
        public PhotoDto ProfilePicture {get; set;}
    }
}