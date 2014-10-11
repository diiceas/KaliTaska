using KaliTaska.Models.DataAccess;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KaliTaskaTests {
    [TestClass]
    public class KTaskTests {
        KaliTaskaDbContext context;

        [TestInitialize]
        public void InitTest() {
            context = new Mock<KaliTaskaDbContext>().Object;
        }
    }
}
