# PexelsAPIClient
JavaScript Client for the Pexels API (pexels.com)

```
npm install pexels-api-client --save
```

```
let PhotoAPI = require('pexels-api-client')
```


Implements several methods for using the pexels API

Provides methods for popular searches that are a subset of popular searches
found on pexels.com:

https://www.pexels.com/popular-searches/

You can also get curated photos.

### Configuration:

Create a .env file in your route directory and enter your
pexels api key for a variable titled: PexelsAPIKey

All methods return a promise.

Default port used is 443. These options
can be changed on every function by providing an options
object in the parameter written in the form of 

```
   {
        url: ...
        port ...
        headers {
            "Authorization": process.env.PexelsAPIKey
        }
   }
```


### examples: 

```
// curated
PhotoAPI.getCurated().then((photos) => {
    console.log(photos);
});
```


Searching:

```
// parameters: type, photo amount, page
PhotoAPI.search("mountains", 10, 1).then((photos) => {
    console.log(photos);
});
```

// Set your own options in the request:

```
let options = { ... }

PhotoAPI.getCurated(options).then((photos) => {
    console.log(photos)
});

// For searching:
// parameters: type, photo amount, page, options
PhotoAPI.search("mountains", 10, 1, options).then((photos) => {
    console.log(photos);
});
```