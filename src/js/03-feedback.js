const emailInput = document.querySelector('[name="email"]');
const messageInput = document.querySelector('[name="message"]');

const serializedData = {
  data: {
    email: '',
    message: '',
  },

  sentDataLocal() {
    dataForSentJSON = JSON.stringify(this.data);
    localStorage.setItem('feedback-form-state', dataForSentJSON);
  },

  receiveDataLocal() {
    dataReceivedJSON = localStorage.getItem('feedback-form-state');
    // dataReceivedObj = JSON.parse(dataReceivedJSON);
    try {
      dataReceivedObj = JSON.parse(dataReceivedJSON);
    } catch (error) {
      console.log(error);
    }

    // console.log(dataReceivedObj);
    return dataReceivedObj;
  },
};

// Input Events //

emailInput.addEventListener('input', ({ target }) => {
  serializedData.data.email = target.value;
  serializedData.sentDataLocal();
});

messageInput.addEventListener('input', ({ target }) => {
  serializedData.data.message = target.value;
  serializedData.sentDataLocal();
});

// Page reload event //

window.addEventListener('DOMContentLoaded', fillInputFields);

function fillInputFields() {
  const dataSaved = serializedData.receiveDataLocal();

  if (dataSaved.email) {
    emailInput.value = dataSaved.email;
  }

  if (dataSaved.message) {
    messageInput.value = dataSaved.message;
  }
}
