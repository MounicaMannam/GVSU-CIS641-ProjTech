using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BiddingSystem.Models
{
    public class ProductBids
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("BidId")]
        public Bid bid { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }
        public ApplicationUser Bidder { get; set; }
    }
}
