using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Switcher.Models {
    public class SwitcherTask {
        public int Id { get; set; }

        public string Name { get; set; }
        public string Descrition { get; set; }
        public DateTime DateStart { get; set; }
        public TimeSpan Duration { get; set; }
        
    }
}