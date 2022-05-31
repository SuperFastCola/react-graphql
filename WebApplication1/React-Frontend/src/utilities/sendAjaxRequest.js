export const sendAjaxRequest = (url, method, putData, callback, token) => {
	var ajaxobj = {
        request: null,
        getData: null,
        ajaxError: null,
        callback: callback,
        headers: new Headers()
    };

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
	
 	ajaxobj.ajaxError = function(jqXHR, textStatus){
 		console.log(jqXHR);
 		console.log(textStatus);
 		var error = Object.assign({},jqXHR,textStatus);
		return error;
 	}
    
    ajaxobj.getData = async function(url) {        
        var response = await fetch(url, this.request).catch(error =>{
            //set error in store to display message
            return error;
        })
        
        if(response.ok){
            if(!this.request.headers.has("Content-Type")){
                return await response;
            }else{
                return await response.json(); // parses JSON response into native JavaScript objects
            }
        }
        else{
            return await response;
        }

    }

    ajaxobj.processData = function(data){
        if(typeof this.callback != "undefined"){
            this.callback.call(null,data);
        }
    }

    //bind with ajaxObj
    ajaxobj.ajaxError = ajaxobj.ajaxError.bind(ajaxobj);
    ajaxobj.getData = ajaxobj.getData.bind(ajaxobj);
    ajaxobj.processData = ajaxobj.processData.bind(ajaxobj);
    
    switch(method){
        case 'PUT':
            ajaxobj.request.method = 'PUT';
            ajaxobj.headers.append( 'Content-Type','application/json');
            ajaxobj.getData(url).then(ajaxobj.processData);
        break;
        case 'POST':
            ajaxobj.request.method = 'POST';
            ajaxobj.getData(url).then(ajaxobj.processData);
        break;
        default:
            ajaxobj.headers.append( 'Content-Type','application/json');
            ajaxobj.getData(url).then(ajaxobj.processData);
        break;
            
    }

	return ajaxobj;
};