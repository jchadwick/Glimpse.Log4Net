A plugin to display log4net log messages in Glimpse.

Getting Started
--------
In order to begin using the Glimpse.Log4Net (GL4N) plugin, add a reference to the plugin assembly (*Glimpse.Log4Net.dll*) to your web project, or simply drop the assembly in your `/bin` folder.  

Alternatively, add the reference via NuGet:  `Install-Package Glimpse.Log4Net`


Basic Configuration
---------
Unless you manually configure a GL4N appender, GL4N will automatically attach one to log4net's Root appender for you.  This means that (for most configurations) adding the assembly reference to your project should be all that is required.

### Setting the Log Level threshold
By default, GL4N will only log messages above the Warn log level.
The best way to modify this default is to configure GL4N via your log4net configuration (shown below).
However, if everything works great and you just want to change the default log level, you may do so by setting the `Glimpse.Log4Net.Appender.GlimpseAppender.DefaultThreshold` property to the desired threshold.

For example, you would use the following code to log Debug messages (and above):

    Glimpse.Log4Net.Appender.GlimpseAppender.DefaultThreshold = log4net.Core.Level.Debug;

<blockquote>
<em>Note that this is a static property so it is applied globally!</em>
</blockquote>


Enhanced Configuration (via log4net)
---------
At the end of the day, GL4N is just a log4net appender that appends to Glimpse rather than, say, a physical log file.
This means that you configure it just like any other log4net appender.  

For example:

	<log4net>
		<appender name="GlimpseAppender" type="Glimpse.Log4Net.Appender.GlimpseAppender" />
		<root>
			<level value="ALL" />
			<appender-ref ref="GlimpseAppender" />
		</root>
	</log4net>

Note that, with this configuration in place, GL4N will use the configured appender and not create its own.