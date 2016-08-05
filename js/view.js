$( document ).ready(function() {

  var client = new $.es.Client({
    hosts: 'localhost:9200'
  });

  return client.get({
    index: 'recipes',
    type: 'recipe',
    id: window.location.hash.substring(1)
  })
  .then(function(result) {
    var recipe = result._source;
    $('#title').text(recipe.title);
    $('#description').text(recipe.description);

    var quantities = [];
    if (recipe.prep_time_min) {
      quantities.push('Preparation time: ' + recipe.prep_time_min + ' minutes');
    }

    if (recipe.cook_time_min) {
      quantities.push('Cooking time: ' + recipe.cook_time_min + ' minutes');
    }

    if (recipe.servings) {
      quantities.push('Servings: ' + recipe.servings);
    }
    $('#quantities').text(quantities.join(' | '));

    recipe.ingredients.forEach(function(ingredient) {
      $('#ingredients')
      .append($('<li>').text(ingredient));
    });

    recipe.directions.forEach(function(direction) {
      $('#directions')
      .append($('<li>').text(direction));
    });

    if (recipe.tags && recipe.tags.length > 0) {
      $('#tags').text('Tagged with: ' + recipe.tags.join(', '));
    }

  });

});

// Helper functions
function toValuesArray(elements) {
  return Array.from(elements)
  .filter(function(element) {
    return !!element.value;
  })
  .map(function(element) {
    return element.value;
  });
}

function normalizeTags(tagsStr) {
  return tagsStr.split(',')
  .map(function(tag) {
    return tag.trim();
  })
  .filter(function(tag) {
    return !!tag;
  });
}
