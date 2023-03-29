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
const zoomLevel = 13;

// DELETE RELATED ELEMENTS
const deleteButton = document.getElementsByClassName('btn--delete');
const deleteMessage = document.querySelector('.del--message--container');
const btnYes = document.querySelector('.yes');
const btnNo = document.querySelector('.no');
const overlay = document.querySelector('.overlay');
const activityType = document.querySelector('.activity');
const activityDate = document.querySelector('.activity-date');
let idOfClicked;
let marker;
const markerContainer = [];

//---------------------------------

class Workout {
  constructor(distance, duration, coords, date, id) {
    this.distance = distance;
    this.duration = duration;
    this.coords = coords;
    this.id = id;
    this.date = typeof date === 'string' ? new Date(date) : date;
    this._calcSpeed();
    this._calcPace();
  }

  _calcSpeed() {
    this.speed = this.distance / this.duration;
    return this.speed;
  }

  _calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Running extends Workout {
  type = 'running';

  constructor(distance, duration, coords, cadence, date, id) {
    super(distance, duration, coords, date, id);
    this.cadence = cadence;
  }
}

class Cycling extends Workout {
  type = 'cycling';

  constructor(distance, duration, coords, elevGain, date, id) {
    super(distance, duration, coords, date, id);
    this.elevGain = elevGain;
  }
}

class App {
  #map;
  #workouts = [];
  #event;

  constructor() {
    this._initMap();
    this._goToCurrentLocation();
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._goToLocation.bind(this));
    this._getWorkoutsFromStorage();
    for (const btn of deleteButton) {
      btn.addEventListener('click', this._deleteMessage.bind(this));
    }
    btnYes.addEventListener('click', this._deleteWorkout.bind(this));
    btnNo.addEventListener('click', this._toggleMessage);
    console.log(markerContainer);
    console.log(this.#workouts);
    // 2 listeners. this is the first
    // only toggle delete message here on no btn click
  }

  //TODO: refactor. Separate toggleDeleteMessage logic with classlist toggle, from the activityType.textcontent behavior. You don't want to execute that when user presses no.

