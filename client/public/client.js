//var remote = require('electron').remote;
//var Menu = remote.Menu;
//var MenuItem = remote.MenuItem;
var $ = global.jQuery;

$(document).ready(function() {
  
  // Initial setup
  loadClientList();
  
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
});

function loadClientList() {
  var clientList = [];
  getClientList(clientList);
  for(i = 0; i < clientList.length; ++i) {
    $('ul#client-list').append('<li class="list-group-item"><a href="#user" id="user">' + clientList[i] + '</a></li>');
  }
  $('body').on('contextmenu', '#user', function() {
    console.log('Right clicked: ' + $(this).text() + '.');
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

/* For context-sensitive actions
var menu = new Menu();
menu.append(new MenuItem({ label: 'Connections', click: function() { console.log('Connections clicked.'); }}));
window.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  menu.popup(remote.getCurrentWindow());
}, false);
*/
