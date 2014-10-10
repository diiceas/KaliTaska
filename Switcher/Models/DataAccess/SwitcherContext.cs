using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Switcher.Models.DataAccess {
    public class SwitcherDbContext : DbContext {
        public SwitcherDbContext() : base("DefaultConnection") {
            Database.SetInitializer<SwitcherDbContext>(new SwitcherDbInitializer());
        }

        public DbSet<SwitcherTask> Tasks { get; set; }
    }
}