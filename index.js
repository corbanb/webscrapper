const x = require('x-ray')();
const fs = require('fs');
const data = require('./websites/lennysnewsletter-about');

const articles = [];
const promises = [];
const { set } = data;

data.urls.forEach((url) => {
  console.log(url);
  promises.push(
    x(url, set),
  );
});

Promise.all(promises).then((values) => {
  values.forEach((value) => {
    console.log(value);
    articles.push(value);
  });

  const json = JSON.stringify({ articles });

  fs.writeFile('articles.json', json, 'utf8', () => {
    console.log('done');
  });
});

console.log(
  '------------------------------------------------------------------------',
);
