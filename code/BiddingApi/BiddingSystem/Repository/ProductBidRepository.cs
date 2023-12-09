using BiddingSystem.Models;
using System.Threading.Tasks;

namespace BiddingSystem.Repository
{
    public class ProductBidRepository : IProductBidRepository
    {
        private BiddingDbContext db;
        public ProductBidRepository(BiddingDbContext db)
        {
            this.db = db;
        }
        public async Task<int> AddProductBid(ProductBids productBid)
        {
           if(productBid != null)
            {
                await db.ProductBids.AddAsync(productBid);
                db.SaveChanges();
                return productBid.Id;
            }
            return -1;
        }
    }
}
