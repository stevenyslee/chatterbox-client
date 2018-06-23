

	var app = {
		server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages'
	};

	var test;
	
	app.init = function(){
		
	}

	app.send = function(message){
		$.ajax({
			// This is the url you should use to communicate with the parse API server.
			url: app.server,
			type: 'POST',
			data: JSON.stringify(message),
			contentType: 'application/json',
			success: function (data) {
				console.log('chatterbox: Message sent');
				//location.reload();
			},
			error: function (data) {
				// See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
				console.error('chatterbox: Failed to send message', data);
			}
		});
	}

	app.fetch = function(handleData){
		$.ajax({
			url: app.server,
			type: 'GET',
			contentType: 'application/json',
		  success: function(data) {
		  	console.log(data);
		  }
		});

	}

	app.clearMessages = function(){
		$('#chats').empty();
	}

	app.renderMessage = function(message){
		$('#chats').prepend("<p>" + message.text + "</p>");
	}

	app.renderRoom = function(message){
		$('#roomSelect').prepend("<p>" + message.roomname + "</p>");
	}
$(document).ready(function() {

		
	let $body = $("body");

	var generateMessages = function() {
		
	 	app.fetch(function(output){
	 		console.log(output);
	 	});
	 	//return messages;
 }	
		
	var message = {
	  username: 'Ricardo & Steven',
	  text: 'HR',
	  roomname: 'hr'
	};

	app.send(message);
	
	generateMessages();
	
	console.log(test);
	
	

});

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
