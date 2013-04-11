using System.Collections.Generic;
using System.Linq;
using System.Web;
using Glimpse.Core;
using Glimpse.Core.Extensibility;
using log4net;
using log4net.Appender;
using log4net.Core;
using log4net.Repository.Hierarchy;

namespace Glimpse.Log4Net.Appender
{
    public class GlimpseAppender : AppenderSkeleton
    {
        private const string ContextKey = Plugin.GlimpseLog4NetTab.ContextKey;

        /// <summary>
        /// The log level threshold for the dynamically-generated
        /// </summary>
        /// <remarks>
        /// This field is here if you want to change it, but if you 
        /// want to control the details of the appender you're better
        /// off just configuring one in your log4net config...
        /// </remarks>
        public static Level DefaultThreshold = Level.Warn;
        private static IMessageBroker _messageBroker;

        internal static void Initialize()
        {
            // Users are free to add (and configure) a GlimpseAppender 
            // via log4net, but if they didn't then do it for them

            var registeredAppenders =
                LogManager.GetAllRepositories()
                    .SelectMany(repo => repo.GetAppenders())
                    .OfType<GlimpseAppender>();

            if (registeredAppenders.Count() > 0)
                return;

            var repository = (Hierarchy)LogManager.GetRepository();
            repository.Root.AddAppender(new GlimpseAppender { Threshold = DefaultThreshold });
        }

        protected override void Append(LoggingEvent loggingEvent)
        {
            _messageBroker.Publish<LoggingEvent>(loggingEvent);

        }

        internal static void Initialize(IMessageBroker messageBroker)
        {
            Initialize();
            _messageBroker = messageBroker;
            
        }
    }
}
