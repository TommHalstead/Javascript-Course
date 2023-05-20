import View from './View';
import icons from 'url:../../img/icons.svg';
import * as model from '../model.js';
import { RES_PER_PAGE } from '../config';
import { mark } from 'regenerator-runtime';

class AddRecipeView extends View {
  _parentElement = document.querySelector(`.upload`);
  _windowEl = document.querySelector(`.add-recipe-window`);
  _overlay = document.querySelector(`.overlay`);
  _btnOpen = document.querySelector(`.nav__btn--add-recipe`);
  _btnClose = document.querySelector(`.btn--close-modal`);

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  // TOGGLE HIDDEN CLASS ON OVERLAY AND WINDOW ELEMENT
  toggleWindow() {
    this._overlay.classList.toggle(`hidden`);
    this._windowEl.classList.toggle(`hidden`);
  }
  // OPEN THE FORM DATA WINDOW FOR MAKING YOUR OWN RECIPE
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener(`click`, this.toggleWindow.bind(this));
  }
  // HIDE THE FORM DATA WINDOW FOR MAKING YOUR OWN RECIPE
  _addHandlerHideWindow() {
    this._btnClose.addEventListener(`click`, this.toggleWindow.bind(this));
    this._overlay.addEventListener(`click`, this.toggleWindow.bind(this));
  }
  // PUBSUB HANDLER FUNCTION FOR UPLOADING OUR CUSTOM RECIPE TO OUR DATA
  addHandlerUpload(handler) {
    this._parentElement.addEventListener(`submit`, e => {
      e.preventDefault();
      const dataArray = [...new FormData(this._parentElement)];
      const data = Object.fromEntries(dataArray); // The fromEntries method takes an array of key/value pairs and converts it to an object
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();