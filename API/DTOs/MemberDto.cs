using System;
using System.Collections.Generic;

namespace API.DTOs
{
    // Instead of sending a AppUser back, we send this more condensed Dto to avoid sending the password
    public class MemberDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string PhotoUrl { get; set; }
        public int Age { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string Introduction { get; set; }
        public ICollection<PhotoDto> Photos { get; set; }
    }
}