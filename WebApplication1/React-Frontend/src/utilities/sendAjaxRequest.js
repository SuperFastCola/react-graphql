export const sendAjaxRequest = (url, method, callback, token) => {
	var ajaxobj = {
        request: null,
        getData: null,
        ajaxError: null,
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
        headers: ajaxobj.headers,
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer'
    };
	
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

    //bind with ajaxObj
    ajaxobj.ajaxError = ajaxobj.ajaxError.bind(ajaxobj);
    ajaxobj.getData = ajaxobj.getData.bind(ajaxobj);
    
    switch(method){
        default:
            ajaxobj.getData(url).then(data => {
                callback.call(null,data); // JSON data parsed by `data.json()` call
            });
        break;
            
    }

	return ajaxobj;
};