const fs = require('fs');
const es = require('elasticsearch');

const RECIPE_FILES_DIR = `${__dirname}/recipes`;

// Create connection to Elasticsearch
const client = new es.Client({
  hosts: 'localhost:9200'
});

// Read recipe files and index into Elasticsearch
fs.readdir(RECIPE_FILES_DIR, (err, files) => files.map(indexRecipeFromFile));

// Helper functions
function indexRecipeFromFile(filename) {
  const filepath = `${RECIPE_FILES_DIR}/${filename}`;
  const recipeId = filename.replace(/.json$/, '');
  fs.readFile(filepath, 'utf8', (err, data) => indexRecipe(recipeId, data));
}

function indexRecipe(recipeId, recipeJson) {
  console.log('recipeId: ', recipeId);
  console.log('recipeJson: ', recipeJson);

  const recipe = JSON.parse(recipeJson);
  client.index({
    index: 'recipes',
    type: 'recipe',
    id: recipeId,
    body: recipe
  });
}
