var $ = global.jQuery;

$(document).ready(function() {
  $('.btn-group #status').click(function() {
    console.log("Set status.");
    $(this).blur();
  });
  $('.btn-group #mic').click(function() {
    console.log("Toggle mic.");
    $(this).blur();
  });
  $('.btn-group #speakers').click(function() {
    console.log("Toggle speakers.");
    $(this).blur();
  });
  $('.btn-group #contacts').click(function() {
    console.log("Get contacts.");
    $(this).blur();
  });
});

