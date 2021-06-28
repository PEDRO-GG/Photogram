using System;

namespace API.DTOs
{
    public class PostDto
    {
         public int Id { get; set; }
        public string Caption { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        
        public PhotoDto Photo { get; set; }
        public string PostedBy{get;set;}
    }
}