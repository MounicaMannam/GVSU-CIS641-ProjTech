using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BiddingSystem.Models
{
    public class BiddingDbContext : IdentityDbContext
    {
        public BiddingDbContext(DbContextOptions<BiddingDbContext> options) : base(options)
        {
            
        }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Bid> Bids { get; set; }
        public DbSet<ProductBids> ProductBids { get; set; }
        public DbSet<Transact> Transactions { get; set; }
        public DbSet<ProductImage> ProductImages { get; set; }
        public DbSet<WishList> wishLists { get; set; }
        public DbSet<UserMessage> userMessages { get; set; }
    }
}