  _deleteMessageInfo(e) {
    this.#workouts.forEach(workout => {
      if (e.target.dataset.id == workout.id) {
        activityType.textContent = workout.type;
        activityDate.textContent = `${
          months[workout.date.getMonth()]
        } ${workout.date.getDate()}`;
      }
    });
  }

  _toggleMessage() {
    overlay.classList.toggle('hidden');
    deleteMessage.classList.toggle('hidden');
  }

  _deleteMessage(e) {
    idOfClicked = e.target.dataset.id;
    this._deleteMessageInfo(e);
    this._toggleMessage();
  }

  _deleteWorkout() {
    const found = this.#workouts.findIndex(
      workout => workout.id == idOfClicked
    );
    console.log(found);
    this.#workouts.splice(found, 1);
    window.localStorage.setItem('workout', JSON.stringify(this.#workouts));
    this._toggleMessage();
    this.#map.removeLayer(markerContainer[found]);
    markerContainer.splice(found, 1);
    console.log(markerContainer);
    document.querySelector(`[data-id="${idOfClicked}"]`).remove();
  }

  _initMap() {
    this.#map = L.map('map').setView([0, 0], zoomLevel);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on('click', this._showForm.bind(this));
  }

  _goToCurrentLocation() {
    function navigateOnMap(pos) {
      const { latitude, longitude } = pos.coords;
      const coords = [latitude, longitude];
      const lastWorkoutCoords = this.#workouts.slice(-1).coords;
      this.#map.setView(
        lastWorkoutCoords ? lastWorkoutCoords : coords,
        zoomLevel
      );
    }

    function showError() {
      alert("We weren't able to track your location");
    }

    navigator.geolocation.getCurrentPosition(
      navigateOnMap.bind(this),
      showError
    );
  }

  // _loadMap(pos) {
  //   const { latitude, longitude } = pos.coords;
  //   const coords = [latitude, longitude];

  //   this.#map = L.map('map').setView(coords, zoomLevel);
  //   L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     attribution:
  //       '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  //   }).addTo(this.#map);

  //   this.#map.on('click', this._showForm.bind(this));
  // }

  _goToLocation(e) {
    this.#workouts.forEach(workout => {
      if (workout.id == e.target.dataset.id) {
        this.#map.setView(workout.coords, zoomLevel);
      }
    });
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

  _renderWorkoutToList(workout) {
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
      <span class="workout__value">${Math.trunc(workout.pace)}</span>
      <span class="workout__unit">min/km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">🦶🏼</span>
      <span class="workout__value">${workout.cadence}</span>
      <span class="workout__unit">spm</span>
    </div>
    <div class="btn--container"><button class="btn--delete hidden" data-id="${
      workout.id
    }"><i class="fa fa-trash" data-id="${workout.id}"></i></button></div>
  </li>`;
    }

    if (workout.type === 'cycling') {
      html += `<div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${Math.trunc(workout.speed)}</span>
      <span class="workout__unit">km/h</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⛰</span>
      <span class="workout__value">${workout.elevGain}</span>
      <span class="workout__unit">m</span>
    </div>
    <div class="btn--container""><button class="btn--delete hidden" data-id="${
      workout.id
    }><i class="fa fa-trash" data-id="${workout.id}"></i></button></div>
  </li>`;
    }

    containerWorkouts.insertAdjacentHTML('beforeend', html);
  }

  _renderWorkoutToMap(workout) {
    marker = L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 300,
          maxHeight: 100,
          autoClose: false,
          closeOnClick: false,
          className: `workout--${workout.type}`,
        })
      )
      .setPopupContent(
        `${workout.type === 'cycling' ? '🚴‍♂️ Cycling' : '🏃‍♂️ Running'} on ${
          months[workout.date.getMonth() + 1]
        }  ${workout.date.getDate()}`
      )
      .openPopup();
    markerContainer.push(marker);
  }

  _hideForm() {
    form.classList.add('hidden');
    inputCadence.value =
      inputDistance.value =
      inputDuration.value =
      inputElevation.value =
        '';
  }

  _getWorkoutsFromStorage() {
    const data = JSON.parse(localStorage.getItem('workout'));

    this.#workouts = data.map(workout =>
      workout.type === 'running'
        ? new Running(
            workout.distance,
            workout.duration,
            workout.coords,
            workout.cadence,
            workout.date,
            workout.id
          )
        : new Cycling(
            workout.distance,
            workout.duration,
            workout.coords,
            workout.elevGain,
            workout.date,
            workout.id
          )
    );
    this.#workouts.forEach(workout => {
      this._renderWorkoutToList(workout);
      this._renderWorkoutToMap(workout);
    });
  }

  // _deleteWorkout() {
  //   this._toggleDeleteMessage();
  //   this.#workouts.forEach(workout => {
  //     console.log(workout);
  //   });
  // }

  _newWorkout(e) {
    e.preventDefault();
    const { lat, lng } = this.#event.latlng;
    const coords = [lat, lng];
    const type = inputType.value;
    const distance = Number(inputDistance.value);
    const duration = Number(inputDuration.value);
    let workout;

    const isAllDataNumber = (...inputs) =>
      inputs.every(input => Number.isFinite(input));

    const isAllNumberPositive = (...inputs) => inputs.every(input => input > 0);

    if (type === 'running') {
      const cadence = Number(inputCadence.value);
      if (
        isAllDataNumber(distance, duration, cadence) &&
        isAllNumberPositive(distance, duration, cadence)
      ) {
        workout = new Running(
          distance,
          duration,
          coords,
          cadence,
          new Date(),
          this.#workouts.slice(-1).id + 1
        );
      }
      this.#workouts.push(workout);

      // this block is not correct.
      this.#workouts.forEach((workout, key) => {
        workout.id = key;
      });
    }

    if (type === 'cycling') {
      const elevGain = Number(inputElevation.value);
      if (
        isAllDataNumber(distance, duration, elevGain) &&
        isAllNumberPositive(distance, duration, elevGain)
      ) {
        workout = new Cycling(
          distance,
          duration,
          coords,
          elevGain,
          new Date(),
          this.#workouts.slice(-1).id + 1
        );
      }
      this.#workouts.push(workout);
    }
    window.localStorage.setItem('workout', JSON.stringify(this.#workouts));

    this._renderWorkoutToMap(workout);
    this._renderWorkoutToList(workout);

    this._hideForm();
  }
}

const app = new App();
