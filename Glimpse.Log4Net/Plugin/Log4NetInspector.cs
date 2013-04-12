using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Glimpse.Core.Extensibility;
using log4net;
using Glimpse.Log4Net.Appender;
using log4net.Repository.Hierarchy;

namespace Glimpse.Log4Net.Plugin
{
    /// <summary>
    /// The implementation of <see cref="IInspector"/> for capturing log4net messages.
    /// </summary>
    public class Log4NetInspector : IInspector
    {
        /// <summary>
        /// Setups the specified context.
        /// </summary>
        /// <param name="context">The context.</param>
        /// <remarks>
        /// Executed during the <see cref="Glimpse.Core.Framework.IGlimpseRuntime.Initialize" /> phase of
        /// system startup. Specifically, with the ASP.NET provider, this is wired to/implemented by the
        /// <c>System.Web.IHttpModule.Init</c> method.
        /// </remarks>
        public void Setup(IInspectorContext context)
        {
            var registeredAppenders =
                LogManager.GetAllRepositories()
                    .SelectMany(repo => repo.GetAppenders())
                    .OfType<GlimpseAppender>();

            if (registeredAppenders.Count() > 0)
                return;

            var repository = (Hierarchy)LogManager.GetRepository();
            repository.Root.AddAppender(new GlimpseAppender(context.MessageBroker, context.TimerStrategy));
        }
    }
}
