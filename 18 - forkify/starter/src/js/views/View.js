import icons from 'url:../../img/icons.svg'; // Parcel 2

export default class View {
  _data;

  render(recipe) {
    this._data = recipe; // Creates a recipe property and sets it to the argument that is received.
    const markup = this._generateMarkup();
    this._clear();
    this._insertHTML(markup);
  }

  _clear() {
    this._parentElement.innerHTML = ``;
  } // Here we create a helper function to clear the container for us

  _insertHTML(markup) {
    this._parentElement.insertAdjacentHTML(`afterbegin`, markup);
  }

  renderSpinner() {
    const markup = `
  <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>`;
    this._clear();
    this._insertHTML(markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this._clear();
    this._insertHTML(markup);
  }

  renderMessage(message = this._message) {
    const markup = `
   <div class="recipe">
     <div class="message">
       <div>
         <svg>
           <use href="${icons}#icon-smile"></use>
         </svg>
       </div>
       <p>${message}</p>
     </div>`;
    this._clear();
    this._insertHTML(markup);
  }
}
