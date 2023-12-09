namespace BiddingSystem.Models
{
    public class WishList
    {
        public int Id { get; set; }
        public ApplicationUser user { get; set; }
        public Bid bid { get; set; }
    }
}
