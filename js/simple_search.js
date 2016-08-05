$( document ).ready(function() {

  var client = new $.es.Client({
    hosts: 'localhost:9200'
  });

  // Simple search form
  $('#simpleSearchForm')
  .on('submit', function(e) {
    e.preventDefault();

    var form = e.target;
    var q = form.elements.q.value || '*';

    return client.search({ q })
    .then(showSearchResults);
  });

});
