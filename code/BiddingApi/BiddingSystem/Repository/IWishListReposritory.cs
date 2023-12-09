using BiddingSystem.Models;
using BiddingSystem.ViewModel;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BiddingSystem.Repository
{
    public interface IWishListReposritory
    {
        Task<int> addWishList(WishList wishList);
        Task<List<ProductViewModel>> getWishProducts(string uid);
        Task<List<int>> getWishlistBidIds(string id);
    }
}
