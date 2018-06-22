var app = {
	
};

app.init = function(){

}

app.send = function(message){
	$.ajax({
		// This is the url you should use to communicate with the parse API server.
		url: 'http://parse.CAMPUS.hackreactor.com/chatterbox/classes/messages',
		type: 'POST',
		data: JSON.stringify(message),
		contentType: 'application/json',
		success: function (data) {
			console.log('chatterbox: Message sent');
		},
		error: function (data) {
			// See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
			console.error('chatterbox: Failed to send message', data);
		}
	});
}

app.fetch = function(){
	$.ajax({
		url: 'http://parse.CAMPUS.hackreactor.com/chatterbox/classes/messages/',
		type: 'GET',
		contentType: 'application/json',
	  data: undefined,
	  success: undefined
	});
}

// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };

// /parse/classes/<className>				POST	Creating Objects
// /parse/classes/<className>/<objectId>	GET		Retrieving Objects
// /parse/classes/<className>/<objectId>	PUT		Updating Objects
// /parse/classes/<className>				GET		Queries
// /parse/classes/<className>/<objectId>	DELETE	Deleting Objects
