const x = require('x-ray')();
const fs = require('fs');
const path = require('path');

// Read the websites directory
const websiteFiles = fs.readdirSync(path.join(__dirname, 'websites'));

// Create a map of all the modules in the websites directory
const modules = {};
websiteFiles.forEach((file) => {
  const moduleName = path.basename(file, '.js');
  modules[moduleName] = require(`./websites/${moduleName}`); // eslint-disable-line
});

const args = process.argv.slice(2);
const name = args[0] || 'demo';

// If the module doesn't exist, throw an error
if (!modules[name]) {
  throw new Error(`No module found for '${name}'`);
}

const data = modules[name];

const articles = [];
const promises = [];
const { set, filename, urls } = data;

// Define an array to store the names of the missing variables
const missingVariables = [];

if (!set) {
  missingVariables.push('set');
}

if (!filename) {
  missingVariables.push('filename');
}

if (!urls) {
  missingVariables.push('urls');
}

// If there are missing variables, throw an error with the names of the missing variables
if (missingVariables.length > 0) {
  throw new Error(`The following variables are not set: ${missingVariables.join(', ')}`);
}

urls.forEach((url) => {
  promises.push(
    x(url, set),
  );
});

Promise.all(promises).then((values) => {
  values.forEach((value) => {
    // console.log(value);
    articles.push(value);
  });

  const json = JSON.stringify({ articles });

  fs.writeFile(`json/${filename}`, json, 'utf8', () => {
    console.log(
      '------------------------------------------------------------------------',
    );
    console.log(' ');
    console.log(' ');
    console.log('🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉 🎉');
    console.log(' ');
    console.log('👉 ', filename, 'has been created');
    console.log(' ');
  });
});
