using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace KaliTaska.Models.DataAccess {
    public class KaliTaskaDbContext : DbContext {
        public KaliTaskaDbContext() : base("DefaultConnection") {
            Database.SetInitializer<KaliTaskaDbContext>(new KaliTaskaDbInitializer());
        }

        public DbSet<KTask> Tasks { get; set; }
        public DbSet<PlayList> PlayLists { get; set; }
        public DbSet<Container> Containers { get; set; }
    }
}