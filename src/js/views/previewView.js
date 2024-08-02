import view from './view.js';
import icons from 'url:../../img/icons.svg';

class previewView extends view {
  _parentElement = ' ';

  _generateMarkupPreview() {
    const id = window.location.hash.slice(1);

    return `<li class="preview">
    <a class="preview__link ${
      this_data.id === id ? 'preview__link--active' : ''
    }" href="#${this_data.id}">
      <figure class="preview__fig">
        <img src="${this_data.image}" alt="${this_data.title}" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${this_data.title}</h4>
        <p class="preview__publisher">${this_data.publisher}</p>
        <div class="preview__user-generated">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
      </div>
    </a>
  </li>
`;
  }
}

export default new PreviweView();
