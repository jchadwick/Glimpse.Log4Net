﻿Glimpse.Log4Net adds one Glimpse plugin: log4net

The log4net tab shows every log4net log messages generated within the course of a request.

To get started using Glimpse.Log4Net you first need to add a reference to the Glimpse.Log4Net.dll and Glimpse.Core.dll to your project.

Then, add the GlimpseAppender to your log4net configuration. For example:
<log4net>
    <appender name="Glimpse" type="Glimpse.Log4Net.Appender.GlimpseAppender" />
    <root>
        <appender-ref ref="Glimpse" />
    </root>
</log4net>


Release Notes
-------------
9/25/2015 - 1.1.0
- Updating for Glimpse 1.8.6
- Updating for log4net 1.2.13 [2.0.3]
5/21/2013 - 1.0.0
- Updating for Glimpse 1.3.0
11/10/2012 - 0.86.3
- Updating for log4net 1.2.11 [2.0.0]
11/14/2011 - 0.86
- First release on Nuget.org!