using KaliTaska.Models;
using KaliTaska.Models.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace KaliTaska.Controllers {
    public class TasksController : ApiController {
        KaliTaskaDbContext context = new KaliTaskaDbContext();

        // GET api/<controller>
        public IEnumerable<KTask> Get() {
            return context.Tasks;
        }

        // GET api/<controller>/5
        public KTask Get(int id) {
            return context.Tasks.Find(id);
        }

        // POST api/<controller>
        public void Post([FromBody]KTask task) {
            context.Tasks.Add(task);
            context.SaveChanges();
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]KTask task) {
            context.Entry(task).State = System.Data.Entity.EntityState.Modified;
            context.SaveChanges();
        }

        // DELETE api/<controller>/5
        public void Delete(int id) {
            context.Tasks.Remove(context.Tasks.Find(id));
        }
    }
}