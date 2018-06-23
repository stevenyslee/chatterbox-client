

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
  var username = _.escape(message.username).replace(/\s/g, '')
  tweet.append('<span class=message>' + _.escape(message.text) + '</span>');
  tweet.append('<span class=username> - ' + message.username + '</span>');
  tweet.addClass(message.roomname); 
  tweet.addClass(username);  
  $('#chats').prepend(tweet);
  
  
  $('.username').click(function() {
    //fix friendslist
    var classes = $(this).parent().attr('class').split(' ');
    console.log(classes);
    console.log(classes[1]);
    $('.' + classes[1]).toggleClass('friendsList');
  });
  
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

  $('#myform').submit(function(event){
      generateUserMessage();
      event.preventDefault();
  });
  
  // document.getElementById('myForm').addEventListener("Submit", testfunc());
  
  var testfunc = function(){
    console.log('test');
  }
  //need to get username
  //need to get roomname
  var generateUserMessage = function(){
    var windowData = window.location.search;
    var user = windowData.substring(windowData.indexOf('username=') + 9, windowData.length);
    var text = document.getElementById('userInput').value;
    var obj = {};
    obj.text = text;
    obj.username = user;
    obj.roomname = 'lobby';
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
