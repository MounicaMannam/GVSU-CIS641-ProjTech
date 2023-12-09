using BiddingSystem.Models;
using BiddingSystem.ViewModel;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BiddingSystem.Repository
{
    public interface IUserRepository
    {
        Task<ApplicationUser> getUser(string id);
        Task<ApplicationUser> getUserByEmail(string email);
        Task<List<ProductViewModel>> currentProducts(string id);
        Task<List<ProductViewModel>> yourPurchases(string id);
        Task<List<ProductViewModel>> yourHistory(string id);
        Task<ProductViewModel> checkProduct(int pid);
        Task<ApplicationUser> UpdateUser(ApplicationUser user, bool isEmail);
    }
}
