using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KaliTaska.Models {
    public class KTask {
        private DateTime? start;
        private int? duration;

        public int Id { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }

        public DateTime? Start { // The question is wethter start time should be stored in children, or in every task; same shit with setting
            get {
                if (HasChildren) {
                    return Tasks.First().Start;
                }
                else {
                    return start;
                }
            }
            set {
                start = value;
            }
        }
        public int? DurationSecs {
            get {
                if (HasChildren) {
                    return Tasks.Sum(t => t.DurationSecs);
                }
                else {
                    return duration;
                }
            }
            set {
                duration = value;
            }
        }

        // Oauth Users
        //public string ResponsibleUserId { get; set; }
        //public virtual ApplicationUser ResponsibleUser { get; set; }
        //public string OwnerId { get; set; }
        //public virtual ApplicationUser Owner { get; set; }

        public virtual ICollection<KTask> Tasks { get; set; }

        // If currently in play
        public bool IsInPlay { get; set; }
        // Is Active (can be processed on client); 
        public bool IsActive {
            get {
                if (DurationSecs.HasValue) {
                    return Start < DateTime.Now && Start > DateTime.Now.AddSeconds(DurationSecs.Value);
                }
                else {
                    return false; // What about stuff without Duration? Should we set it to false?
                }
            }
        }
        // If we show next available tasks (for children)
        public bool ShowNext { get; set; }
        public virtual bool HasChildren {
            get {
                return (Tasks != null && Tasks.Count > 0);
            }
        }
    }
}