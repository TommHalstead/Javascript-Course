'use strict';

class Workout {
  date = new Date(); // These are PUBLIC FIELDS OF THIS CLASS
  id = +Math.random().toString().slice(3, 10); // `Unique` ID
  clicks = 0;
  constructor(distance, duration, coords) {
    this.distance = distance; // in miles - 3
    this.duration = duration; // in mins - 21
    this.coords = coords; // [latitude, longitude]
  }
  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = `running`;
  constructor(distance, duration, coords, cadence) {
    super(distance, duration, coords);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    //min/mile
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = `cycling`;
  constructor(distance, duration, coords, elevationGain) {
    super(distance, duration, coords);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    //mph
    this.speed = this.distance / this.duration / 60;
    return this.speed;
  }
}
//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////
// APPLICATION ARCHITECTURE

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let deleteButton = document.createElement(`button`);
deleteButton.classList.add(`delete`);
deleteButton.textContent = `Delete All Workouts`;
containerWorkouts.insertAdjacentElement(`beforebegin`, deleteButton);

class App {
  #map;
  #mapEvent; // FIELDS
  #workouts = [];
  #mapZoomLevel = 15;
  constructor() {
    // Get users position
    this.#getPosition();

    // Get data from local storage
    this.#getLocalStorage();

    // Attach event Handlers
    form.addEventListener(`submit`, this.#newWorkout.bind(this));

    inputType.addEventListener(`change`, this.#toggleElevationField);

    containerWorkouts.addEventListener(
      `click`,
      this.#moveMapToMarker.bind(this)
    );

    deleteButton.addEventListener(`click`, this._deleteWorkouts);
  }

  #getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this.#loadMap.bind(this),
        function () {
          alert(
            `Could not access your location, enable location and reload the page.`
          );
        }
      ); // The getCurrentLocation() API takes two callback functions. One that is called when the browser successfully receives the geolocation of the user and takes one position param. The second callback is the error callback, which is what is called when an error occurs
  }

  #loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel); // This .setView() function takes two arguments, the first is an array of coordinates, lat, lng. The second is the zoom level of the map that you would like to be default

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling clicks on map
    this.#map.on(`click`, this.#showForm.bind(this));

    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    });
  }

  #showForm(mapE) {
    this.#mapEvent = mapE; // Right here we assign this mapE parameter to a global variable, so that we can use this variable(event) in other functions and event handlers
    form.classList.remove(`hidden`);
    inputDistance.focus();
  }

  #hideForm() {
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        ``;
    form.style.display = `none`;
    form.classList.add(`hidden`);
    setTimeout(() => (form.style.display = `grid`), 1000);
  }

  #toggleElevationField() {
    inputElevation.closest(`.form__row`).classList.toggle(`form__row--hidden`);
    inputCadence.closest(`.form__row`).classList.toggle(`form__row--hidden`);
  }

  #newWorkout(e) {
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp)); // This is form validation, what we're doing is creating an array of inputs (the rest operator) and looping over that array and returning a boolean on whether or not every input is a number and it positive.

    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    e.preventDefault();

    // Get data from input form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // If workout is running, create running object
    if (type === `running`) {
      // Check if data is valid
      const cadence = +inputCadence.value;
      if (
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert(`Inputs must be a positive number!`);

      workout = new Running(distance, duration, [lat, lng], cadence);
    }

    // If workout if cycling, createa cyclying object
    if (type === `cycling`) {
      // Check if data is valid
      const elevationGain = +inputElevation.value;

      if (
        !validInputs(distance, duration, elevationGain) ||
        !allPositive(distance, duration)
      )
        return alert(`Inputs must be a positive number!`);
      workout = new Cycling(distance, duration, [lat, lng], elevationGain);
    }

    // Add new object to workout array
    this.#workouts.push(workout);

    // Render workout on map as marker
    this._renderWorkoutMarker(workout);

    // Render workout on list
    this._renderWorkout(workout);

    //Hide form and clear input fields
    this.#hideForm();

    // Set local storage to all workouts
    this.#setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === `running` ? `🏃‍♂️` : `🚴‍♀️`} ${workout.description}`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    deleteButton.classList.remove(`hidden`);
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
      <h2 class="workout__title">${workout.description}</h2>
      <div class="workout__details">
        <span class="workout__icon">${
          workout.type === `running` ? `🏃‍♂️` : `🚴‍♀️`
        }</span>
        <span class="workout__value">${workout.distance}</span>
        <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">min</span>
      </div>`;

    if (workout.type === `running`) {
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.pace.toFixed(1)}</span>
          <span class="workout__unit">${workout.duration}/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶🏼</span>
          <span class="workout__value">${workout.cadence}</span>
          <span class="workout__unit">spm</span>
        </div>
      </li>`;
      form.insertAdjacentHTML(`afterend`, html);
    }

    if (workout.type === `cycling`) {
      html += `
       <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.speed.toFixed(1)}</span>
          <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⛰</span>
          <span class="workout__value">${workout.elevationGain}</span>
          <span class="workout__unit">m</span>
        </div>
      </li>`;

      form.insertAdjacentHTML(`afterend`, html);
    }
  }

  #moveMapToMarker(e) {
    const workoutEl = e.target.closest(`.workout`);

    if (!workoutEl) return;
    const workout = this.#workouts.find(
      work => work.id === +workoutEl.dataset.id
    );
    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: { duration: 1 },
    });

    // Using the oublic interface
    // workout.click();
  }

  #setLocalStorage() {
    localStorage.setItem(`workouts`, JSON.stringify(this.#workouts)); // We call the localStorage property and use the setItem() method. We pass in our key `workout` - this iw what these will be saved as in local storage. As the first parameter. The second parameter is our value that we want to associate with this localStorage.
  } // We use the `JSON.stringify()` in order to pass in an object and turn any object into a string, which is what this method does for us.

  #getLocalStorage() {
    const data = JSON.parse(localStorage.getItem(`workouts`));

    if (!data) return;

    this.#workouts = data;
    this.#workouts.forEach(work => {
      this._renderWorkout(work);
    });
  }
  reset() {
    localStorage.removeItem(`workouts`);
    location.reload();
  }

  _deleteWorkouts(e) {
    deleteButton.style.display = `none`;
    localStorage.removeItem(`workouts`);
    document.querySelectorAll(`.workouts`).forEach(n => n.remove());
  }
}
const app = new App();
