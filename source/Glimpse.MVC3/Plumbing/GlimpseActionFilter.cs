using System;
using System.Diagnostics;
using System.Web.Mvc;
using Glimpse.Core.Extensibility;

namespace Glimpse.Mvc3.Plumbing
{
    internal class GlimpseActionFilter : GlimpseFilter, IActionFilter
    {
        public IActionFilter ActionFilter { get; set; }
        public Guid OnActionExecutingGuid { get; set; }
        public Guid OnActionExecutedGuid { get; set; }

        public GlimpseActionFilter(IActionFilter actionFilter)
        {
            ActionFilter = actionFilter;
        }

        public void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var metadata = LogCall(OnActionExecutingGuid);

            var watch = new Stopwatch();
            watch.Start();

            using (GlimpseTimer.Start("Executing: Action Filter", "Filter", ActionFilter.GetType().Name))
            {
                ActionFilter.OnActionExecuting(filterContext);
            }

            watch.Stop();

            metadata.ExecutionTime = watch.Elapsed;
        }

        public void OnActionExecuted(ActionExecutedContext filterContext)
        {
            var metadata = LogCall(OnActionExecutedGuid);

            var watch = new Stopwatch();
            watch.Start();


            using (GlimpseTimer.Start("Executed: Action Filter", "Filter", ActionFilter.GetType().Name))
            {
                ActionFilter.OnActionExecuted(filterContext);
            }

            watch.Stop();

            metadata.ExecutionTime = watch.Elapsed;
        }
    }
}