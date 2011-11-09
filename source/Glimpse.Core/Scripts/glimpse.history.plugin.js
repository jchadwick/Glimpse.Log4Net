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
            
            retreieveSummary(); 
        },
        deactive = function () {
            isActive = false; 
            glimpse.elements.options.html('');
            notice = null;
        }, 
        
        retreieveSummary = function () { 
            if (!isActive) { return; }

            //Poll for updated summary data
            notice.prePoll(); 
            $.ajax({
                url: glimpsePath + 'History', 
                type: 'GET',
                contentType: 'application/json',
                complete : function(jqXHR, textStatus) {
                    if (!isActive) { return; } 
                    notice.complete(textStatus); 
                    setTimeout(retreieveSummary, 1000);
                },
                success: function (result) {
                    if (!isActive) { return; } 
                    //if (resultCount != result.length)
                        processSummary(result);
                    //resultCount = result.length; 
                }
            });
        },
        processSummary = function (result) { 
            var panel = glimpse.elements.findPanel('History'),
                summary = panel.find('.glimpse-col-side'),
                main = panel.find('.glimpse-col-main');
            
            //Insert container table
            if (panel.find('table').length == 0) {
                var summaryData = [['Client', 'Count', 'View']],
                    mainData = [['Request URL', 'Method', 'Duration', 'Date/Time', 'Is Ajax', 'View']],
                    mainMetadata = [[ { data : 0, key : true, width : '30%' }, { data : 1 }, { data : 2, width : '10%' }, { data : 3, width : '20%' }, { data : 4, width : '10%' }, { data : 5, width : '100px' } ]];
                
                main.html(glimpse.render.build(mainData, mainMetadata)).find('table').append('<tbody></tbody>');
                main.find('thead').append('<tr class="glimpse-head-message" style="display:none"><td colspan="6"><a href="#">Reset context back to starting page</a></td></tr>');
                
                summary.html(glimpse.render.build(summaryData)).find('table').append('<tbody></tbody>');
            }
            
            //Prepend results as we go  
            for (var recordName in result) {
                var summaryBody = summary.find('tbody'),
                    summaryRow = summaryBody.find('a[data-clientName="' + recordName + '"]').parents('tr:first');

                if (summaryRow.length == 0)
                    summaryRow = $('<tr class="' + (summaryBody.find('tr').length % 2 == 0 ? 'even' : 'odd') + '" data><td>' + recordName + '</td><td class="glimpse-history-count">1</td><td><a href="#" class="glimpse-Client-link" data-clientName="' + recordName + '">Inspect</a></td></tr>').prependTo(summaryBody);
                summaryRow.find('.glimpse-history-count').text(glimpse.util.lengthJson(result[recordName]));
            } 
            
            currentData = result;
        },
        
        selectedSession = function (item) {
            var panel = glimpse.elements.findPanel('History'),
                clientName = item.attr('data-clientName'),
                clientData = currentData[clientName];
            
            panel.find('.selected').removeClass('selected'); 
            item.parents('tr:first').addClass('selected');
            
            processSession(clientData);
        },
        processSession = function (clientData) {
            console.log(clientData);
        },
        
        selected = function (item) {
            var requestId = item.attr('data-glimpseId');

            item.hide().parent().append('<div class="loading glimpse-History-loading" data-glimpseId="' + requestId + '"><div class="icon"></div>Loading...</div>');

            request(requestId);
        },
        request = function (requestId) { 
            glimpse.data.retrieve(requestId, {
                success : function () {
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
        /*
        clear = function () {
            glimpse.elements.findPanel('History').html('<div class="glimpse-panel-message">No requests currently detected...</div>'); 
        },
        
        reset = function () {
            var panel = glimpse.elements.findPanel('History');
            panel.find('.glimpse-head-message').fadeOut();
            panel.find('.selected').removeClass('selected');
             
            glimpse.data.update(currentData);
        },
        */

        //Main 
        init = function () {
            wireListener(); 
        };

    init();
}($Glimpse, glimpse));