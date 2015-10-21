$(function() {
  console.log('hello');
  $.get( "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=Ballard,_Seattle&format=json&exintro=1", function( data ) {
    $( "#wiki" ).append( "extract: " + data );
  }, "json" );
});
