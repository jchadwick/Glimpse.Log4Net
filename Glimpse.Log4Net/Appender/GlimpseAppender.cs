using System.Collections.Generic;
using System.Linq;
using System.Web;
using Glimpse.Core;
using Glimpse.Core.Extensions;
using Glimpse.Core.Extensibility;
using log4net;
using log4net.Appender;
using log4net.Core;
using log4net.Repository.Hierarchy;
using System.Diagnostics;
using Glimpse.Log4Net.Messages;
using Glimpse.Core.Framework;
using System;

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

        private IMessageBroker messageBroker;
        //private Func<IExecutionTimer> timerStrategy;

        internal IMessageBroker MessageBroker
        {
            get { return messageBroker ?? (messageBroker = GlimpseConfiguration.GetConfiguredMessageBroker()); }
            set { messageBroker = value; }
        }

        //internal Func<IExecutionTimer> TimerStrategy 
        //{
        //    get { return timerStrategy ?? (timerStrategy = GlimpseConfiguration.GetConfiguredTimerStrategy()); }
        //    set { timerStrategy = value; }
        //}

        public GlimpseAppender()
            : this(GlimpseConfiguration.GetConfiguredMessageBroker(), GlimpseConfiguration.GetConfiguredTimerStrategy())
        {
        }

        public GlimpseAppender(IMessageBroker messageBroker, System.Func<IExecutionTimer> timerStrategy)
        {
            this.MessageBroker = messageBroker;
            //this.TimerStrategy = timerStrategy;
        }
       
        protected override void Append(LoggingEvent loggingEvent)
        {
            //var timer = TimerStrategy();

            // Execution in on thread without access to RequestStore
            if (//timer == null || 
                MessageBroker == null)
            {
                return;
            }

           LoggingEventMessage message = new LoggingEventMessage(loggingEvent);
                
            MessageBroker.Publish<LoggingEventMessage>(message);
        }
    }
}
