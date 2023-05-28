import throttle from "lodash.throttle";

const form = document.querySelector('.feedback-form');
const email = document.querySelector('[name="email"]');
const message = document.querySelector('[name="message"]');
const btn = document.querySelector('[type="submit"]');
const STORAGE_KEY = "feedback-form-state";

form.addEventListener('input', throttle(onCreateLocalStorage, 500));
fillFormFields();
btn.addEventListener('click', onCleanLocalStorage);

function onCreateLocalStorage() {
    const formData = {
    email: email.value,
    message: message.value,
}
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function fillFormFields() {
const formKey = localStorage.getItem(STORAGE_KEY);    
    if (formKey) {
        const { email: emailForm, message: messageForm } = JSON.parse(formKey);
        email.value = emailForm;
        message.value = messageForm;
    }
}

function onCleanLocalStorage(e) {
    e.preventDefault();
    if (JSON.parse(localStorage.getItem(STORAGE_KEY)) === null || email.value === '' || message.value === '') {
        return;
    }
    console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
    email.value = '';
    message.value = '';
    localStorage.removeItem(STORAGE_KEY);  
}