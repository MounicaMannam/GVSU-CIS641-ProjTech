using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BiddingSystem.Models
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        [ForeignKey("CategoryId")]
        public Category category { get; set; }
        public string LDescription { get; set; }
        public string SDescription { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }
        public string Copyrights { get; set; }
        [ForeignKey("Id")]
        public ApplicationUser seller { get; set; }
    }
}
