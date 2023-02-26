import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY_FEEDBACK_STATE = 'feedback-form-state';
const feedbackForm = document.querySelector('.feedback-form');
const feedbackFormEmail = document.querySelector("input[type='email']");
const feedbackFormMessage = document.querySelector("textarea[name='message']");

const setFeedbackState = throttle(e => {
  if (!e.currentTarget) {
    return;
  }

  const {
    elements: { email, message },
  } = e.currentTarget;

  try {
    localStorage.setItem(
      LOCALSTORAGE_KEY_FEEDBACK_STATE,
      JSON.stringify({
        email: email.value,
        message: message.value,
      })
    );
  } catch (error) {
    console.error('Set state error', error.stack);
  }
}, 500);

const handleSubmit = e => {
  e.preventDefault();

  const {
    elements: { email, message },
  } = e.currentTarget;

  if (!email.value || !message.value) {
    alert('Fill in all fields!');
    return;
  }

  console.log({ email: email.value, message: message.value });

  try {
    localStorage.removeItem(LOCALSTORAGE_KEY_FEEDBACK_STATE);
  } catch (error) {
    console.error('Remove state error', error.stack);
  }

  e.currentTarget.reset();
};

feedbackForm.addEventListener('input', setFeedbackState);
feedbackForm.addEventListener('submit', handleSubmit);

if (localStorage.getItem(LOCALSTORAGE_KEY_FEEDBACK_STATE)) {
  try {
    const previousValue = JSON.parse(
      localStorage.getItem(LOCALSTORAGE_KEY_FEEDBACK_STATE)
    );
    feedbackFormEmail.value = previousValue.email;
    feedbackFormMessage.value = previousValue.message;
  } catch (error) {
    console.error('Get state error', error.stack);
  }
}
