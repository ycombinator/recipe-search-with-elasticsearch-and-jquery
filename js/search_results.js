/**
 * Renders search results from response returned by Elasticsearch's search API
 *
 * @param response search response returned by API
 * @return
 */
function showSearchResults(response) {
  var hits = response.hits.hits;

  var resultsTable = $('#results');
  resultsTable.html('<thead> \
      <th>Title</th> \
      <th>Description</th> \
    	<th>Preparation time (minutes)</th> \
      <th>Cooking time (minutes)</th> \
    </thead> \
  ');

  hits.forEach(function(hit) {
    recipe = hit._source;
    recipe.id = hit._id;

    var titleLink = $('<a>')
    .attr('href', '/view.html#' + recipe.id)
    .text(recipe.title);

    var resultRow = $('<tr>')
    .append($('<td>').html(titleLink))
    .append($('<td>').text(recipe.description))
    .append($('<td>').text(recipe.prep_time_min))
    .append($('<td>').text(recipe.cook_time_min));

    resultsTable.append(resultRow);
  });

  resultsTable.show();
}
