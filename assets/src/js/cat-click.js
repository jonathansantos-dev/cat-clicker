$('.cat-image-1').click(function() {
  var counter = $('#clicks-cat1').text();
  counter = parseInt(counter);
  counter += 1;
  $('#clicks-cat1').text(counter);
});

$('.cat-image-2').click(function() {
  var counter = $('#clicks-cat2').text();
  counter = parseInt(counter);
  counter += 1;
  $('#clicks-cat2').text(counter);
});

