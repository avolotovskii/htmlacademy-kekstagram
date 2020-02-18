'use strict';

(function () {
  var SCALE_CONTROL_DEFAULT_VALUE = '100%';
  var SCALE_IMAGE_DEFAULT_VALUE = 100;

  var uploadForm = window.util.uploadForm;
  var imageEditor = window.util.imageEditor;
  var pageBody = window.util.pageBody;

  var fileUploadButton = document.querySelector('#upload-file');
  var hashtagsInput = uploadForm.querySelector('.text__hashtags');
  var fileUploadCancel = uploadForm.querySelector('#upload-cancel');
  var descriptionInput = uploadForm.querySelector('.text__description');

  var setScaleValue = window.scale.setScaleValue;
  var setImageScale = window.scale.setImageScale;
  var removeEffect = window.filter.removeEffect;
  var hideEffectLevel = window.filter.hideEffectLevel;
  var createEffectsHandlers = window.filter.createEffectsHandlers;
  var removeEffectsHandlers = window.filter.removeEffectsHandlers;

  var uploadButtonChangeHandler = function () {
    imageEditor.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    setScaleValue(SCALE_CONTROL_DEFAULT_VALUE);
    setImageScale(SCALE_IMAGE_DEFAULT_VALUE);
    hideEffectLevel();
    removeEffect();
    createEffectsHandlers();
    fileUploadCancel.addEventListener('click', cancelButtonClickHandler);
    document.addEventListener('keydown', closeKeydownHandler);
  };

  var cancelButtonClickHandler = function () {
    imageEditor.classList.add('hidden');
    pageBody.classList.remove('modal-open');
    uploadForm.reset();
    removeEffectsHandlers();
    fileUploadCancel.removeEventListener('click', cancelButtonClickHandler);
  };

  var closeKeydownHandler = function (evt) {
    if (evt.key === window.util.ESC_KEY && hashtagsInput !== document.activeElement && descriptionInput !== document.activeElement) {
      uploadForm.reset();
      cancelButtonClickHandler();
    }
  };

  fileUploadButton.addEventListener('change', uploadButtonChangeHandler);
})();
