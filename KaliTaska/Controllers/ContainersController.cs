using KaliTaska.Models;
using KaliTaska.Models.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace KaliTaska.Controllers {
    public class ContainersController : ApiController {
        private KaliTaskaDbContext context = new KaliTaskaDbContext();

        // GET api/<controller>
        public IEnumerable<Container> Get() {
            return context.Containers;
        }

        // GET api/<controller>/5
        public Container Get(int id) {
            return context.Containers.Find(id);
        }

        // POST api/<controller>
        public void Post([FromBody]Container container) {
            context.Containers.Add(container);
            context.SaveChanges();
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]Container container) {
            context.Entry(container).State = System.Data.Entity.EntityState.Modified;
            context.SaveChanges();
        }

        // DELETE api/<controller>/5
        public void Delete(int id) {
            context.Containers.Remove(context.Containers.Find(id));
        }
    }
}
