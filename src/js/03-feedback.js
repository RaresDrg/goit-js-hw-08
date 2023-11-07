import throttle from 'lodash.throttle';

const emailInput = document.querySelector('[name="email"]');
const messageInput = document.querySelector('[name="message"]');
const formEl = document.querySelector('.feedback-form');


// Input Event //
formEl.addEventListener(
  'input',
  throttle(() => {
    const dataObj = {
      email: emailInput.value,
      message: messageInput.value,
    };

    localStorage.setItem('feedback-form-state', JSON.stringify(dataObj));
  }, 500)
);


// Reload page event //
window.addEventListener('DOMContentLoaded', () => {
  const dataSaved = receiveDataFromLocal();
  if (dataSaved) {
    emailInput.value = dataSaved.email;
    messageInput.value = dataSaved.message;
  }
});

// Receive data function //
function receiveDataFromLocal() {
  const dataReceivedJSON = localStorage.getItem('feedback-form-state');
  const dataReceivedObj = JSON.parse(dataReceivedJSON);
  return dataReceivedObj;
}


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
  console.log(receiveDataFromLocal());
  localStorage.removeItem('feedback-form-state');
  formEl.reset();
});