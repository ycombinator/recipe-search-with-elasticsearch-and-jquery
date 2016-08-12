const fs = require('fs');
const es = require('elasticsearch');

const RECIPES_INDEX_NAME = 'recipes';
const RECIPE_FILES_DIR = `${__dirname}/recipes`;

// Create connection to Elasticsearch
const client = new es.Client({
  hosts: 'localhost:9200'
});

deleteIndex()
.then(createIndex)
.then(readRecipes)
.then(indexRecipes)
.catch(console.error);

function deleteIndex() {
  return client.indices.delete({
    index: RECIPES_INDEX_NAME
  });
}

function createIndex() {
  // Create index with English analyzer as default
  return client.indices.create({
    index: RECIPES_INDEX_NAME,
    body: {
      index: {
        analysis: {
          analyzer: {
            default: {
              type: 'english'
            }
          }
        }
      }
    }
  });
}

// Read recipe files and index into Elasticsearch
function readRecipes() {
  return new Promise(function(resolve, reject) {
    fs.readdir(RECIPE_FILES_DIR, function(err, files) {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}

function indexRecipes(files) {
  return files.map(indexRecipeFromFile);
}

function indexRecipeFromFile(filename) {
  const filepath = `${RECIPE_FILES_DIR}/${filename}`;
  const recipeId = filename.replace(/.json$/, '');
  fs.readFile(filepath, 'utf8', (err, data) => indexRecipe(recipeId, data));
}

function indexRecipe(recipeId, recipeJson) {

  const recipe = JSON.parse(recipeJson);
  return client.index({
    index: RECIPES_INDEX_NAME,
    type: 'recipe',
    id: recipeId,
    body: recipe
  });
}
