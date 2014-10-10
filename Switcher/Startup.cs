using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Switcher.Startup))]
namespace Switcher
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
