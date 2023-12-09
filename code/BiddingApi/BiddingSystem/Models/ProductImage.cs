using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BiddingSystem.Models
{
    public class ProductImage
    {
        [Key]
        public int ImageId { get; set; }
        [ForeignKey("ProductId")]
        public Product product { get; set; }
        public string ImageUrl { get; set; }
    }
}
