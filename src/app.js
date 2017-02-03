import 'index.html';
import 'base.css';
import Vue from 'vue';
import App from 'App.vue';

const ready = new Promise((resolve) => {
  window.addEventListener('load', resolve, {
    once: false
  }, false);
});

const run = function() {
  new Vue({
    el: '#app',
    render: (h) => h(App)
  });
};

ready.then(run);
