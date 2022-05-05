export const sendAjaxRequest = (url, method, putData, callback, token) => {
	var ajaxobj = {
        request: null,
        getData: null,
        ajaxError: null,
        callback: callback,
        headers: new Headers()
    };

    ajaxobj.headers.append( 'Content-Type','application/json');

    if(typeof token != undefined){
        ajaxobj.headers.append("Authorization", `Bearer ${token}`);
    }

    //default request is GET
    ajaxobj.request = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: 'same-origin', // include, *same-origin, omit
        body: putData,
        headers: ajaxobj.headers,
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer'
    };

    console.log(ajaxobj.request);
	
 	ajaxobj.ajaxError = function(jqXHR, textStatus){
 		console.log(jqXHR);
 		console.log(textStatus);
 		var error = Object.assign({},jqXHR,textStatus);
		return error;
 	}
    
    ajaxobj.getData = async function(url) {        
        var response = null;
        try{
            response = fetch(url, this.request);
        }
        catch(e){
            console.log(e);
        }
        return (await response).json(); // parses JSON response into native JavaScript objects
    }

    ajaxobj.processData = function(data){
        console.log("---",this.callback,data)
        this.callback.call(null,data);
    }

    //bind with ajaxObj
    ajaxobj.ajaxError = ajaxobj.ajaxError.bind(ajaxobj);
    ajaxobj.getData = ajaxobj.getData.bind(ajaxobj);
    ajaxobj.processData = ajaxobj.processData.bind(ajaxobj);
    
    switch(method){
        case 'PUT':
            ajaxobj.request.method = 'PUT';
            ajaxobj.getData(url).then(ajaxobj.processData);
        break;
        default:
            ajaxobj.getData(url).then(ajaxobj.processData);
        break;
            
    }

	return ajaxobj;
};