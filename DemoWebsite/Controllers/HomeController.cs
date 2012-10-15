using System;
using System.Web.Mvc;
using log4net;

namespace DemoWebsite.Controllers
{
    public class HomeController : Controller
    {
        private static ILog Log = LogManager.GetLogger(typeof (HomeController));

        public HomeController()
        {
            Log.Info("Created new instance of Home controller");
            Log.DebugFormat("Instantiated at {0}", DateTime.Now);
        }

        public ActionResult Index()
        {
            Log.Warn("Example warning!");
            Log.Error("Example error!");
            Log.Fatal("Example fatal!");

            ViewBag.Message = "Welcome to ASP.NET MVC!";

            return View();
        }

        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            Log.InfoFormat("Executing {0}.{1} with {2} parameters...", 
                filterContext.ActionDescriptor.ControllerDescriptor.ControllerName,
                filterContext.ActionDescriptor.ActionName,
                filterContext.ActionParameters.Count
            );
        }

        protected override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            Log.InfoFormat("Done executing {0}.{1}.",
                filterContext.ActionDescriptor.ControllerDescriptor.ControllerName,
                filterContext.ActionDescriptor.ActionName
            );
        }
    }
}
