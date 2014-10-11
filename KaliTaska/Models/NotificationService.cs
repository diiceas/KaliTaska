using KaliTaska.Models.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading;
using System.Web;

namespace KaliTaska.Models {
    public class NotificationService {
        private static int sleepDuration = 15000;

        public static void DoWork() {
            while (true) {
                Thread.Sleep(sleepDuration);
                var context = new KaliTaskaDbContext();
                var notifyTasks = context.Tasks.Where(t => t.ShowNotification && t.Start.HasValue && t.DurationSecs.HasValue);
                foreach (var task in notifyTasks) {
                    if (task.Start.Value.AddSeconds(task.DurationSecs.Value) >= DateTime.Now) {
                        SendMail(string.Format("Dear User, your time on task \"{0}\" have finished.", task.Name));
                        task.ShowNotification = false;
                    }
                }
            }
        }

        protected static void SendMail(string message) {
            var client = new SmtpClient();
            var email = new MailMessage("skorotsko@gmail.com", "st.random1024@gmail.com") {
                IsBodyHtml = false,
                Subject = "Your Time is Up",
                Body = message,
                BodyEncoding = Encoding.UTF8
            };

            try {
                client.Send(email);
            }
            catch (SmtpException exception) {
                 //log exception
            }
        }
    }
}