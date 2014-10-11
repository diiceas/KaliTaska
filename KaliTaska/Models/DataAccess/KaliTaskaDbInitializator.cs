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
                Name = "Start Presentation",
                Description = "Start Presentation on Kalitaska software",
                Start = DateTime.Now,
                 Tasks = new List<KTask> {
                    new KTask {
                        Id = 2,
                        Name = "Introduction",
                        Description = "Intrdouctions. Short review of the concept.",
                        Start = DateTime.Now,
                        DurationSecs = 120,
                   },
                   new KTask {
                        Id = 3,
                        Name = "Say something awesome",
                        Description = "Now say something cool to own them!",
                        Start = DateTime.Now.AddSeconds(120),
                        DurationSecs = 200,
                        ShowNotification = true
                   },
                   new KTask {
                        Id = 4,
                        Name = "Be cool!",
                        Description = "Just Do It!",
                        Start = DateTime.Now.AddSeconds(320),
                        DurationSecs = 200,
                   }
                }
            };

            var task2 = new KTask {
                Id = 5,
                Name = "Rule the world",
                Description = "Rule it!",
                Start = DateTime.Now,
                DurationSecs = 450,
            };

            var playList = new PlayList {
                Id = 1,
                Name = "Kalilaska Presentaion List",
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