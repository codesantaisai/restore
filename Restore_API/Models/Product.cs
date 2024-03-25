using System.ComponentModel.DataAnnotations;

namespace Restore_API.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public long Price { get; set; }
        public string PictureUrl { get; set; }
        public string Type { get; set;}
        public string Brand { get; set; }
        public int QuantityInStock { get; set; }
    }
}
