export const sendAjaxRequest = (url, callback, token) => {
	var ajaxobj = {
        request: null,
        getData: null,
        ajaxError: null
    };
	
 	ajaxobj.ajaxError = function(jqXHR, textStatus){
 		console.log(jqXHR);
 		console.log(textStatus);
 		var error = Object.assign({},jqXHR,textStatus);
		return error;
 	}

    ajaxobj.ajaxError = ajaxobj.ajaxError.bind(this);

    ajaxobj.getData = async (url) => {

        const headers = new Headers();
        headers.append( 'Content-Type','application/json');

        if(typeof token != undefined){
            const bearer = `Bearer ${token}`;
            headers.append("Authorization", bearer);
        }
        
        var response = null;
        try{
            response = fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: headers,
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', 
        });
        }
        catch(e){
            console.log(e);
        }

        return (await response).json(); // parses JSON response into native JavaScript objects
    }
  
    ajaxobj.getData(url).then(data => {
      callback.call(null,data); // JSON data parsed by `data.json()` call
    });

	return ajaxobj;
};