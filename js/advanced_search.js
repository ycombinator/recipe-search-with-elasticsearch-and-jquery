$( document ).ready(function() {

  var client = new $.es.Client({
    hosts: 'localhost:9200'
  });

  // Advanced search form
  $('#advancedSearchForm')
  .on('submit', function(e) {
    e.preventDefault();

    var form = e.target;

    var mustClauses = Array.from(form.elements)
    .map(makeMustClauses)
    .filter(function(clause) {
      return !!clause;
    });

    var body = {
      query: {
        bool: {
          must: mustClauses
        }
      }
    };

    return client.search({
      index: 'recipes',
      body
    })
    .then(showSearchResults);
  });

});

// Helper functions
function makeMustClauses(element) {
  var fieldName = element.name;
  var value = element.value;

  if (!value) {
    return;
  }

  switch (fieldName) {
    case 'title':
    case 'description':
    case 'ingredients':
    case 'directions':
    case 'tags':
      var matchClause = { match: {}};
      matchClause.match[fieldName] = value;
      return matchClause;
    case 'servings':
      var matchClause = { match: {}};
      matchClause.match[fieldName] = parseInt(value);
      return matchClause;
    case 'prep_time_min_low':
    case 'cook_time_min_low':
      var rangeClause = { range: {}};
      rangeClause.range[fieldName.substring(0, fieldName.length-4)] = { gte: parseInt(value) };
      return rangeClause;
    case 'prep_time_min_high':
    case 'cook_time_min_high':
      var rangeClause = { range: {}};
      rangeClause.range[fieldName.substring(0, fieldName.length-5)] = { lte: parseInt(value) };
      return rangeClause;
  }
}
