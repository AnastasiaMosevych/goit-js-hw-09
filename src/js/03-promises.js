import Notiflix from 'notiflix';

const submitBtn = document.querySelector("button[type='submit']");
const delayInput = document.querySelector("input[name='delay']");
const stepInput = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');

submitBtn.addEventListener('click', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const firstDelay = Number(delayInput.value);
  const delayStep = Number(stepInput.value);
  const amount = Number(amountInput.value); 
  let delay = Number(firstDelay);
  for (let position = 1; position <= amount; position++) {
    const promise = createPromise(position, delay);
    delay = delay + delayStep;
    promise
      .then(
        value => {
          Notiflix.Notify.success(`Fulfilled promise ${value.position} in ${value.delay}ms`);
       },
      )
      .catch(error => {
        Notiflix.Notify.failure(`Rejected promise ${error.position} in ${error.delay}ms`);
      })
  }
};

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay);
  });
  return promise;
};
