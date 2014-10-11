using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Switcher.Models {
    public class SwitcherTask {
        private int? taskId;
        private SwitcherTask task;
        private DateTime? start;
        private TimeSpan? duration;

        public int Id { get; set; }

        public string Name { get; set; }
        public string Descrition { get; set; }
        public DateTime? Start { get; set; }
        public TimeSpan? Duration { get; set; }

        public string UserId { get; set; } // Probably Wrong name
        public virtual ApplicationUser User { get; set; }

        public int? TaskId {
            get {
                return taskId;
            }
            set {
                if (value != null) {
                    start = null;
                    duration = null;
                    taskId = value;
                }
            }
        }

        public virtual SwitcherTask Task {
            get {
                return task;
            }
            set {
                task = value;
            }
        }
    }
}