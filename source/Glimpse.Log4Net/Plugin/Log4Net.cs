using System.Collections.Generic;
using System.Linq;
using System.Web;
using Glimpse.Core.Extensibility;
using log4net.Core;

namespace Glimpse.Log4Net.Plugin
{
    [GlimpsePlugin]
    public class Log4Net : IGlimpsePlugin
    {
        public static string ContextKey = "Log4NetGlimpseMessages";

        public string Name
        {
            get { return "log4net"; }
        }

        public object GetData(HttpContextBase context)
        {
            var logEntries = (IEnumerable<LoggingEvent>)context.Items[ContextKey];

            if (logEntries == null || !logEntries.Any())
                return null;

            var glimpseData = 
                logEntries.Select(x => new object[] {
                                    x.Level.DisplayName, 
                                    x.TimeStamp, 
                                    x.RenderedMessage,
                                    x,
                                    GetStyle(x.Level),
                                });

            var data = new List<object[]> { new[] { "Level", "Timestamp", "Message", "Log Entry" } };

            data.AddRange(glimpseData);

            return data;
        }

        private string GetStyle(Level level)
        {
            var name = level.Name.ToLower();
            switch(name)
            {
                case "debug":
                    return "quiet";

                case "fatal":
                    return "error";

                default:
                    return name;
            }
        }

        public void SetupInit()
        {
        }
    }
}