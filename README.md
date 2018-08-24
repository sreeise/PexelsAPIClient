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

All of the methods that are popular search methods have the type of photo
in the name of the method and either start with 'get' or 'query' such as

getCurated() or queryCurated()

get methods are a simple query that always returns 20 photos from the 1st page.

query methods allow defining options. See below for more info.

If you are getting undefined for the results you most likely need to parse
the returned photos object, i.e., JSON.parse(photos)

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

Basic get method for popular searches.

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


### Methods starting with query

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
PhotoAPI.queryAdventure(queryOptions, requestOptions).then((photos) => {
    console.log(photos)
});

// Or 

PhotoAPI.queryAdventure({perPage: 15, page: 1}).then((photos) => {
    console.log(photos)
});
```


### Other search methods

There are a couple of other search query method that allows defining what to search for as
well as the authorization key.


```
searchWithKey(url, key)
```
 
Where the url is the complete url for the pexels search such as


    https://api.pexels.com/v1/curated?per_page=20&page=1

And The key is:

    "Bearer YOUR_AUTHORIZATION_KEY"


Note that it is never a good idea to put API keys in JavaScript, Always use
an environment variable in production.

Another search method:

        queryWithKey(queryOptions, key)
        
        // Where queryOptions example is
        {
            type: "city"
            perPage: 15,
            page: 1,
        }
        
        // And key is 
        "Bearer YOUR_AUTHORIZATION_KEY"
        
        
The only difference in this method is it allows you to set the type of search
and the API key without having to specify an object for the request, but you
do have to set the object for the query options.


### Updates/changes from previous version

1. Query Methods discussed above

2. Added a few more popular searches:


technology, office, iphone, yoga, gym, abstract, computer, industry

3. Added more search methods discussed above


### Minor breaking changes from last version

There was a typo for the search of 'meeting'. It was spelled as

getMeetinging()

This has been changed to

getMeeting()
