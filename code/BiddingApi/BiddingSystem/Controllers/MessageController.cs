using Microsoft.AspNetCore.Mvc;
using BiddingSystem.Models;
using BiddingSystem.Repository;
using System.Threading.Tasks;

namespace BiddingSystem.Controllers
{
    public class MessageController : Controller
    {
        private readonly IMessageRepository messageRepository;
        public MessageController(IMessageRepository repository)
        {
            this.messageRepository = repository;
        }
        public IActionResult Index()
        {
            return View();
        }
        [Route("message/getcount/{uid}")]
        public JsonResult getMsgCount(string uid)
        {
            return Json(messageRepository.getMessageCount(uid));
        }
        [HttpGet]
        [Route("message/getmesseageread/{uid}")]
        public async Task<JsonResult> getMessageRead(string uid)
        {
            return Json(await messageRepository.getMessageRead(uid));
        }
        [HttpGet]
        [Route("message/getmesseageunread/{uid}")]
        public async Task<JsonResult> getMessageUnRead(string uid)
        {
            return Json(await messageRepository.getMessageUnRead(uid));
        }
        [HttpGet]
        [Route("message/updateread/{uid}")]
        public async Task<JsonResult> UpdateRead(string uid)
        {
            return Json(await messageRepository.UpdateRead(uid));
        }
        [HttpGet]
        [Route("message/deleteread/{uid}")]
        public async Task<JsonResult> DeleteRead(string uid)
        {
            return Json(await messageRepository.DeleteRead(uid));
        }
        [HttpPost]
        [Route("message/wonmsg/{uid}")]
        public async Task<JsonResult> CongratsMsg(string uid)
        {
            await messageRepository.BidWonMsg(uid);
            return Json("1");
        }
        [HttpGet]
        [Route("message/wonmsgcount/{uid}")]
        public  JsonResult wonmsgcount(string uid)
        {
             messageRepository.MsgWonCount(uid);

            return Json(messageRepository.MsgWonCount(uid));
        }

    }
}
