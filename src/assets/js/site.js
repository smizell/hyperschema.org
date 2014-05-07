$(document).ready(function() {
  $('[data-toggle]').click(function() {
    var target = $(this).data('target');
    $(target).toggle(200);
  });
})