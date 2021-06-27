using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Posts")]
    public class Post
    {
        public int Id { get; set; }
        public string Caption { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        
        public Photo Photo { get; set; }
        public AppUser PostedBy { get; set; }
    }
}