using BiddingSystem.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BiddingSystem.Repository
{
    public interface IMessageRepository
    {
        Task<int> getMessageCount(string uid);
        Task<List<UserMessage>> getMessageRead(string uid);
        Task<List<UserMessage>> getMessageUnRead(string uid);
        Task<int> UpdateRead(string uid);
        Task<int> DeleteRead(string uid);
        int MsgWonCount(string uid);
        Task SendInterestMsgs(List<string> uids,string pname,int bid);
        Task BidWonMsg(string uid);
    }
}
