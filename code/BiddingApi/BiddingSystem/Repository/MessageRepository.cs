using BiddingSystem.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BiddingSystem.Repository
{
    public class MessageRepository:IMessageRepository
    {
        private readonly BiddingDbContext db;
        public MessageRepository(BiddingDbContext dbContext)
        {
            this.db = dbContext;
        }

        public async Task<int> getMessageCount(string uid)
        {
            int c = (from m in db.userMessages where m.myinbox.Id == uid && m.status == "unread" select m.MsgId).Count();
            return c;
        }

        public async Task<List<UserMessage>> getMessageRead(string uid)
        {
            List<UserMessage> messages = await (from m in db.userMessages where m.myinbox.Id == uid && m.status == "read" orderby m.MsgId descending select m).ToListAsync();
            return messages;
        }
        public async Task<List<UserMessage>> getMessageUnRead(string uid)
        {
            List<UserMessage> messages = await (from m in db.userMessages where m.myinbox.Id == uid && m.status == "unread" orderby m.MsgId descending select m).ToListAsync();
            return messages;
        }
        public async Task<int> UpdateRead(string uid)
        {
            List<UserMessage> userMessages=await (from d in db.userMessages where d.status=="unread" select d).ToListAsync();
            foreach(UserMessage message in userMessages)
            {
                message.status = "read";
            }
            db.userMessages.UpdateRange(userMessages);
            await db.SaveChangesAsync();
            return userMessages.Count;
        }
        public async Task<int> DeleteRead(string uid)
        {
            List<UserMessage> userMessages = await (from d in db.userMessages where d.status == "read" select d).ToListAsync();
            foreach (UserMessage message in userMessages)
            {
                message.status = "read";
            }
            db.userMessages.RemoveRange(userMessages);
            await db.SaveChangesAsync();
            return userMessages.Count;
        }

        public async Task SendInterestMsgs(List<string> uids,string pname,int bid)
        {
            UserMessage message;
            ApplicationUser user;
            char c = '"';
            string msg = "...Someone Bidded on  " + c + pname + c + "  you're interested in...   Time : " + c + DateTime.Now.ToString("f") + c;
            List<UserMessage> userMessages = new List<UserMessage>();
            foreach(string uid in uids.Distinct())
            {
                if (uid == "" || uid == null)
                {
                    continue;
                }
                message = new UserMessage();
                user = new ApplicationUser();
                user =await db.Users.FindAsync(uid) as ApplicationUser;
                message.status = "unread";
                message.bidid = bid;
                message.myinbox = user;
                message.Message = msg;
                userMessages.Add(message);
               
            }
            await db.userMessages.AddRangeAsync(userMessages);
            await db.SaveChangesAsync();
        }
        public async Task BidWonMsg(string uid)
        {
            var products=await (from b in db.Bids
                   join p in db.Products on b.product.ProductId equals p.ProductId
                   where b.Bidder.Id == uid &&
                    b.BidEndDate < DateTime.Today && b.Status.ToLower() != "paid" && b.Status.ToLower() != "sent" && b.Status!="delete"
                   select new
                   {
                       ProductName=p.ProductName,
                       Bidid=b.BidId,
                       PreviousPrice=b.CurrentPrice
                   }).ToListAsync();
            ApplicationUser user=await db.Users.FindAsync(uid) as ApplicationUser;
            if (products == null || products.Count == 0)
                return;
            List<UserMessage> userMessages = new List<UserMessage>();
            List<int> bids = new List<int>(); 
            UserMessage msg;
            char c = '"';
            foreach (var product in products)
            {
                msg = new UserMessage();
                msg.bidid = product.Bidid;
                msg.myinbox = user;
                msg.status = "unread";
                bids.Add(msg.bidid);
                msg.Message="Congrats You've won the Bid on Product :  "+c+product.ProductName+c+" ...Don't Forget To Pay...!";
                userMessages.Add(msg);
            }
            List<Bid> bids1=await (from b in db.Bids where bids.Contains(b.BidId) select b).ToListAsync();
            foreach (var b in bids1)
            {
                b.Status = "sent";
            }
            
            db.Bids.UpdateRange(bids1);
           await db.userMessages.AddRangeAsync(userMessages);
            await db.SaveChangesAsync();
        }
        public int MsgWonCount(string uid)
        {
            int c=(from b in db.Bids where b.Bidder.Id==uid && b.Status=="sent" select b.Bidder).Count();
            return c;
        }
    }
}
