var remote = require('electron').remote;
var Menu = remote.Menu;
var MenuItem = remote.MenuItem;
var $ = global.jQuery;

$(document).ready(function() {
  
  // Initial setup
  loadClientList();
  handleMessagePane();
  
  // Event Handlers
  $('button#status').click(function() {
    console.log('Set status.');
    $(this).blur();
  });
  $('button#mic').click(function() {
    console.log('Toggle mic.');
    $(this).blur();
  });
  $('button#speakers').click(function() {
    console.log('Toggle speakers.');
    $(this).blur();
  });
  $('button#contacts').click(function() {
    console.log('Get contacts.');
    $(this).blur();
  });
  $('.form-control#comment').on('keyup', function(e) {
    if (e.which == 13 && ! e.shiftKey) {
      getMessage('TheDude', $(this).val());
      $(this).val('');
    }
  });
});

function handleMessagePane() {
  getMessage('Jim', 'Hey, testing message well.');
  getMessage('Dwight', 'Okay, np.');
}

function getMessage(user, msg) {
  var messagePane = $('.active > .well#message-pane');
  messagePane.append('<p><strong><a href="#user" id="user">' + user + '</a>:</strong> ' + msg + '</p>');
  var paneHeight = messagePane.prop('scrollHeight');
  messagePane.scrollTop(paneHeight);
}

function messageUser(username) {
  // check if tab already exists
  var theTab = $('a[href$="#' + username + '-tab"]');
  if(theTab.length) {
    theTab.tab('show');
    return;
  }
  
  var newTab = $('.nav#message-nav-tabs');
  newTab.append('<li><a data-toggle="tab" href="#' + username + '-tab">' + username + '</a></li>');
  
  var newPane = $('.tab-content#message-nav-panes');
  newPane.append('<div class="tab-pane" id="' + username + '-tab"><div class="well well-sm" id="message-pane"></div></div>');
  
  $('.nav-tabs a[href$="#' + username + '-tab"]').tab('show');
}

function loadClientList() {
  var clientList = [];
  getClientList(clientList);
  for(i = 0; i < clientList.length; ++i) {
    $('ul#client-list').append('<li class="list-group-item"><a href="#user" id="user">' + clientList[i] + '</a></li>');
  }
  $('body').on('contextmenu', '#user', function(event) {
    var username = $(this).text();
    console.log('Right clicked: ' + username + '.');
    handleUserContextMenu(username, event);
  });
}

function getClientList(requestedList) {
  requestedList.push('Jim');
  requestedList.push('Michael');
  requestedList.push('Pam');
  requestedList.push('Dwight');
  requestedList.push('Toby');
  requestedList.push('Creed');
}

// message user, voice chat, etc
function handleUserContextMenu(username, event) {
  var menu = new Menu();
  menu.append(new MenuItem({ label: 'Send Message', click: function() { messageUser(username); console.log('Messaging ' + username + '.'); }}));
  menu.append(new MenuItem({ label: 'Call', click: function() { console.log('Calling ' + username + '.'); }}));
  menu.append(new MenuItem({ label: 'Poke', click: function() { console.log('Poking ' + username + '.'); }}));
  event.preventDefault();
  menu.popup(remote.getCurrentWindow());
}