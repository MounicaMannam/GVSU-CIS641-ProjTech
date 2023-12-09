using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BiddingSystem.Models
{
    //Trasaction Table Model - Transaction word is ambigous in System.Transaction, so Transact is used instead
    public class Transact
    {
        [Key]
        public int TransactionId { get; set; }
        [ForeignKey("BidId")]
        public virtual Bid bid { get; set; }
        public string TransactionType { get; set; }
        public string Status { get; set; }
        [Column(TypeName ="decimal(18,2)")]
        public decimal ShippingPrice { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal FinalAmount { get; set; }
        public string Reciept { get; set; }
        public DateTime TDate { get; set; }
        public virtual ApplicationUser bidder { get; set; }
    }
}
