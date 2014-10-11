using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Switcher.Models {
    public class TaskList {
        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<SwitcherTask> Tasks { get; set; }
    }
}