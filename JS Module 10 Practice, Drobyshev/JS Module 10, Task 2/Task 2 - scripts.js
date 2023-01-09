window.onload=function() {

const button = document.querySelector('.button');

const userScreenWidth = window.screen.width;
const userScreenHeight = window.screen.height;

button.addEventListener('click', () => {
  alert(`Your screen resolution is ${userScreenWidth}x${userScreenHeight}`);
})

}