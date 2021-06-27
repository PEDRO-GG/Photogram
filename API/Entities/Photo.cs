using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Photos")]
    public class Photo
    {
        public int Id { get; set; }
        public string PublicId { get; set; } // Needed for cloudinary
        public string Url { get; set; }

    }
}