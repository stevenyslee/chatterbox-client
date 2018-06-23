

var app = {
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages'
};

app.init = function() {
};

app.send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: app.server,
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
};


// List of HTML entities for escaping.
var htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;'
};

// Regex containing the keys listed immediately above.
var htmlEscaper = /[&<>"'\/]/g;

// Escape a string for HTML interpolation.
_.escape = function(string) {
  return ('' + string).replace(htmlEscaper, function(match) {
    return htmlEscapes[match];
  });
};

app.fetch = function() {
  $.ajax({
    url: app.server,
    type: 'GET',
    data: {order: '-createdAt'},
    contentType: 'application/json',
    success: function(data) {
      for(var i = 0; i<data.results.length;i++){
        app.renderMessage(data.results[i]);
      }
    }
  });
};

app.clearMessages = function() {
  $('#chats').empty();
};

app.renderMessage = function(message) {
  var tweet = $('<div></div>');
  tweet.append('<span class=message>' + _.escape(message.text) + '</span>');
  tweet.append('<span class=username> - ' + message.username + '</span>');
  tweet.addClass(message.roomname);
  $('#chats').prepend(tweet);
};

app.renderRoom = function(message) {
  $('.dropdown-content').prepend('<a href="#">' + message.roomname + '</a>');
};


//Begin document functions
$(document).ready(function() {
  let $body = $('body');
  
  $('.clearMessages').on('click', function() {
    app.clearMessages();
  });
  
  // need to update roomlist to show all rooms from messages
  // need to click room and show only messages from that chatroom
  $('.add-room').on('click', function() {
    var room = {};
    var roomname = prompt("Please enter room name");
    room.roomname = roomname;
    if (room[roomname] !== null) {
      app.renderRoom(room);
    }
  });

  //fix friendslist
  //elements are being added after this event handler is added
  $('.username').on('click', function() {
    console.log(true);
  });
  
  //need to get username
  //need to get roomname
  var generateUserMessage = function(){
    var text = $('.userInput').value;
    var obj = {};
    obj.message = text;
    console.log(text);
    app.renderMessage(obj);
  }

  var generateMessages = function() {
    app.fetch(function(output) {
    });
  }; 
  
    
  // var message = {
  //   username: 'Ricardo & Steven',
  //   text: 'HR',
  //   roomname: 'hr'
  // };

  // app.send(message);
  generateMessages();    

});
