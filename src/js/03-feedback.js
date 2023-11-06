import throttle from 'lodash.throttle';

const emailInput = document.querySelector('[name="email"]');
const messageInput = document.querySelector('[name="message"]');
const formEl = document.querySelector('.feedback-form');


// Serialized Data obj //
const serializedData = {
  data: {
    email: emailInput.value,
    message: messageInput.value,
  },

  sendDataLocal() {
    const dataForSentJSON = JSON.stringify(this.data);
    localStorage.setItem('feedback-form-state', dataForSentJSON);
  },

  receiveDataLocal() {
    const dataReceivedJSON = localStorage.getItem('feedback-form-state');
    const dataReceivedObj = JSON.parse(dataReceivedJSON);
    return dataReceivedObj;
  },
};


// Input Events //
formEl.addEventListener(
  'input',
  throttle(({ target }) => {
    if (target === emailInput) {
      serializedData.data.email = target.value;
      serializedData.sendDataLocal();
      return;
    }
    if (target === messageInput) {
      serializedData.data.message = target.value;
      serializedData.sendDataLocal();
      return;
    }
  }, 500)
);


// Reload page event //
window.addEventListener('DOMContentLoaded', () => {
  const dataSaved = serializedData.receiveDataLocal();
  if (dataSaved) {
    emailInput.value = dataSaved.email;
    messageInput.value = dataSaved.message;
  }
});


// Submit Event //
formEl.addEventListener('submit', event => {
  event.preventDefault();

  if (!emailInput.value) {
    alert('Completati campul email');
    return;
  }
  if (!messageInput.value) {
    alert('Completati campul message');
    return;
  }

  alert('Formularul a fost trimis');
  console.log(serializedData.receiveDataLocal());
  localStorage.removeItem('feedback-form-state');
  formEl.reset();
});