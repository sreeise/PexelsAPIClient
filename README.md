# PexelsAPIClient
JavaScript Client for the Pexels API (pexels.com)

Implements several methods for using the pexels API


Most popular searches can be found in the client. These
are listed here:

https://www.pexels.com/popular-searches/

You can also do a default search and get the curated photos.

Default port used is 443. These options
can be changed on every function by providing an options
object in the form of 

<code>

    {
        url: ...
        port ...
        headers {
            "Authorization": process.env.PexelsAPIKey
        }
       }
</code>


Configuration:

Create a .env file in your route directory and enter your
pexels api key for a variable titled: PexelsAPIKey