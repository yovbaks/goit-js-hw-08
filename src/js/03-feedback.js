import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  input: document.querySelector('.feedback-form input'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

let feedbackFormData = {};
populateStorage();

function onFormSubmit(event) {
  event.preventDefault();

  if (refs.form.email.value && refs.form.message.value) {
    console.log(feedbackFormData);
    feedbackFormData = {};
    event.target.reset();
    localStorage.removeItem(STORAGE_KEY);
  }
}

function onFormInput(event) {
  const name = event.target.name;
  const message = event.target.value;

  if (feedbackFormData) {
    feedbackFormData[name] = message;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackFormData));
  }
}

function populateStorage() {
    
  if (localStorage.getItem(STORAGE_KEY)) {
    const savedData = localStorage.getItem(STORAGE_KEY);
    feedbackFormData = JSON.parse(savedData);
  }
  if (feedbackFormData.email) {
    refs.input.value = feedbackFormData.email;
  }
  if (feedbackFormData.message) {
    refs.textarea.value = feedbackFormData.message;
  }
}
