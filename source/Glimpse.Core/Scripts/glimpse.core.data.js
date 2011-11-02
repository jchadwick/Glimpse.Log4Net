data = (function () {
    var //Support
        inner = {},
        stack = [],
    
        //Main 
        update = function (data, stackInfo) {
            inner = data; 

            if (!stackInfo) 
                stack.push(stackInfo);

            pubsub.publish('action.data.update');
        },
        retrieve = function(requestId, callback, stackInfo) { 
            if (callback.start)
                callback.start(requestId);

            $.ajax({
                url : glimpsePath + 'History',
                type : 'GET',
                data : { 'ClientRequestID': requestId },
                contentType : 'application/json',
                success : function (data, textStatus, jqXHR) {   
                    if (callback.success) 
                        callback.success(requestId, data, current, textStatus, jqXHR);  
                    update(data, stackInfo); 
                }, 
                complete : function (jqXHR, textStatus) {
                    if (callback.complete) 
                        callback.complete(requestId, jqXHR, textStatus); 
                }
            });
        },

        current = function () {
            return inner;
        },
        currentMetadata = function () {
            return inner.data._metadata;
        },

        init = function () {
            inner = glimpseData; 
        };
        
    init(); 
    
    return {
        stack : stack,
        current : current,
        currentMetadata : currentMetadata,
        update : update,
        retrieve : retrieve
    };
}())