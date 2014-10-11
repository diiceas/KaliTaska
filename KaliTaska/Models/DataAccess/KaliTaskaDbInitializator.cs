using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace KaliTaska.Models.DataAccess {
    public class KaliTaskaDbInitializer : DropCreateDatabaseAlways<KaliTaskaDbContext> {
        protected override void Seed(KaliTaskaDbContext context) {
            base.Seed(context);
            var task1 = new KTask {
                Id = 1,
                Name = "Billy Tasks",
                Description = "Container for my future tasks!",
                Start = DateTime.Now,
                DurationSecs = 3600,
                Tasks = new List<KTask> {
                    new KTask {
                        Id = 2,
                        Name = "Rule the world",
                        Description = "Wann rule u all, sux0rz!",
                        Start = DateTime.Now,
                        DurationSecs = 450,
                   },
                   new KTask {
                        Id = 3,
                        Name = "Be cool",
                        Description = "Rule the world with the cool face!",
                        Start = DateTime.Now,
                        DurationSecs = 725,
                   }
                }
            };

            var task2 = new KTask {
                Id = 2,
                Name = "Rule the world",
                Description = "Wann rule u all, sux0rz!",
                Start = DateTime.Now,
                DurationSecs = 450,
            };

            var playList = new PlayList {
                Id = 1,
                Name = "Billy's List",
                Tasks = new KTask[] { task1 }
            };

            var container = new Container {
                Id = 1,
                Name = "All FUKKEN INCLUDED",
                Tasks = new KTask[] { task1, task2 }
            };

            context.PlayLists.Add(playList);
            context.Containers.Add(container);
        }
    }
}