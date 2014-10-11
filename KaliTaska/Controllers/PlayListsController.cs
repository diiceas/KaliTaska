using KaliTaska.Models;
using KaliTaska.Models.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace KaliTaska.Controllers {
    public class PlayListsController : ApiController {
        KaliTaskaDbContext context = new KaliTaskaDbContext();

        // GET api/<controller>
        public IEnumerable<PlayList> Get() {
            return context.PlayLists;
        }

        // GET api/<controller>/5
        public PlayList Get(int id) {
            return context.PlayLists.Find(id);
        }

        // POST api/<controller>
        public void Post([FromBody]PlayList playList) {
            context.PlayLists.Add(playList);
            context.SaveChanges();
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]PlayList playList) {
            context.Entry(playList).State = System.Data.Entity.EntityState.Modified;
            context.SaveChanges();
        }

        // DELETE api/<controller>/5
        public void Delete(int id) {
            context.PlayLists.Remove(context.PlayLists.Find(id));
        }
    }
}
