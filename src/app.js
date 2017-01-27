import 'index.html';
import _ from 'lodash/fp';

const ready = new Promise((resolve) => {
  window.addEventListener("load", resolve, {once: true}, false);
});

const run = function () {
    const app = document.getElementById('app');
    app.innerHTML = 'HELLO Webpack-express-boilerplate';
};

ready.then(run);
