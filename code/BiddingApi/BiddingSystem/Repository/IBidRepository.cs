using BiddingSystem.Models;
using BiddingSystem.ViewModel;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using System.Threading.Tasks;

namespace BiddingSystem.Repository
{
    public interface IBidRepository
    {
        Task<int> addBid(Bid bid);
        Task<Bid> GetBidById(int bidId);
        Task<List<Bid>> GetBids();
        Task<List<ProductViewModel>> GetActiveBids([Optional] string biddderid);
        Task<List<ProductViewModel>> GetUpcomingBids([Optional] string biddderid);
        Task<List<ProductViewModel>> GetTrendingBids([Optional] string biddderid);
        Task<List<Bid>> GetSoldBids(string biddderid);
        Task<List<Bid>> GetBidInterest(string biddderid);
        Task<int> UpdateBid(int bid,string uid);
        Task<string> addWishList(int bidId, string buyerid);
        Task<string> deleteWishList(int bid, string uid);
        Task<List<ProductViewModel>> getUSerBids(string uid);
        Task deleteBid(int bid);
        Task<List<ProductViewModel>> GetProductsByCatId(ProductViewModel model);
        Task<List<ProductViewModel>> GetMyProducts(string bidderid);
        Task<List<ProductViewModel>> GetMyBids(string biddderid);
        Task<List<ProductViewModel>> getUserPayments(string uid);
        Task<List<ProductViewModel>> getTopBidders(int bid);
        Task UpdateProduct(ProductViewModel model);
    }
}
