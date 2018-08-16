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

Set your own options in the request:

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


### Only on GitHub until the next major release:


### Recently released methods for amount of photos and what page to get photos from.

Be aware that attempting to ask for more then 40 photos will always return a bad
request as that is the max amount pexels.com allows for one call.

Each Method that starts with the word 'query' takes two parameters which are objects

The first object is a query options object that is defined as:

```
let queryOptions = {
    perPage: 15,
    page: 1
}
```

The only thing to remember is to just use the names perPage and page in an object where
perPage is the amount of photos to get and page is the page on pexels.com to get them from.


The second object is the options object mentioned above for changing the 
way the request is made.

```
PhotoAPI.getAdventure(queryOptions, requestOptions).then((photos) => {
    console.log(photos)
}

// Or 

PhotoAPI.getAdventure(queryOptions).then((photos) => {
    console.log(photos)
}

PhotoAPI.getAdventure({perPage: 15, page: 1}).then((photos) => {
    console.log(photos)
}
```


Right now, the query methods may cause a problem if you decide not
to include a query options object.
 
however this:

    PhotoAPI.queryAdventure()

Would be the exact same thing as this:

    PhotoAPI.getAdventure()
    
Use the get methods for no params, not query.

This is temporary and will be fixed in future commits.