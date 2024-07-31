import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

///////////////////////////////////////
const renderSpinner = function (parentEl) {
  const markup = `
  <div class="spinner">
          <svg>
            <use href="${icons}/img/icons.svg#icon-loader"></use>
          </svg>
        </div>`;
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markup);
};

const controlRecipes = async function () {
  try {
    resultView.renderSpinner();
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 1 loading recipe
    await model.loadRecipe(id);

    // 2 Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults('pizza');

    // Render results
    // console.log(model.state.search.results);
    resultView.render(model.getSearchResultsPage(1));

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goTopage) {
  // 1) Render New results
  resultView.render(model.getSearchResultsPage(goTopage));

  // 2) Render New pagination buttons
  paginationView.render(model.state.search);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
