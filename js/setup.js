'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_COUNT = 4;

  var userDialog = document.querySelector('.setup');
  userDialog.classList.remove('hidden');
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

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
