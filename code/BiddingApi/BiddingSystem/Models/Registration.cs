﻿using System.ComponentModel.DataAnnotations;

namespace BiddingSystem.Models
{
    public class Registration
    {
        public string FirstName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public int Zip { get; set; }
        public string Password { get; set; }

    }
}
