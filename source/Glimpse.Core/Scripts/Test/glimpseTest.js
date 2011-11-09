
var glimpseTest = (function ($) {
    var //Support
        testHandlers = {},
        pager = function () {
            var generate = function (data) {
                    var pagingInfo = { pageSize : 5, pageIndex : 1, totalNumberOfRecords : 31 },
                        result = [['Title 1', 'Title 2', 'Title 3']],
                        start = data.pageIndex * pagingInfo.pageSize,
                        end = start + pagingInfo.pageSize,
                        random = start;
                        
                    if (end > pagingInfo.totalNumberOfRecords)
                        end = pagingInfo.totalNumberOfRecords;
        
                    for (var i = start; i < end; i++) 
                        result.push([random++, random++, random++]);
        
                    return result;
                },
                trigger = function (param) {
                    param.complete();
        
                    setTimeout(function () {
                        param.success(generate(param.data));
                    }, 300);
                };
        
            return {
                trigger : trigger
            };
        } (),
        ajax = function () {
            var result = [],
                possibleResults = [{ method : 'Get', duration : 213, browser : '', clientName : '', requestTime : '2011/11/09 12:00:12', requestId : 'ajax0', isAjax : true, url : '/News'},
                    { method : 'Get', duration : 123, browser : '', clientName : '', requestTime : '2011/11/09 12:10:34', requestId : 'ajax1', isAjax : true, url : '/Shares'},
                    { method : 'Get', duration : 234, browser : '', clientName : '', requestTime : '2011/11/09 12:12:23', requestId : 'ajax2', isAjax : true, url : '/Order/230'},
                    { method : 'Post', duration : 342, browser : '', clientName : '', requestTime : '2011/11/09 12:17:52', requestId : 'ajax3', isAjax : true, url : '/Order/Add'},
                    { method : 'Post', duration : 211, browser : '', clientName : '', requestTime : '2011/11/24 12:00:35', requestId : 'ajax4', isAjax : true, url : '/History/Results'},
                    { method : 'Post', duration : 242, browser : '', clientName : '', requestTime : '2011/11/09 12:27:23', requestId : 'ajax5', isAjax : true, url : '/News/List'},
                    { method : 'Get', duration : 1234, browser : '', clientName : '', requestTime : '2011/11/09 12:29:14', requestId : 'ajax6', isAjax : true, url : '/News'}],
                index = 0,
                lastId = 0,
                generate = function (data) {  
                    if ((index < 6 && data.glimpseId == 1234) || index < 3)
                        result.push(possibleResults[index++]);
                    return result;
                },
                trigger = function (param) { 
                    if (param.data.glimpseId != lastId) {
                        index = 0;
                        lastId = param.data.glimpseId;
                    }
        
                    setTimeout(function () {
                        var success = (Math.floor(Math.random() * 11) != 10);
                        param.complete(null, (success ? 'Success' : 'Fail'));
                        if (success)
                            param.success(generate(param.data));
                    }, 300);
                };
        
            return {
                trigger : trigger
            };
        } (),
        history = function () {
            var requests1 = { 
                    ajax0 : { type : 'Session', method : 'Get', duration : 213, browser : 'Chrome 16.0', clientName : '', requestTime : '2011/11/09 12:00:12', requestId : 'ajax0', isAjax : true, url : '/Product'},
                    ajax1 : { type : 'Server', method : 'Get', duration : 123, browser : 'Chrome 16.0', clientName : '', requestTime : '2011/11/09 12:10:34', requestId : 'ajax1', isAjax : true, url : '/Product/Trip'},
                    ajax2 : { type : 'Request', method : 'Get', duration : 234, browser : 'Chrome 16.0', clientName : '', requestTime : '2011/11/09 12:12:23', requestId : 'ajax2', isAjax : true, url : '/Product/230'},
                    ajax3 : { type : 'Trace', method : 'Post', duration : 342, browser : 'Chrome 16.0', clientName : '', requestTime : '2011/11/09 12:17:52', requestId : 'ajax3', isAjax : true, url : '/Product/Add'},
                    ajax4 : { type : 'Environment', method : 'Post', duration : 211, browser : 'Chrome 16.0', clientName : '', requestTime : '2011/11/24 12:00:35', requestId : 'ajax4', isAjax : true, url : '/Product/Results'},
                    ajax5 : { type : 'SQL', method : 'Post', duration : 242, browser : 'Chrome 16.0', clientName : '', requestTime : '2011/11/09 12:27:23', requestId : 'ajax5', isAjax : true, url : '/Product/List'},
                    ajax6 : { type : 'Routes', method : 'Get', duration : 1234, browser : 'Chrome 16.0', clientName : '', requestTime : '2011/11/09 12:29:14', requestId : 'ajax6', isAjax : true, url : '/Product'}
                },
                requests2 = { 
                    ajax0 : { type : 'Session', method : 'Post', duration : 213, browser : 'iPhone 1', clientName : 'iPhone', requestTime : '2011/11/09 12:00:12', requestId : 'ajax0', isAjax : true, url : '/Product'},
                    ajax1 : { type : 'Server', method : 'Post', duration : 123, browser : 'iPhone 1', clientName : 'iPhone', requestTime : '2011/11/09 12:10:34', requestId : 'ajax1', isAjax : false, url : '/Product'},
                    ajax2 : { type : 'Request', method : 'Post', duration : 234, browser : 'iPhone 1', clientName : 'iPhone', requestTime : '2011/11/09 12:12:23', requestId : 'ajax2', isAjax : false, url : '/Product/230'},
                    ajax3 : { type : 'Trace', method : 'Post', duration : 342, browser : 'iPhone 1', clientName : 'iPhone', requestTime : '2011/11/09 12:17:52', requestId : 'ajax3', isAjax : false, url : '/Product/Add'}
                },
                requests3 = { 
                    ajax4 : { type : 'Environment', method : 'Get', duration : 211, browser : 'IE6', clientName : 'Remote', requestTime : '2011/11/24 12:00:35', requestId : 'ajax4', isAjax : false, url : '/Product/Results'},
                    ajax5 : { type : 'SQL', method : 'Get', duration : 242, browser : 'IE6', clientName : 'Remote', requestTime : '2011/11/09 12:27:23', requestId : 'ajax5', isAjax : false, url : '/Product/List'},
                    ajax6 : { type : 'Routes', method : 'Get', duration : 1234, browser : 'IE6', clientName : 'Remote', requestTime : '2011/11/09 12:29:14', requestId : 'ajax6', isAjax : false, url : '/Product'}
                },
                requests = {
                    '' : requests1,
                    'iPhone' : requests2,
                    'Remote' : requests3 
                },  
                
                data = {
                    "Session":{ name : 'Session', data : [["Key","Value","Type"],["CartId","2dc2f24f-5816-4e8e-bc70-2438ce628be8","string"],["__ControllerTempData",{"Test":"A bit of temp"},"System.Collections.Generic.Dictionary<string,object>"]] },
                    "Server":{ name : 'Server', data : {"ALL_HTTP":"HTTP_CONNECTION:keep-alive\r\nHTTP_ACCEPT:text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\r\nHTTP_ACCEPT_CHARSET:ISO-8859-1,utf-8;q=0.7,*;q=0.3\r\nHTTP_ACCEPT_ENCODING:gzip,deflate,sdch\r\nHTTP_ACCEPT_LANGUAGE:en-US,en;q=0.8\r\nHTTP_COOKIE:glimpseClientName=null; glimpseState=On; ASP.NET_SessionId=1k33gr33dxqvzw3tm41koizh; prgLocation=/StoreManager/; prgLocationRedirect=/Account/LogOn?ReturnUrl=%2fStoreManager%2f; prgLocationId=25620064-8eb8-4879-842d-092a99b2b0ef; prgLocationMethod=GET; glimpseOptions=%7B%220%22%3A%22n%22%2C%221%22%3A%22u%22%2C%222%22%3A%22l%22%2C%223%22%3A%22l%22%2C%22open%22%3Atrue%2C%22height%22%3A447%2C%22activeTab%22%3A%22Views%22%2C%22popupOn%22%3Afalse%2C%22firstPopup%22%3Atrue%2C%22timeView%22%3Afalse%7D\r\nHTTP_HOST:localhost:33333\r\nHTTP_USER_AGENT:Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.83 Safari/535.2\r\n","ALL_RAW":"Connection: keep-alive\r\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\r\nAccept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.3\r\nAccept-Encoding: gzip,deflate,sdch\r\nAccept-Language: en-US,en;q=0.8\r\nCookie: glimpseClientName=null; glimpseState=On; ASP.NET_SessionId=1k33gr33dxqvzw3tm41koizh; prgLocation=/StoreManager/; prgLocationRedirect=/Account/LogOn?ReturnUrl=%2fStoreManager%2f; prgLocationId=25620064-8eb8-4879-842d-092a99b2b0ef; prgLocationMethod=GET; glimpseOptions=%7B%220%22%3A%22n%22%2C%221%22%3A%22u%22%2C%222%22%3A%22l%22%2C%223%22%3A%22l%22%2C%22open%22%3Atrue%2C%22height%22%3A447%2C%22activeTab%22%3A%22Views%22%2C%22popupOn%22%3Afalse%2C%22firstPopup%22%3Atrue%2C%22timeView%22%3Afalse%7D\r\nHost: localhost:33333\r\nUser-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.83 Safari/535.2\r\n","APPL_MD_PATH":"","APPL_PHYSICAL_PATH":"C:\\Users\\avanderhoorn\\Glimpse\\source\\Glimpse.Sample.MVC3\\","AUTH_TYPE":"","AUTH_USER":"","AUTH_PASSWORD":"","LOGON_USER":"CORP\\AVanDerHoorn","REMOTE_USER":"","CERT_COOKIE":"","CERT_FLAGS":"","CERT_ISSUER":"","CERT_KEYSIZE":"","CERT_SECRETKEYSIZE":"","CERT_SERIALNUMBER":"","CERT_SERVER_ISSUER":"","CERT_SERVER_SUBJECT":"","CERT_SUBJECT":"","CONTENT_LENGTH":"0","CONTENT_TYPE":"","GATEWAY_INTERFACE":"","HTTPS":"","HTTPS_KEYSIZE":"","HTTPS_SECRETKEYSIZE":"","HTTPS_SERVER_ISSUER":"","HTTPS_SERVER_SUBJECT":"","INSTANCE_ID":"","INSTANCE_META_PATH":"","LOCAL_ADDR":"127.0.0.1","PATH_INFO":"/","PATH_TRANSLATED":"C:\\Users\\avanderhoorn\\Glimpse\\source\\Glimpse.Sample.MVC3","QUERY_STRING":"","REMOTE_ADDR":"127.0.0.1","REMOTE_HOST":"127.0.0.1","REMOTE_PORT":"","REQUEST_METHOD":"GET","SCRIPT_NAME":"/","SERVER_NAME":"localhost","SERVER_PORT":"33333","SERVER_PORT_SECURE":"0","SERVER_PROTOCOL":"HTTP/1.1","SERVER_SOFTWARE":"","URL":"/","HTTP_CONNECTION":"keep-alive","HTTP_ACCEPT":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8","HTTP_ACCEPT_CHARSET":"ISO-8859-1,utf-8;q=0.7,*;q=0.3","HTTP_ACCEPT_ENCODING":"gzip,deflate,sdch","HTTP_ACCEPT_LANGUAGE":"en-US,en;q=0.8","HTTP_COOKIE":"glimpseClientName=null; glimpseState=On; ASP.NET_SessionId=1k33gr33dxqvzw3tm41koizh; prgLocation=/StoreManager/; prgLocationRedirect=/Account/LogOn?ReturnUrl=%2fStoreManager%2f; prgLocationId=25620064-8eb8-4879-842d-092a99b2b0ef; prgLocationMethod=GET; glimpseOptions=%7B%220%22%3A%22n%22%2C%221%22%3A%22u%22%2C%222%22%3A%22l%22%2C%223%22%3A%22l%22%2C%22open%22%3Atrue%2C%22height%22%3A447%2C%22activeTab%22%3A%22Views%22%2C%22popupOn%22%3Afalse%2C%22firstPopup%22%3Atrue%2C%22timeView%22%3Afalse%7D","HTTP_HOST":"localhost:33333","HTTP_USER_AGENT":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.83 Safari/535.2"} },
                    "Request":{ name : 'Request', data : {"Cookies":[["Name","Path","Secure","Value"],["glimpseClientName","/","False","null"],["glimpseState","/","False","On"],["ASP.NET_SessionId","/","False","1k33gr33dxqvzw3tm41koizh"],["prgLocation","/","False","/StoreManager/"],["prgLocationRedirect","/","False","/Account/LogOn?ReturnUrl=/StoreManager/"],["prgLocationId","/","False","25620064-8eb8-4879-842d-092a99b2b0ef"],["prgLocationMethod","/","False","GET"],["glimpseOptions","/","False","{\"0\":\"n\",\"1\":\"u\",\"2\":\"l\",\"3\":\"l\",\"open\":true,\"height\":447,\"activeTab\":\"Views\",\"popupOn\":false,\"firstPopup\":true,\"timeView\":false}"]],"Form":null,"QueryString":null,"InputStream":null,"CurrentUICulture":"en-US","ApplicationPath":"/","AppRelativeCurrentExecutionFilePath":"~/","CurrentExecutionFilePath":"/","FilePath":"/","Path":"/","PathInfo":"","PhysicalApplicationPath":"C:\\Users\\avanderhoorn\\Glimpse\\source\\Glimpse.Sample.MVC3\\","PhysicalPath":"C:\\Users\\avanderhoorn\\Glimpse\\source\\Glimpse.Sample.MVC3","RawUrl":"/","Url":"http://localhost:33333/","UrlReferrer":null,"UserAgent":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.83 Safari/535.2","UserHostAddress":"127.0.0.1","UserHostName":"127.0.0.1"} },
                    "Trace":{ name : 'Trace', data : [["Category","Message","From First","From Last"],["Info","IDependencyResolver.GetService<System.Web.Mvc.IControllerActivator>() = null",null,null,"info"],["Info","CreateControllerInterceptor.CreateController(requestContext, \"Home\") = MvcMusicStore.Controllers.HomeController","86 ms","86 ms","info"],["Info","IDependencyResolver.GetServices<System.Web.Mvc.IFilterProvider>() = null","99 ms","12 ms","info"],["Info","Got top 5 albums","1818 ms","1719 ms","info"],["Info","This is info from Glimpse","1820 ms","1 ms","info"],["Warn","This is warn from Glimpse at 10/9/2011 1:20:08 PM","1821 ms","0 ms","warn"],["Error","This is error from MvcMusicStore.Controllers.HomeController","1822 ms","0 ms","error"],["Fail","This is Fail from Glimpse","1822 ms","0 ms","fail"],["Warning","Test TraceWarning;","1824 ms","1 ms","warn"],["Error","Test TraceError;","1825 ms","1 ms","error"],["Information","Test TraceInformation;","1826 ms","1 ms","info"],["Info","IDependencyResolver.GetServices<System.Web.Mvc.IViewEngine>() = null","1829 ms","3 ms","info"],["Info","IDependencyResolver.GetService<System.Web.Mvc.IViewPageActivator>() = null","2335 ms","506 ms","info"],["Info","IDependencyResolver.GetService<ASP._Page_Views_Home_Index_cshtml>() = ASP._Page_Views_Home_Index_cshtml","2338 ms","3 ms","info"],["Info","CreateControllerInterceptor.CreateController(requestContext, \"ShoppingCart\") = MvcMusicStore.Controllers.ShoppingCartController","3498 ms","1159 ms","info"],["Info","IDependencyResolver.GetService<ASP._Page_Views_ShoppingCart_CartSummary_cshtml>() = ASP._Page_Views_ShoppingCart_CartSummary_cshtml","3964 ms","465 ms","info"],["Info","CreateControllerInterceptor.CreateController(requestContext, \"Store\") = MvcMusicStore.Controllers.StoreController","4007 ms","42 ms","info"],["Info","IDependencyResolver.GetService<ASP._Page_Views_Store_GenreMenu_cshtml>() = ASP._Page_Views_Store_GenreMenu_cshtml","4859 ms","851 ms","info"],["Info","IDependencyResolver.GetService<System.Web.Mvc.ModelMetadataProvider>() = null","5247 ms","388 ms","info"]],"Config":{"AppSettings":{"ClientValidationEnabled":"true","UnobtrusiveJavaScriptEnabled":"true"},"ConnectionStrings":{"LocalSqlServer":"data source=.\\SQLEXPRESS;Integrated Security=SSPI;AttachDBFilename=|DataDirectory|aspnetdb.mdf;User Instance=true","MusicStoreEntities":"Data Source=|DataDirectory|MvcMusicStore.sdf"},"CustomErrors":{"Mode":"RemoteOnly","RedirectMode":"ResponseRedirect","DefaultRedirect":"/Opps/Problem/","Errors":{"404":"/Opps/NotFound/","401":"/Opps/NotAllowed/","500":"/Opps/BadProgram/"}},"Authentication":{"Mode":"Forms","Cookieless":"UseDeviceProfile","DefaultUrl":"default.aspx","Domain":null,"EnableCrossAppRedirects":"False","LoginUrl":"~/Account/LogOn","Name":".ASPXAUTH","Path":"/","Protection":"All","RequireSSL":"False","SlidingExpiration":"True","TicketCompatibilityMode":"Framework20","Timeout":"2.00:00:00"}} },
                    "Environment":{ name : 'Environment', data : {"Environment Name":"Dev","Machine":[["Name","Operating System","Start Time"],["NN-AVANDERHOORN (4 processors)","Microsoft Windows NT 6.1.7600.0 (64 bit)",new Date(1318007390840)]],"Web Server":[["Type","Integrated Pipeline"],["Visual Studio Web Development Server","False"]],"Framework":[[".NET Framework","Debugging","Server Culture","Current Trust Level"],[".NET 4.0.30319.225 (32 bit)","True","en-US","Unrestricted"]],"Process":[["Worker Process","Process ID","Start Time"],["WebDev.WebServer40.exe",6372,new Date(1318180783512)]],"Timezone":[["Current","Is Daylight Saving","UtcOffset w/DLS"],["(UTC-05:00) Eastern Time (US & Canada)","True",-4]],"Application Assemblies":[["Name","Version","Culture","From GAC","Full Trust"],["Anonymously Hosted DynamicMethods Assembly","0.0.0.0","_neutral_","False","True"],["App_global.asax.aomqkliw","0.0.0.0","_neutral_","False","True"],["App_Web_fv3jvfpv","0.0.0.0","_neutral_","False","True"],["App_Web_mwskk53m","0.0.0.0","_neutral_","False","True"],["App_Web_nbkzhuxw","0.0.0.0","_neutral_","False","True"],["App_Web_twmmx5az","0.0.0.0","_neutral_","False","True"],["App_Web_ugeopa2n","0.0.0.0","_neutral_","False","True"],["Castle.Core","2.5.1.0","_neutral_","False","True"],["CppCodeProvider","10.0.0.0","_neutral_","True","True"],["DynamicProxyGenAssembly2","0.0.0.0","_neutral_","False","True"],["DynamicProxyGenAssembly2","0.0.0.0","_neutral_","False","True"],["DynamicProxyGenAssembly2","0.0.0.0","_neutral_","False","True"],["DynamicProxyGenAssembly2","0.0.0.0","_neutral_","False","True"],["DynamicProxyGenAssembly2","0.0.0.0","_neutral_","False","True"],["EntityFramework","4.1.0.0","_neutral_","False","True"],["EntityFrameworkDynamicProxies-EntityFramework","1.0.0.0","_neutral_","False","True"],["EntityFrameworkDynamicProxies-MvcMusicStore","1.0.0.0","_neutral_","False","True"],["Glimpse.Core","0.85.0.0","_neutral_","False","True"],["Glimpse.Ef","0.0.5.0","_neutral_","False","True"],["Glimpse.Mvc3","0.85.0.0","_neutral_","False","True"],["LukeSkywalker.IPNetwork","1.3.1.0","_neutral_","False","True"],["MetadataViewProxies_89c1cd79-c764-49ee-94b0-36eaf451d055","0.0.0.0","_neutral_","False","True"],["mnml2iog","0.0.0.0","_neutral_","False","True"],["mscorlib","4.0.0.0","_neutral_","True","True"],["MvcMusicStore","1.0.0.0","_neutral_","False","True"],["Newtonsoft.Json.Net35","4.0.2.0","_neutral_","False","True"],["NLog","2.0.0.0","_neutral_","False","True"],["NLog.Extended","2.0.0.0","_neutral_","False","True"],["SMDiagnostics","4.0.0.0","_neutral_","True","True"],["WebDev.WebHost40","10.0.0.0","_neutral_","True","True"]],"System Assemblies":[["Name","Version","Culture","From GAC","Full Trust"],["Microsoft.Build.Framework","4.0.0.0","_neutral_","True","True"],["Microsoft.Build.Utilities.v4.0","4.0.0.0","_neutral_","True","True"],["Microsoft.CSharp","4.0.0.0","_neutral_","True","True"],["Microsoft.JScript","10.0.0.0","_neutral_","True","True"],["Microsoft.VisualBasic.Activities.Compiler","10.0.0.0","_neutral_","True","True"],["Microsoft.Web.Infrastructure","1.0.0.0","_neutral_","True","True"],["System","4.0.0.0","_neutral_","True","True"],["System.Activities","4.0.0.0","_neutral_","True","True"],["System.ComponentModel.Composition","4.0.0.0","_neutral_","True","True"],["System.ComponentModel.DataAnnotations","4.0.0.0","_neutral_","True","True"],["System.Configuration","4.0.0.0","_neutral_","True","True"],["System.Core","4.0.0.0","_neutral_","True","True"],["System.Data","4.0.0.0","_neutral_","True","True"],["System.Data.DataSetExtensions","4.0.0.0","_neutral_","True","True"],["System.Data.Entity","4.0.0.0","_neutral_","True","True"],["System.Data.Linq","4.0.0.0","_neutral_","True","True"],["System.Data.OracleClient","4.0.0.0","_neutral_","True","True"],["System.Data.Services.Design","4.0.0.0","_neutral_","True","True"],["System.Data.SqlServerCe","3.5.1.0","_neutral_","True","True"],["System.Data.SqlServerCe","4.0.0.0","_neutral_","True","True"],["System.Data.SqlServerCe.Entity","4.0.0.0","_neutral_","True","True"],["System.Data.SqlXml","4.0.0.0","_neutral_","True","True"],["System.DirectoryServices","4.0.0.0","_neutral_","True","True"],["System.DirectoryServices.Protocols","4.0.0.0","_neutral_","True","True"],["System.Drawing","4.0.0.0","_neutral_","True","True"],["System.Dynamic","4.0.0.0","_neutral_","True","True"],["System.EnterpriseServices","4.0.0.0","_neutral_","True","True"],["System.IdentityModel","4.0.0.0","_neutral_","True","True"],["System.Messaging","4.0.0.0","_neutral_","True","True"],["System.Numerics","4.0.0.0","_neutral_","True","True"],["System.Runtime.Caching","4.0.0.0","_neutral_","True","True"],["System.Runtime.DurableInstancing","4.0.0.0","_neutral_","True","True"],["System.Runtime.Serialization","4.0.0.0","_neutral_","True","True"],["System.Security","4.0.0.0","_neutral_","True","True"],["System.ServiceModel","4.0.0.0","_neutral_","True","True"],["System.ServiceModel.Activation","4.0.0.0","_neutral_","True","True"],["System.ServiceModel.Activities","4.0.0.0","_neutral_","True","True"],["System.ServiceModel.Web","4.0.0.0","_neutral_","True","True"],["System.Transactions","4.0.0.0","_neutral_","True","True"],["System.Web","4.0.0.0","_neutral_","True","True"],["System.Web.Abstractions","4.0.0.0","_neutral_","True","True"],["System.Web.ApplicationServices","4.0.0.0","_neutral_","True","True"],["System.Web.DynamicData","4.0.0.0","_neutral_","True","True"],["System.Web.Extensions","4.0.0.0","_neutral_","True","True"],["System.Web.Helpers","1.0.0.0","_neutral_","True","True"],["System.Web.Mobile","4.0.0.0","_neutral_","True","True"],["System.Web.Mvc","3.0.0.0","_neutral_","True","True"],["System.Web.Razor","1.0.0.0","_neutral_","True","True"],["System.Web.RegularExpressions","4.0.0.0","_neutral_","True","True"],["System.Web.Routing","4.0.0.0","_neutral_","True","True"],["System.Web.Services","4.0.0.0","_neutral_","True","True"],["System.Web.WebPages","1.0.0.0","_neutral_","True","True"],["System.Web.WebPages.Deployment","1.0.0.0","_neutral_","True","True"],["System.Web.WebPages.Razor","1.0.0.0","_neutral_","True","True"],["System.Windows.Forms","4.0.0.0","_neutral_","True","True"],["System.Workflow.Activities","4.0.0.0","_neutral_","True","True"],["System.Workflow.ComponentModel","4.0.0.0","_neutral_","True","True"],["System.Workflow.Runtime","4.0.0.0","_neutral_","True","True"],["System.WorkflowServices","4.0.0.0","_neutral_","True","True"],["System.Xaml","4.0.0.0","_neutral_","True","True"],["System.Xml","4.0.0.0","_neutral_","True","True"],["System.Xml.Linq","4.0.0.0","_neutral_","True","True"]]} },
                    "SQL":{ name : 'SQL', data : [["Commands per Connection","Open Time"],[[["Transaction Start","Ordinal","Command","Parameters","Records","Command Time","From First","Transaction End","Errors"],[null,1,"SELECT TOP (1) \r\n[Extent1].[Id] AS [Id], \r\n[Extent1].[ModelHash] AS [ModelHash]\r\nFROM [EdmMetadata] AS [Extent1]\r\nORDER BY [Extent1].[Id] DESC",null,1,30,"0",null,null,""],[null,2,"SELECT TOP (5) \r\n[Project1].[AlbumId] AS [AlbumId], \r\n[Project1].[GenreId] AS [GenreId], \r\n[Project1].[ArtistId] AS [ArtistId], \r\n[Project1].[Title] AS [Title], \r\n[Project1].[Price] AS [Price], \r\n[Project1].[AlbumArtUrl] AS [AlbumArtUrl]\r\nFROM ( SELECT \r\n\t[Extent1].[AlbumId] AS [AlbumId], \r\n\t[Extent1].[GenreId] AS [GenreId], \r\n\t[Extent1].[ArtistId] AS [ArtistId], \r\n\t[Extent1].[Title] AS [Title], \r\n\t[Extent1].[Price] AS [Price], \r\n\t[Extent1].[AlbumArtUrl] AS [AlbumArtUrl], \r\n\t[SSQTAB1].[A1] AS [C1]\r\n\tFROM [Albums] AS [Extent1]\r\n\t OUTER APPLY\r\n\t(SELECT \r\n\t\tCOUNT(1) AS [A1]\r\n\t\tFROM [OrderDetails] AS [Extent2]\r\n\t\tWHERE [Extent1].[AlbumId] = [Extent2].[AlbumId]) AS [SSQTAB1]\r\n)  AS [Project1]\r\nORDER BY [Project1].[C1] DESC",null,5,3,"0",null,null,""]],1536.0],[[["Transaction Start","Ordinal","Command","Parameters","Records","Command Time","From First","Transaction End","Errors"],[null,1,"SELECT \r\n[GroupBy1].[A1] AS [C1]\r\nFROM ( SELECT \r\n\tSUM([Extent1].[Count]) AS [A1]\r\n\tFROM [Carts] AS [Extent1]\r\n\tWHERE [Extent1].[CartId] = '2dc2f24f-5816-4e8e-bc70-2438ce628be8' /* @p__linq__0 */\r\n)  AS [GroupBy1]",[["Name","Value","Type","Size"],["@p__linq__0","2dc2f24f-5816-4e8e-bc70-2438ce628be8","String",0]],1,10,"0",null,null,""]],43.0],[[["Transaction Start","Ordinal","Command","Parameters","Records","Command Time","From First","Transaction End","Errors"],[null,1,"SELECT \r\n[Extent1].[GenreId] AS [GenreId], \r\n[Extent1].[Name] AS [Name], \r\n[Extent1].[Description] AS [Description]\r\nFROM [Genres] AS [Extent1]",null,10,394,"0",null,null,""]],414.0]] },
                    "Routes":{ name : 'Routes', data : [["Match","Area","Url","Data","Constraints","DataTokens"],["False","Test","Test/{controller}/{action}/{id}",null,null,{"Namespaces":["MvcMusicStore.Areas.Test.*"],"area":"Test","UseNamespaceFallback":false},""],["False","Test","Test/{controller}/NeverUsed/{action}/{id}",null,null,{"Namespaces":["MvcMusicStore.Areas.Test.*"],"area":"Test","UseNamespaceFallback":false},""],["False","_Root_","{resource}.axd/{*pathInfo}",null,null,null,""],["False","_Root_","{*favicon}",null,{"favicon":"(.*/)?favicon.ico(/.*)?"},null,""],["True","_Root_","{controller}/{action}/{id}",[["Placeholder","Default Value","Actual Value"],["controller","Home","Home"],["action","Index","Index"],["id","_Optional_","_Optional_"]],null,null,"selected"],["False","_Root_","Never/Used/Route",null,null,null,""]] },
                    "_metadata":{"request":{"correlation" : { title : 'PRG Request', legs : [ { method : 'POST', url : '/Help/Feature/Add', glimpseId : 'GUID' }, { method : 'GET', url : '/', glimpseId : 'GUID' } ] }, "environmentUrls":{"Dev":"http://localhost/","QA":"http://qa.getglimpse.com/","Prod":"http://getglimpse.com/"},"runningVersion":0.85},"plugins":{"Paging":{"pagingInfo":{ pagerType : 'continuous', pageSize : 5, pageIndex : 0, totalNumberOfRecords : 31 }}, "Lazy":{},"Server":{"helpUrl":"http://getGlimpse.com/Help/Plugin/Server"},"Session":{"helpUrl":"http://getGlimpse.com/Help/Plugin/Session"},"Request":{"helpUrl":"http://getGlimpse.com/Help/Plugin/Request"},"Trace":{"helpUrl":"http://getGlimpse.com/Help/Plugin/Trace"},"Config":{"helpUrl":"http://getGlimpse.com/Help/Plugin/Config"},"Environment":{"helpUrl":"http://getGlimpse.com/Help/Plugin/Environment"},"SQL":{"helpUrl":"http://getGlimpse.com/Help/Plugin/EF","structure":[[{"forceFull":true,"data":0,"structure":[[{"span":6,"forceFull":true,"minDisplay":true,"data":0,"structure":[[{"width":"150px","key":true,"data":0},{"data":1}]]}],[{"width":"55px","data":1},{"isCode":true,"codeType":"sql","data":2},{"width":"25%","data":3},{"width":"60px","data":4},{"width":"100px","post":" ms","className":"mono","data":5},{"width":"70px","pre":"T+ ","post":" ms","className":"mono","data":6}],[{"span":6,"forceFull":true,"minDisplay":true,"data":8,"structure":[[{"width":"20%","data":0},{"className":"mono","data":1}]]}],[{"span":6,"forceFull":true,"minDisplay":true,"data":7,"structure":[[{"width":"150px","key":true,"data":0},{"data":1}]]}]]},{"width":"75px","post":" ms","className":"mono","data":1}]]},"Routes":{"helpUrl":"http://getGlimpse.com/Help/Plugin/Routes"},"Binding":{"helpUrl":"http://getGlimpse.com/Help/Plugin/Binders"},"Views":{"helpUrl":"http://getGlimpse.com/Help/Plugin/Views"},"Execution":{"helpUrl":"http://getGlimpse.com/Help/Plugin/Execution"},"MetaData":{"helpUrl":"http://getGlimpse.com/Help/Plugin/MetaData","structure":[[{"width":"150px","data":0},{"width":"25%","data":1},{"data":2}]]}} }
                },
        
                tracker = [ 
                    { name : '', count : 0, min : 0, max : 7 },
                    { name : 'iPhone', count : 0, min : 0, max : 4 },
                    { name : 'Remote', count : 4, min : 4, max : 7 } 
                ],  
                trackerData = {},
        
                radomResponse = function() { 
                    var mainIndex = random(5);
                    if (mainIndex < 3) {
                        var tackedItem = tracker[mainIndex];
                        if (tackedItem.count < tackedItem.max) { 
                            if (tackedItem.count == tackedItem.min) 
                                trackerData[tackedItem.name] = {};
                            trackerData[tackedItem.name]['ajax' + tackedItem.count] = requests[tackedItem.name]['ajax' + tackedItem.count];
                            tackedItem.count++;
                        }
                    }
                    return trackerData;
                },
        
                trigger = function (param) { 
        
                    setTimeout(function () { 
                        var response; 
                        if (param.data && param.data.ClientRequestID) { 
                            param.complete();
                            response = requests1[param.data.ClientRequestID];
                            if (response) {
                                response.data = {};
                                response.data[response.type] = data[response.type];
                                response.data['_metadata'] = data['_metadata']; 
                            } 
                        } 
                        else { 
                            param.complete(null, (random(11) != 10 ? 'Success' : 'Fail')); 
                            response = radomResponse();
                        }
                        
                        param.success(response);
                    }, 300);
                };
        
            return {
                trigger : trigger
            };
        } (),
        
        //Main
        random = function (length) {
            return Math.floor(Math.random() * length)
        },
        retrieve = function (name) {
            return testHandlers[name];
        },
        register = function (name, callback) {
            testHandlers[name] = callback;
        },
        init = function () { 
            register("Pager", function(param) { pager.trigger(param); });
            register("Ajax", function(param) { ajax.trigger(param); }); 
            register("History", function(param) { history.trigger(param); }); 

            //http://stackoverflow.com/questions/5272698/how-to-fake-jquery-ajax-response
            var original = $.ajax;
            $.ajax = function (param) { 
                var callback = retrieve(param.url);
                if (callback)
                    callback(param);
                else 
                    original(param); 
            };
        };

    init();
}($Glimpse));