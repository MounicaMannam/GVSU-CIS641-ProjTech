using BiddingSystem.Models;
using System.Threading.Tasks;

namespace BiddingSystem.Repository
{
    public interface IProductBidRepository
    {
        public Task<int> AddProductBid(ProductBids productBid);
    }
}
