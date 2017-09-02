'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARD_COUNT = 4;
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var userDialog = document.querySelector('.setup');
  var userDialogOpen = document.querySelector('.setup-open');
  var userDialogClose = userDialog.querySelector('.setup-close');
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var userNameInput = userDialog.querySelector('.setup-user-name');
  var setupWizard = document.querySelector('.setup-wizard');
  var setupFireball = document.querySelector('.setup-fireball');

  userNameInput.addEventListener('invalid', function () {
    if (!userNameInput.validity.valid) {
      if (userNameInput.validity.tooShort) {
        userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
      } else if (userNameInput.validity.tooLong) {
        userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
      } else if (userNameInput.validity.valueMissing) {
        userNameInput.setCustomValidity('Обязательное поле');
      }
    } else {
      userNameInput.setCustomValidity('');
    }
  });

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  var openPopup = function () {
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  setupWizard.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('wizard-coat')) {
      var coat = evt.target;
      coat.style.fill = getCoatColor();
    }
    if (evt.target.classList.contains('wizard-eyes')) {
      var eyes = evt.target;
      eyes.style.fill = getEyesColor();
    }
  });

  setupFireball.addEventListener('click', function (evt) {
    var fireball = evt.target.parentNode;
    fireball.style.backgroundColor = getFireballColor();
  });

  userDialogOpen.addEventListener('click', function () {
    openPopup();
  });

  userDialogOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });

  userDialogClose.addEventListener('click', function () {
    closePopup();
  });

  userDialogClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });

  var wizards = [];

  for (var i = 0; i < WIZARD_COUNT; i++) {
    wizards[i] = new Wizard(getName(), getCoatColor(), getEyesColor());
  }

  var fragment = document.createDocumentFragment();

  function Wizard(myname, color, eye) {
    this.name = myname;
    this.coatColor = color;
    this.eyesColor = eye;
  }

  function getRandom(max, min) {
    if (typeof min === 'undefined') {
      min = 0;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getName() {
    return WIZARD_NAMES[getRandom(WIZARD_NAMES.length - 1)] + ' ' + WIZARD_SURNAMES[getRandom(WIZARD_SURNAMES.length - 1)];
  }

  function getCoatColor() {
    return WIZARD_COLORS[getRandom(WIZARD_COLORS.length - 1)];
  }

  function getEyesColor() {
    return WIZARD_EYES[getRandom(WIZARD_EYES.length - 1)];
  }

  function getFireballColor() {
    return FIREBALL_COLOR[getRandom(FIREBALL_COLOR.length - 1)];
  }

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  wizards.forEach(function (item) {
    fragment.appendChild(renderWizard(item));
  });

  similarListElement.appendChild(fragment);
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
})();
