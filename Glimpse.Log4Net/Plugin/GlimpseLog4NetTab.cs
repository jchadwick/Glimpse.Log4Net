using System.Collections.Generic;
using System.Linq;
using System.Web;
using Glimpse.Core;
using Glimpse.Core.Tab.Assist;
using Glimpse.Core.Extensions;
using Glimpse.Core.Extensibility;
using Glimpse.Log4Net.Appender;
using log4net.Core;
using Glimpse.Log4Net.Messages;

namespace Glimpse.Log4Net.Plugin
{
    public class GlimpseLog4NetTab : TabBase, ITabSetup
    {
        public const string ContextKey = "Glimpse.Log4Net.LogEntries";
        
        /// <summary>
        /// The maximum number of log entries to serialize to the client.
        /// Over this number only the main portions of the entry
        /// (level, timestamp, and message) are sent. 
        /// </summary>
        /// <remarks>
        /// 1,000 seems to be the emperical sweet spot for including 
        /// full log details before performance begins to suffer.
        /// If you have more than this and still want to see the details, 
        /// consider upping the appender's log level threshold.
        /// </remarks>
        public static volatile int MaxDetailedLogs = 1000;

        public override string Name
        {
            get { return "log4net"; }
        }

        public void Setup(ITabSetupContext context)
        {
            context.PersistMessages<LoggingEventMessage>();
        }

        

        public override object GetData(ITabContext context)
        {
            var logEntries = context.GetMessages<LoggingEventMessage>();
            
            if (logEntries == null)
                return null;

            // Evaluate any expression trees
            logEntries = logEntries.ToArray();

            var data = new List<object[]>();

            // Only include the full log entry when there is a reasonable 
            // number of log messages
            var includeDetails = logEntries.Count() < MaxDetailedLogs;

            if (includeDetails)
            {
                data.Add(new[] { "Level", "Timestamp", "Message", "Log Entry" });
                data.AddRange(logEntries.Select(log => new object[] {
                                    log.LevelName, 
                                    log.TimeStamp, 
                                    log.Message,
                                    log,
                                    GetStyle(log.LevelValue),
                                }));
            }
            else
            {
                data.Add(new[] { "Level", "Timestamp", "Message" });
                data.AddRange(logEntries.Select(log => new object[] {
                                    log.LevelName, 
                                    log.TimeStamp, 
                                    log.Message,
                                    GetStyle(log.LevelValue),
                                }));
            }

            return data;
        }

        private string GetStyle(int level)
        {
            if (level < Level.Info.Value)
                return "quiet";

            if (level >= Level.Info.Value && level < Level.Warn.Value)
                return "info";

            if (level >= Level.Warn.Value && level < Level.Error.Value)
                return "warn";

            if (level >= Level.Error.Value && level < Level.Alert.Value)
                return "error";

            if (level >= Level.Alert.Value)
                return "fail";

            return level.ToString();
        }
    }
}