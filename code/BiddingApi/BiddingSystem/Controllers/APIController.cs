using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication12432.Controllers
{
    [ApiController]
    
    public class APIController : ControllerBase
    {
        [HttpGet]
        [Route("api/apistatus")]
        public IActionResult APIStatus()
        {
            return Ok("API is up and running");
        }

    }
}
