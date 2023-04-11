'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const workoutElements = document.getElementsByClassName('workout');

const workoutsContainer = document.querySelector('.workouts-container');

const btnYes = document.querySelector('.yes');
const btnNo = document.querySelector('.no');
let eTarget;
class Workout {
  date = new Date();
  id = (Date.now() + '').slice(5) + Math.trunc(Math.random() * 20 + 1);

  constructor(distance, duration, coords) {
    this.distance = distance;
    this.duration = duration;
    this.coords = coords;
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}

class Running extends Workout {
  type = 'running';

  constructor(distance, duration, coords, cadence) {
    super(distance, duration, coords);
    this.cadence = cadence;

    this.#calcPace();
    this._setDescription();
  }

  #calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';

  constructor(distance, duration, coords, elevation) {
    super(distance, duration, coords, elevation);
    this.elevation = elevation;

    this.#calcSpeed();
    this._setDescription();
  }

  #calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

class App {
  #map;
  #mapEvent;
  #workouts = [];
  #zoomLevel = 13;
  #markers = [];

  constructor() {
    this.#getPosition();
    inputType.addEventListener('change', this.#toggleElevationField);
    form.addEventListener('submit', this.#newWorkout.bind(this));
    form.classList.contains('hidden');
    workoutsContainer.addEventListener(
      'click',
      this.#handleWorkoutClick.bind(this)
    );
    document.addEventListener('click', this.#delete.bind(this));
    btnYes.addEventListener('click', this.#deleteWorkout.bind(this));
    btnNo.addEventListener('click', this.#overlayToggle);
  } // load page

  #handleWorkoutClick(e) {
    e.preventDefault();

    if (e.target.classList.contains('btn--delete')) return;
    const workoutElement = e.target.closest('.workout');
    const workout = this.#workouts.find(
      workout => workout.id == workoutElement.dataset.id
    );

    this.#goToWorkoutMarker(workout);
  }

  #goToWorkoutMarker(workout) {
    const arrIndex = this.#workouts.findIndex(
      workoutCur => workout === workoutCur
    );

    const foundMarker = this.#markers.find((_, index) => index === arrIndex);
    foundMarker.openPopup();

    this.#map.setView(workout.coords, this.#zoomLevel, {
      animate: true,
      pan: { duration: 1 },
    });
  }

  #getPosition() {
    navigator.geolocation.getCurrentPosition(this.#loadMap.bind(this), () => {
      alert(`Couldn't access your location`);
    });
  }

  #loadMap(position) {
    const { latitude, longitude } = position.coords;
    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#zoomLevel);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#workouts = JSON.parse(localStorage.getItem('workouts')) || [];
    this.#workouts.forEach(workout => {
      this.#renderWorkoutForm(workout);
      this.#renderWorkoutMarker(workout);
    });

    this.#map.on('click', this.#showForm.bind(this));
  } // receive position

  #addDelButton() {
    const btnDelete = document.createElement('div');
    btnDelete.classList.add('btn--delete');
    btnDelete.innerHTML = 'Delete Workout';
    Array.from(workoutElements).forEach(el => el.appendChild(btnDelete));
  }

  #showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  } // click on map

  #hideForm() {
    inputDistance.value =
      inputDuration.value =
      inputElevation.value =
      inputCadence.value =
        '';

    form.classList.add('hidden');
  }

  #toggleElevationField() {
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  } // change input

  #renderWorkoutMarker(workout) {
    const popupContent = `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♂️'}  ${
      workout.description
    }`;

    const marker = L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 50,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
          content: popupContent,
        })
      );

    this.#markers.push(marker);
  }

  #renderWorkoutForm(workout) {
    let html = `
    <li class="workout workout--${
      workout.type === 'running' ? 'running' : 'cycling'
    }" data-id="${workout.id}">
    <h2 class="workout__title">${workout.description}</h2>
    <div class="workout__details">
      <span class="workout__icon">${
        workout.type === 'running' ? '🏃‍♂️' : '🚴‍♂️'
      }</span>
      <span class="workout__value">${workout.distance}</span>
      <span class="workout__unit">km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⏱</span>
      <span class="workout__value">${workout.duration}</span>
      <span class="workout__unit">min</span>
    </div>`;

    if (workout.type === 'running') {
      html += `
      <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>`;
    }

    if (workout.type === 'cycling') {
      html += `
      <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevation}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>
        `;
    }

    workoutsContainer.insertAdjacentHTML('beforeend', html);
    this.#addDelButton();
  }

  #updateUI(workout) {
    this.#renderWorkoutForm(workout);
    this.#renderWorkoutMarker(workout);

    this.#hideForm();
  }

  #newWorkout(e) {
    e.preventDefault();

    const number = (...inputs) => inputs.every(input => Number.isFinite(input));

    const positive = (...inputs) => inputs.every(input => input > 0);

    const { lat, lng } = this.#mapEvent.latlng;
    const coordsMarker = [lat, lng];
    const duration = +inputDuration.value;
    const distance = +inputDistance.value;
    const type = inputType.value;

    let workout;

    if (type === 'running') {
      const cadence = +inputCadence.value;

      if (
        !number(duration, distance, cadence) ||
        !positive(duration, distance, cadence)
      )
        return;

      workout = new Running(distance, duration, coordsMarker, cadence);
    }

    if (type === 'cycling') {
      const elevation = +inputElevation.value;

      if (
        !number(duration, distance, elevation) ||
        !positive(duration, distance)
      )
        return;

      workout = new Cycling(distance, duration, coordsMarker, elevation);
    }
    this.#workouts.push(workout);
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
    this.#updateUI(workout);
  } // submit form

  #overlayToggle() {
    document.querySelector('.overlay').classList.toggle('hidden');
    document.querySelector('.message--content').classList.toggle('hidden');
  }

  #delete(e) {
    if (e.target.classList.contains('btn--delete')) {
      this.#overlayToggle();
      eTarget = e.target;
    }
  }

  #deleteWorkout() {
    const target = eTarget.closest('.workout');
    const workout = this.#workouts.find(
      workout => workout.id == target.dataset.id
    );
    const index = this.#workouts.findIndex(
      workoutCurr => workout === workoutCurr
    );
    this.#map.removeLayer(this.#markers[index]);
    this.#workouts.splice(index, 1);
    target.remove();
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
    this.#overlayToggle();
  }
}

const app = new App();
