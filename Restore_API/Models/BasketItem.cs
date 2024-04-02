using System.ComponentModel.DataAnnotations.Schema;

namespace Restore_API.Models
{
    [Table("BasketItems")]
    public class BasketItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        //navigation property[relationship between basket and product entity]
        public int ProductId { get; set; }
 
        public Product Product { get; set; }

        public int BasketId { get; set; }
        [ForeignKey("BasketId")]
        public Basket Basket { get; set; }
    }
}