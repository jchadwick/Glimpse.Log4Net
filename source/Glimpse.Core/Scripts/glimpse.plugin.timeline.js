var glimpseTimelinePlugin = (function ($, glimpse) {

    /*(import:glimpse.plugin.timeline.core.js|1)*/ 
    
    var //Support  
        currentData = undefined,
        currentTimeline = undefined,
        currentHeight = glimpse.settings.height,
        wireListener = function () {    
            glimpse.pubsub.subscribe('action.data.applied', contextChanged);
            glimpse.pubsub.subscribe('action.plugin.created', function (topic, payload) { if (payload == 'Timeline') { created(); } });
            glimpse.pubsub.subscribe('action.resize', function (topic, payload) { resize(payload); });
            glimpse.pubsub.subscribe('state.build.template.modify', function(topic, payload) { modify(payload); }); 
        }, 
          
        created = function () { 
            var panel = glimpse.elements.findPanel('Timeline'),
                payload = glimpse.data.current().data;
            
            currentTimeline = glimpseTimeline(panel, currentData);
            currentTimeline.init();
            currentTimeline.support.containerResize(currentHeight - 54);

            payload.Timeline.data = currentData;
        },
        resize = function (payload) {
            currentHeight = payload;
            
            if (currentTimeline)
                currentTimeline.support.containerResize(currentHeight - 54);
        }, 
        contextChanged = function () {
            var payload = glimpse.data.current().data;

            if (payload.Timeline) {
                currentData = payload.Timeline.data;
                if (currentData)
                    payload.Timeline.data = 'Generating timeline, please wait...';
            }
        },
        modify = function (template) {
            template.css += '/*(import:glimpse.plugin.timeline.shell.css)*/';
        },

        //Main 
        init = function () {
            wireListener(); 
        };

    init();
}($Glimpse, glimpse));
