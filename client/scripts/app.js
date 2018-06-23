

var app = {
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages'
};

var test;

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
      //location.reload();
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
      console.log(data.results);
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
  tweet.append('<span class=username> - ' + _.escape(message.username) + '</span>');
  tweet.attr('id', message.roomname);
  tweet.addClass('username');
  $('#chats').prepend(tweet);
};

app.renderRoom = function(message) {
  $('#roomSelect').prepend('<p>' + message.roomname + '</p>');
};

$(document).ready(function() {
  let $body = $('body');
  
  $('.clearMessages').on('click', function(event) {
    app.clearMessages();
  });
  
  $('.dropbtn').on('click', function(event) {
    document.getElementById("myDropdown").classList.toggle("show");
  });
  
  //fix friendslist
  $('.username').on('click', function(event) {
    $(this).parent().addClass('friendsList');
  });
  
  $('.submitMessage').on('click', function(event) {
    //var message = document.getElementById("submitContent").value;
    var tempObj = {};
    tempObj.username = 'null';

      // console.log(window.location.search[0])
    tempObj.text = message;
    tempObj.roomname = 'null'; 
    app.renderMessage(message);
  });

  var generateMessages = function() {
    app.fetch(function(output) {
      console.log(output);
    });
  }; 
  
    
  // var message = {
  //   username: 'Ricardo & Steven',
  //   text: 'HR',
  //   roomname: 'hr'
  // };

  // app.send(message);
  generateMessages();
  console.log(test);
    
  

});

// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };

// /parse/classes/<className>       POST  Creating Objects
// /parse/classes/<className>/<objectId>  GET   Retrieving Objects
// /parse/classes/<className>/<objectId>  PUT   Updating Objects
// /parse/classes/<className>       GET   Queries
// /parse/classes/<className>/<objectId>  DELETE  Deleting Objects
