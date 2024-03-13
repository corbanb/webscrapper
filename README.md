# Usage


```sh
$ npm run start # runs demo
$ npm run start -- lenny
```



### Config files
```js
const config = {
  baseURL: 'https://martech.org',
  set: {
    title: 'div.story-box h1',
    article: 'div.story-box div.body-content.pt-3',
  },
  filename: 'demo.json',
  urls: [
    'https://martech.org/riding-the-ai-tsunami-harnessing-creativity-and-efficiency-in-the-digital-age/',
  ],
};

module.exports = config;

```