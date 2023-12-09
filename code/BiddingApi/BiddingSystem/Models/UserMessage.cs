using System.ComponentModel.DataAnnotations;

namespace BiddingSystem.Models
{
    public class UserMessage
    {
        [Key]
        public int MsgId { get; set; }
        public string Message { get; set; }
        public string status { get; set; }
        public int bidid { get; set; }
        public virtual ApplicationUser myinbox { get; set; }
    }
}
