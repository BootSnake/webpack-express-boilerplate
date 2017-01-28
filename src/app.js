import 'index.html';
import css from 'base.css';
import _ from 'lodash/fp';
import Vue from 'vue';
import App from 'app.vue';


const ready = new Promise((resolve) => {
  window.addEventListener("load", resolve, {once: false}, false);
});

const run = function () {
    const vm = new Vue({
      el: '#app',
      render: (h) => h(App)
    });
};

ready.then(run);
