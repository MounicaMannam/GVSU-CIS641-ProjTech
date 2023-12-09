using BiddingSystem.Models;
using BiddingSystem.ViewModel;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Transactions;

namespace BiddingSystem.Repository
{
    public interface ITransactionRepository
    {
        //Interfaces for Add Transaction and Get Transaction By Bid Id
        public Task<int> AddTransaction(Transact transaction);
        public Task<Transact> GetTransactionByBidId(int bidId);
        public Task AddTransaction(ProductViewModel model);
        public Task<List<ProductViewModel>> GetTransactionReport();
        public Task<ProductViewModel> GetInvoice(int bid);
    }
}
