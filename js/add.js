$( document ).ready(function() {

  var client = new $.es.Client({
    hosts: 'localhost:9200'
  });

  // Add recipe form
  $('#addForm')
  .on('submit', function(e) {
    e.preventDefault();

    var form = e.target;

    return client.index({
      index: 'recipes',
      type: 'recipe',
      body: {
        title: form.elements.title.value,
        prep_time_min: parseInt(form.elements.prep_time_min.value),
        cook_time_min: parseInt(form.elements.cook_time_min.value),
        servings: parseInt(form.elements.servings.value),
        description: form.elements.description.value,
        ingredients: toValuesArray(form.elements.ingredient),
        directions: toValuesArray(form.elements.direction),
        tags: normalizeTags(form.elements.tags.value)
      }
    })
    .then(function() {
      window.location.href = '/';
    });
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
