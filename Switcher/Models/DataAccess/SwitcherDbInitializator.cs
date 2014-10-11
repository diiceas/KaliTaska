using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Switcher.Models.DataAccess {
    public class SwitcherDbInitializer : DropCreateDatabaseAlways<SwitcherDbContext> {
        protected override void Seed(SwitcherDbContext context) {
            base.Seed(context);
            var billsTasks = new TaskList {
                Id = 1,
                Name = "Bill Gates Check List",
                Tasks = new List<SwitcherTask> {
                    new SwitcherTask {
                        Id = 1,
                        Name = "Rule the world",
                    }

                }
            };

            context.Tasks.Add(new SwitcherTask { Id = 1, Name = "Bill Gates Check List" });
        }
    }
}