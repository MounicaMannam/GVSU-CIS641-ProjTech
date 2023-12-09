using BiddingSystem.Models;
using System;
using System.Collections.Generic;

namespace BiddingSystem.ViewModel
{
    public class ProductViewModel
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int CategoryId { get; set; }
        public string Description { get; set; }
        public string SDescription { get; set; }
        public string LDescription { get; set; }
        public decimal Price { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Copyrights { get; set; }
        public string sellerid { get; set; }
        public string DisplayImage { get; set; }
        public string Images { get; set; }
        public string Image1 { get; set; }
        public string Image2 { get; set; }
        public string Image3 { get; set; }
        public string SellerName { get; set; }
        public string CurrentBidder { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public int BidId { get; set; }
        public string Status { get; set; }
        public decimal StartPrice { get; set; }
        public decimal PreviousPrice { get; set; }
        public string Buyerid { get; set; }
        public DateTime BidStartDate { get; set; }
        public DateTime BidEndDate { get; set; }
        public int WishList { get; set; }
        public string BuyerName { get; set; }
        public string CategoryName { get; set; }
        public object MobileNo { get; internal set; }
        public Bid Bid { get; internal set; }
        public Product Product { get; internal set; }
        public string TransactionType { get; set; }
    }
}
