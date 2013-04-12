using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Glimpse.Core.Message;

namespace Glimpse.Log4Net.Messages
{
    public class ExceptionMessage : MessageBase
    {
        public ExceptionMessage(Exception exception) : base()
        {
            if (exception.Data != null)
            {
                Data = new Dictionary<object, object>();
                foreach (var key in exception.Data.Keys)
                {
                    Data.Add(key, exception.Data[key]);
                }
            }
            ExceptionType = exception.GetType().ToString();
            Message = exception.Message;
            Source = exception.Source;
            StackTrace = exception.StackTrace;
            if (InnerException != null)
            {
                InnerException = new ExceptionMessage(exception.InnerException);
            }
        }


        public string ExceptionType { get; set; }

        public string Message { get; set; }

        public string Source { get; set; }

        public string StackTrace { get; set; }

        public ExceptionMessage InnerException { get; set; }

        public Dictionary<object, object> Data { get; set; }
    }
}
