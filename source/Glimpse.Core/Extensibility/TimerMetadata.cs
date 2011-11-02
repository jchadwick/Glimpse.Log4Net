using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Newtonsoft.Json;

namespace Glimpse.Core.Extensibility
{
    public class TimerMetadata
    {
        public TimerMetadata()
        {
            Stopwatch = new Stopwatch();
            Stopwatch.Start();
            Events = new List<TimerEvent>();
            Categories = new Dictionary<string, TimerCategory>
                           {
                               {"ASP.NET", new TimerCategory{EventColor = "#FD4545", EventColorHighlight = "#DD3131"}},
                               {"Filter", new TimerCategory{EventColor = "#72A3E4", EventColorHighlight = "#5087CF"}},
                               //{"Database", new TimerCategory{EventColor = "#AF78DD", EventColorHighlight = "#823BBE"}},
                               {"View", new TimerCategory{EventColor = "#10E309", EventColorHighlight = "#0EC41D"}},
                               {"Controller", new TimerCategory{EventColor = "#FDBF45", EventColorHighlight = "#DDA431"}},
                           };

            //'Database' : { eventColor : '#AF78DD', eventColorHighlight : '#823BBE' }, //:{ event:'purple' },
            //'Trace' : { eventColor : '#FDBF45', eventColorHighlight : '#DDA431' }, //{ event:'orange' },
            //'Routes' : { eventColor : '#10E309', eventColorHighlight : '#0EC41D' }, //{ event:'green' }
        }

        [JsonProperty("duration")]
        public long Duration { get; set; }

        [JsonProperty("category")]
        public IDictionary<string, TimerCategory> Categories { get; set; }
        [JsonProperty("events")]
        public IList<TimerEvent> Events { get; set; }
        private Stopwatch Stopwatch { get; set; }
        private long StartPoint { get; set; }

        public TimerEvent AddEvent(string message, string category = "ASP.NET", string description = null)
        {
            if (!Categories.Where(c => c.Key == category).Any())
                Categories.Add(category, new TimerCategory{EventColor = "#BBB", EventColorHighlight = "#BBB"});

            var result = new TimerEvent(message, category, description, Stopwatch);
            result.Stopped += (startPoint, duration) =>
                                  {
                                      var d = startPoint + duration - StartPoint;
                                      Duration = (long)((int)d * 1.01);//TODO: Fix this hack to add right padding on timeline
                                  };

            Events.Add(result);

            if (Events.Count == 1) StartPoint = result.StartPoint;

            return result;
        }

        public TimerEvent GetEvent(string message)
        {
            return Events.Where(e => e.Title == message).First();
        }
    }

    public class TimerEvent : IDisposable
    {
        public TimerEvent(string message, string catgory, string description, Stopwatch stopwatch)
        {
            Title = message;
            StartTime = DateTime.Now;
            SubText = description;
            Stopwatch = stopwatch;
            StartPoint = stopwatch.ElapsedMilliseconds;
            Category = catgory;
            IsStopped = false;
        }
        [JsonProperty("category")]
        public string Category { get; set; }
        [JsonProperty("startTime")]
        public DateTime StartTime { get; set; }
        [JsonProperty("startPoint")]
        public long StartPoint { get; set; }
        [JsonProperty("duration")]
        public long Duration { get; set; }
        [JsonProperty("title")]
        public string Title { get; set; }
        [JsonProperty("subText")]
        public string SubText { get; set; }
        [JsonProperty("details")]
        public IDictionary<string, string> Details { get; set; }
        private Stopwatch Stopwatch { get; set; }
        private bool IsStopped { get; set; }
        internal event Action<long, long> Stopped;

        public void Stop()
        {
            if (IsStopped) return;

            Duration = Stopwatch.ElapsedMilliseconds - StartPoint;
            IsStopped = true;
            if (Stopped != null) Stopped(StartPoint, Duration);
        }

        public void Dispose()
        {
            Stop();
        }
    }


    public class TimerCategory
    {
        [JsonProperty("eventColorHighlight")]
        public string EventColorHighlight { get; set; }
        [JsonProperty("eventColor")]
        public string EventColor { get; set; }
    }
}