'use strict';

(function () {
  var MAX_HASHTAGS_AMOUNT = 5;
  var MAX_HASHTAG_CHARACTERS = 20;
  var HASHTAG_PATTERN = /^([#]{1})([0-9a-zа-яё]{1,19})$/g;

  var uploadForm = window.util.uploadForm;
  var hashtagsInput = uploadForm.querySelector('.text__hashtags');

  var createHashtags = function (inputString) {
    var hashtags = inputString.split(' ');
    return hashtags;
  };

  var removeAdditionalSpaces = function (allHashtags) {
    var notEmptyHashtags = allHashtags.filter(function (item) {
      return item !== '';
    });

    return notEmptyHashtags;
  };

  var pushErrorMessage = function (message, errorMessages) {
    if (errorMessages.indexOf(message) === -1) {
      errorMessages.push(message);
    }

    return errorMessages;
  };

  var createValidityMessages = function (notEmptyHashtags) {
    var validityMessages = [];

    if (notEmptyHashtags.length > MAX_HASHTAGS_AMOUNT) {
      pushErrorMessage('Хеш-тегов не должно быть больше ' + MAX_HASHTAGS_AMOUNT + ' .', validityMessages);
    }

    notEmptyHashtags.forEach(function (item, index) {
      var hashtag = item;
      if (!hashtag.startsWith('#')) {
        pushErrorMessage('Хеш-тег должен начинаться с символа решетки (#).', validityMessages);
      } else if (hashtag.length === 1) {
        pushErrorMessage('Хеш-тег не может состоять из одного символа.', validityMessages);
      } else if (hashtag.length > MAX_HASHTAG_CHARACTERS) {
        pushErrorMessage('Хеш-тег не может состоять из более чем ' + MAX_HASHTAG_CHARACTERS + ' символов.', validityMessages);
      } else if (!hashtag.match(HASHTAG_PATTERN)) {
        pushErrorMessage('Хеш-тег должен состоять только из букв и цифр.', validityMessages);
      } else if (notEmptyHashtags.indexOf(hashtag, index + 1) !== -1) {
        pushErrorMessage('Хеш-теги не должны повторяться.', validityMessages);
      }
    });

    return validityMessages;
  };

  var hashtagsKeyupHandler = function () {
    var inputValue = hashtagsInput.value.toLowerCase();
    var dirtyHashtags = createHashtags(inputValue);
    var cleanHashtags = removeAdditionalSpaces(dirtyHashtags);
    var errors = createValidityMessages(cleanHashtags);

    if (errors.length !== 0) {
      hashtagsInput.setCustomValidity(errors.join(' \n'));
      hashtagsInput.style.border = '2px solid #e90000';
    } else {
      hashtagsInput.setCustomValidity('');
      hashtagsInput.style.border = '';
    }
  };

  hashtagsInput.addEventListener('keyup', hashtagsKeyupHandler);
})();
