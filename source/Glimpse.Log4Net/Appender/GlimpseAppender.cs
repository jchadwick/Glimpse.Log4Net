using System.Collections.Generic;
using System.Web;
using Glimpse.Core;
using log4net.Appender;
using log4net.Core;

namespace Glimpse.Log4Net.Appender
{
    public class GlimpseAppender : AppenderSkeleton
    {
        private static readonly string ContextKey = Plugin.Log4Net.ContextKey;

        protected override void Append(LoggingEvent loggingEvent)
        {
            if (Module.Configuration != null && !Module.Configuration.Enabled)
                return;

            var context = HttpContext.Current;

            if (context == null)
                return;

            Append(loggingEvent, new HttpContextWrapper(context));
        }

        internal void Append(LoggingEvent loggingEvent, HttpContextBase context)
        {
            var store = context.Items;

            if (store[ContextKey] == null)
                store[ContextKey] = new List<LoggingEvent>();

            ((IList<LoggingEvent>)store[ContextKey]).Add(loggingEvent);
        }
    }
}
