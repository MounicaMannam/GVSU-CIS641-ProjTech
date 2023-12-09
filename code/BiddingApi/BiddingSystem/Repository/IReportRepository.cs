using BiddingSystem.ViewModel;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BiddingSystem.Repository
{
    public interface IReportRepository
    {
        Task<List<ProductViewModel>> GetProductsToAdmin();
        Task<List<ProductViewModel>> GetAuctionReport();
    }
}
