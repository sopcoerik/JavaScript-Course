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

// navigator.geolocation.getCurrentPosition(
//   function (pos) {
//     const { latitude, longitude } = pos.coords;
//     const coords = [latitude, longitude];

//     const map = L.map('map').setView(coords, 13);

//     L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution:
//         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(map);

//     map.on('click', function (e) {
//       console.log(e);
//       const { lat, lng } = e.latlng;
//       L.marker([lat, lng]).addTo(map).bindPopup('workout').openPopup();
//       form.classList.remove('hidden');
//     });
//   },
//   function () {
//     alert("We weren't able to track your location");
//   }
// );

class Workout {
  date = new Date();
  id = 0;

  constructor(distance, duration, coords) {
    this.distance = distance;
    this.duration = duration;
    this.coords = coords;
    this.id++;
  }
}

class Running extends Workout {
  type = 'running';

  constructor(distance, duration, coords, cadence) {
    super(distance, duration, coords);
    this.cadence = cadence;
    this._calcPace.bind(this);
  }

  _calcPace() {
    this.pace = this.duration / this.distance;
  }
}

class Cycling extends Workout {
  type = 'cycling';

  constructor(distance, duration, coords, elevGain) {
    super(distance, duration, coords);
    this.elevGain = elevGain;
    this._calcSpeed.bind(this);
  }

  _calcSpeed() {
    this.speed = this.distance / this.duration;
    return this.speed;
  }
}

class App {
  #map;
  #workouts = [];
  #event;

  constructor() {
    this._getPosition();
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField.bind(this));
  }

  _getPosition() {
    navigator.geolocation.getCurrentPosition(
      this._loadMap.bind(this),
      function () {
        alert('We were unable to access your location');
      }
    );
  }

  _loadMap(pos) {
    const { latitude, longitude } = pos.coords;
    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(event) {
    this.#event = event;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _renderWorkoutToList() {
    let html = `<li class="workout workout--${workout.type}" data-id="${
      workout.id
    }">
    <h2 class="workout__title">Running on ${workout.date}</h2>
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
      html += `<div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${workout.pace}</span>
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
      html += `<div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${workout.speed}</span>
      <span class="workout__unit">km/h</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⛰</span>
      <span class="workout__value">${workout.elevGain}</span>
      <span class="workout__unit">m</span>
    </div>
  </li>`;
    }
  }

  _renderWorkoutToMap() {
    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          maxHeight: 100,
          autoClose: false,
          closeOnClick: false,
        })
      )
      .openPopup();
  }

  _newWorkout(event) {
    event.preventDefault();

    const type = inputType.value;
    const distance = inputDistance.value;
    const duration = inputDuration.value;
    let workout;

    const isAllDataNumber = (...inputs) =>
      inputs.every(input => Number.isFinite(input));

    const isAllNumberPositive = (...inputs) => inputs.every(input => input > 0);

    if (type === 'running') {
      const cadence = inputCadence.value;
      if (
        isAllDataNumber(distance, duration, cadence) &&
        isAllNumberPositive(distance, duration, cadence)
      )
        workout = new Running(distance, duration, [lat, lng], cadence);
      this.#workouts.push(workout);
      this._renderWorkoutToList.bind(this);
      this._renderWorkoutToMap.bind(this);
    }

    if (type === 'cycling') {
      const elevGain = inputElevation.value;
      if (
        isAllDataNumber(distance, duration, elevGain) &&
        isAllNumberPositive(distance, duration, elevGain)
      )
        workout = new Running(distance, duration, [lat, lng], elevGain);
      this.#workouts.push(workout);
      this._renderWorkoutToList.bind(this);
      this._renderWorkoutToMap.bind(this);
    }
  }
}

const app = new App();
