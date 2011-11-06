var glimpseHistoryPlugin = (function ($, glimpse) {

/*(im port:glimpse.History.spy.js|2)*/ 
    
    var //Support
        isActive = false, 
        resultCount = 0,
        notice = undefined,
        currentData = undefined,
        wireListener = function () {  
            glimpse.pubsub.subscribe('data.elements.processed', wireDomListeners); 
            glimpse.pubsub.subscribe('state.build.prerender', setupData); 
            glimpse.pubsub.subscribe('action.plugin.created', function (topic, payload) { if (payload == 'History') { setup(); } });
            glimpse.pubsub.subscribe('action.plugin.deactive', function (topic, payload) { if (payload == 'History') { deactive(); } }); 
            glimpse.pubsub.subscribe('action.plugin.active', function (topic, payload) {  if (payload == 'History') { active(); } }); 
        },
        wireDomListeners = function () {
            glimpse.elements.holder.find('.glimpse-clear-History').live('click', function () { clear(); return false; });
            
            var panel = glimpse.elements.findPanel('History');
            panel.find('.glimpse-col-main tbody a').live('click', function () { selected($(this)); return false; });
            panel.find('.glimpse-col-side tbody a').live('click', function () { selectedSession($(this)); return false; });
            panel.find('.glimpse-col-side .glimpse-head-message a').live('click', function() { reset(); return false; });
        },
        setupData = function () {
            var payload = glimpse.data.current(),
                metadata = glimpse.data.currentMetadata().plugins;
                 
            payload.data.History = { name: 'History', data: 'No requests currently detected...', isPermanent : true };
            metadata.History = { helpUrl: 'http://getglimpse.com/Help/Plugin/Remote' }; 
        },
        
        setup = function () {
            var panel = glimpse.elements.findPanel('History'); 
            panel.html('<div class="glimpse-col-main"></div><div class="glimpse-col-side"></div>');
        },
        active = function () {
            isActive = true;
            glimpse.elements.options.html('<div class="glimpse-notice gdisconnect"><div class="icon"></div><span>Disconnected...</span></div>');
            notice = new glimpse.objects.ConnectionNotice(glimpse.elements.options.find('.glimpse-notice')); 
            
            //retreieveSummary(); 
        },
        deactive = function () {
            isActive = false; 
            glimpse.elements.options.html('');
            notice = null;
        }, 
        
        /*
        retreieveSummary = function () { 
            if (!isActive) { return; }

            //Poll for updated summary data
            notice.prePoll(); 
            $.History({
                url: glimpsePath + 'History',
                data: { 'glimpseId' : currentData.requestId },
                type: 'GET',
                contentType: 'application/json',
                complete : function(jqXHR, textStatus) {
                    if (!isActive) { return; } 
                    notice.complete(textStatus); 
                    setTimeout(retreieveSummary, 1000);
                },
                success: function (result) {
                    if (!isActive) { return; } 
                    if (resultCount != result.length)
                        processSummary(result);
                    resultCount = result.length; 
                }
            });
        },
        processSummary = function (result) { 
            var panel = glimpse.elements.findPanel('History');
            
            //Insert container table
            if (panel.find('table').length == 0) {
                var data = [['Request URL', 'Method', 'Duration', 'Date/Time', 'View']],
                    metadata = [[ { data : 0, key : true, width : '40%' }, { data : 1 }, { data : 2, width : '10%' },  { data : 3, width : '20%' },  { data : 4, width : '100px' } ]];
                panel.html(glimpse.render.build(data, metadata)).find('table').append('<tbody></tbody>');
                panel.find('thead').append('<tr class="glimpse-head-message" style="display:none"><td colspan="6"><a href="#">Reset context back to starting page</a></td></tr>');
            }
            
            //Prepend results as we go 
            for (var x = result.length; --x >= resultCount;) {
                var item = result[x];
                panel.find('tbody').prepend('<tr class="' + (x % 2 == 0 ? 'even' : 'odd') + '"><td>' + item.url + '</td><td>' + item.method + '</td><td>' + item.duration + '<span class="glimpse-soft"> ms</span></td><td>' + item.requestTime + '</td><td><a href="#" class="glimpse-History-link" data-glimpseId="' + item.requestId + '">Inspect</a></td></tr>');
            }
        },
        
        clear = function () {
            glimpse.elements.findPanel('History').html('<div class="glimpse-panel-message">No requests currently detected...</div>'); 
        },
        
        reset = function () {
            var panel = glimpse.elements.findPanel('History');
            panel.find('.glimpse-head-message').fadeOut();
            panel.find('.selected').removeClass('selected');
             
            glimpse.data.update(currentData);
        },
        
        selected = function (item) {
            var requestId = item.attr('data-glimpseId');

            item.hide().parent().append('<div class="loading glimpse-History-loading" data-glimpseId="' + requestId + '"><div class="icon"></div>Loading...</div>');

            request(requestId);
        },
        request = function (requestId) { 
            glimpse.data.retrieve(requestId, {
                success : function (requestId, data, current) {
                    process(requestId);
                }
            });
        },
        process = function (requestId) {
            var panel = glimpse.elements.findPanel('History'),
                loading = panel.find('.glimpse-History-loading[data-glimpseId="' + requestId + '"]'),
                link = panel.find('.glimpse-History-link[data-glimpseId="' + requestId + '"]');

            panel.find('.glimpse-head-message').fadeIn();
            panel.find('.selected').removeClass('selected'); 
            loading.fadeOut(100).delay(100).remove(); 
            link.delay(100).fadeIn().parents('tr:first').addClass('selected');
        },
        */

        //Main 
        init = function () {
            wireListener(); 
        };

    init();
}($Glimpse, glimpse));