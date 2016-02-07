using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using Glimpse.Core;
using log4net;
using log4net.Appender;
using log4net.Config;
using log4net.Core;
using log4net.Repository.Hierarchy;

namespace Glimpse.Log4Net.Appender
{
    public class GlimpseAppender : AppenderSkeleton
    {
        public const string AutoConfigureAppSetting = "Glimpse.Log4Net.AutoConfigure";

        private const string ContextKey = Plugin.RequestLogEntries.ContextKey;

        protected static bool AutoConfigurationEnabled
        {
            get
            {
                string appSetting = ConfigurationManager.AppSettings[AutoConfigureAppSetting];
                
                // We're assuming true unless specifically told false, not the other way around
                return !"false".Equals(appSetting, StringComparison.OrdinalIgnoreCase);
            }
        }

        /// <summary>
        /// The log level threshold for the dynamically-generated
        /// </summary>
        /// <remarks>
        /// This field is here if you want to change it, but if you 
        /// want to control the details of the appender you're better
        /// off just configuring one in your log4net config...
        /// </remarks>
        public static Level DefaultThreshold = Level.Warn;

        public static GlimpseAppender Current
        {
            get { return Instances.FirstOrDefault(); }
        }

        public static IEnumerable<GlimpseAppender> Instances
        {
            get
            {
                return
                    LogManager.GetAllRepositories()
                        .SelectMany(x => x.GetAppenders())
                        .OfType<GlimpseAppender>();
            }
        }

        public static void Initialize()
        {
            // Users are free to add (and configure) a GlimpseAppender 
            // via log4net, but if they didn't then do it for them

            var repositories = LogManager.GetAllRepositories().ToArray();

            var registeredAppenders = 
                repositories.SelectMany(repo => repo.GetAppenders()).ToArray();

            var glimpseAppenders = registeredAppenders.OfType<GlimpseAppender>();

            // If there is already a Glimpse appender configured, just use that
            if (glimpseAppenders.Any())
                return;


            var appender = new GlimpseAppender { Threshold = DefaultThreshold };

            var hasLoggers = repositories.SelectMany(x => x.GetCurrentLoggers()).Any();

            var isLog4NetConfigured = registeredAppenders.Any() && hasLoggers;

            // If no configuration has been done, be nice and create a default one
            // so this is really a drop-n-go solution
            if (!isLog4NetConfigured && AutoConfigurationEnabled)
            {
                BasicConfigurator.Configure(appender);
            }
            // Otherwise, some configuration has been done already so assume that's
            // what the user wants and just augment it
            else
            {
                var repository = (Hierarchy)LogManager.GetRepository();
                repository.Root.AddAppender(appender);
            }
        }

        protected override void Append(LoggingEvent loggingEvent)
        {
            var context = HttpContext.Current;

            if (context == null)
                return;

            if (context.Items[ContextKey] == null)
                context.Items[ContextKey] = new List<LoggingEvent>();

            ((IList<LoggingEvent>)context.Items[ContextKey]).Add(loggingEvent);
        }
    }
}
