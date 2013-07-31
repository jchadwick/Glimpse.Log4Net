using System;
using System.Web.Mvc;
using Glimpse.Log4Net.Appender;
using log4net;
using log4net.Core;

namespace DemoWebsite.Controllers
{
    public class HomeController : Controller
    {
        private static ILog Log = LogManager.GetLogger(typeof(HomeController));

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

            ViewBag.CurrentGlimpseLogLevel = GlimpseAppender.Current.Threshold.Name.ToUpper();

            return View();
        }

        public ActionResult ChangeGlimpseLogLevel(string level)
        {
            var logLevel = GlimpseAppender.Current.Threshold;

            switch (level.ToUpper())
            {
                case "DEBUG":
                    logLevel = Level.Debug;
                    break;
                case "INFO":
                    logLevel = Level.Info;
                    break;
                case "WARN":
                    logLevel = Level.Warn;
                    break;
                case "ERROR":
                    logLevel = Level.Error;
                    break;
                case "FATAL":
                    logLevel = Level.Fatal;
                    break;
            }

            GlimpseAppender.Current.Threshold = logLevel;

            return RedirectToAction("Index");
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
