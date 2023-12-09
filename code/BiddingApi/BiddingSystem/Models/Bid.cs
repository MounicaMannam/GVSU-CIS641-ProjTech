using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BiddingSystem.Models
{
    public class Bid
    {
        
        public int BidId { get; set; }
        [ForeignKey("ProductId")]
        public virtual Product product { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal CurrentPrice { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal PreviousPrice { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal BiddingPrice { get; set; }
        public int Count { get; set; }
        public ApplicationUser Bidder { get; set; }
        public DateTime BidStartDate { get; set; }
        public DateTime BidEndDate { get; set; }
        public string Status { get; set; }

    }
}
