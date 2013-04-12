using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Glimpse.Core.Message;

namespace Glimpse.Log4Net.Messages
{
    public class LoggingEventMessage : MessageBase
    {
        
        public LoggingEventMessage(log4net.Core.LoggingEvent loggingEvent) : base()
        {
            LoggerName = loggingEvent.LoggerName;
            LevelName = loggingEvent.Level.DisplayName;
            LevelValue = loggingEvent.Level.Value;
            Message = loggingEvent.MessageObject.ToString();
            ThreadName = loggingEvent.ThreadName;
            TimeStamp = loggingEvent.TimeStamp;
            LocationInfo = loggingEvent.LocationInformation.FullInfo;
            UserName = loggingEvent.UserName;
            if (loggingEvent.ExceptionObject != null)
            {
                ExceptionObject = new ExceptionMessage(loggingEvent.ExceptionObject);
            }
            Domain	= loggingEvent.Domain;
            Identity = loggingEvent.Identity;

        }


        public string LoggerName { get; set; }

        public string LevelName { get; set; }

        public string Message { get; set; }

        public string ThreadName { get; set; }

        public DateTime TimeStamp { get; set; }

        public string UserName { get; set; }

        public ExceptionMessage ExceptionObject { get; set; }

        public string Domain { get; set; }

        public string Identity { get; set; }

        public string LocationInfo { get; set; }

        public int LevelValue { get; set; }
    }
}
