using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace BiddingSystem.Models
{
    public class ApplicationUser : IdentityUser
    {
        [PersonalData]
        [Column(TypeName = "nvarchar(100)")]
        public string FirstName { get; set; }
        [PersonalData]
        [Column(TypeName = "nvarchar(100)")]
        public string City { get; set; }
        [PersonalData]
        [Column(TypeName = "nvarchar(100)")]
        public string State { get; set; }
        [PersonalData]
        [Column(TypeName = "int")]
        public int Zip { get; set; }
    }
}
