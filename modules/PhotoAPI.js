/*eslint global-require: "error"*/
/*eslint-env es6*/

require('dotenv').config();
let request = require("request");

let base_url = "https://api.pexels.com/v1/";
let curated = "curated?per_page=20&page=1";

function getAuthorizationOptions() {
  return {
    port: 443,
    method: "GET",
    headers: {
      Authorization: process.env.PexelsAPIKey
    }
  };
}

function genericSearch(url, options) {
  return new Promise((resolve, reject) => {
    request(url, options, function (error, response, body) {
      if (error) {
        reject(error && response && response.statusCode);
        return;
      }

      if (response.statusCode === 200) {
        resolve(body);
      } else {
        reject(response && response.statusCode);
      }
    });
  });
}

/**
 * Forms a search url based off of the given type, amount of photos perPage, and page
 *
 * @param type of photos to search for.
 * @param perPage Amount of photos to get.
 * @param page to get photos from.
 * @returns {string}
 */
function formURL(type, perPage, page) {
  return `${base_url}search?query=${type}&per_page=${perPage}$page=${page}`;
}

/**
 * Options for a query that allows setting the amount of photos per page,
 * and the page to search for.
 *
 * perPage defaults to 15 if not specified.
 * page defaults to 1 if not specified.
 *
 *
 * @param queryOptions Object with page and perPage specified
 * @returns {*} The same object that is checked for null or undefined and
 *          sets values appropriately.
 */
function formQueryOptions(queryOptions) {

  if (queryOptions.perPage === null || queryOptions.perPage === undefined) {
    queryOptions.perPage = 15;
  }

  if (queryOptions.page === null || queryOptions.page === undefined) {
    queryOptions.page = 1;
  }
  return queryOptions;
}


/**
 * Options for a query that allows searching by type, where type is the type of photos
 * that the caller wants to search for, perPage is the amount of photos to get, and page is
 * the page to get the photos from.
 *
 * If a type is not specified, it is set to null. Any function using this function
 * to form a search url should check if type is null before attempting to use it.
 *
 * Amount of photos, perPage, defaults to 15 if not specified.
 * The page to retrieve photos from defaults to 1 if not specified.
 *
 * @param queryOptions An object having three values of type, perPage, and page.
 */
function formQueryOptionsForType(queryOptions) {
  if (queryOptions.type === null || queryOptions.type === undefined) {
    queryOptions.type = null;
  }

  if (queryOptions.perPage === null || queryOptions.perPage === undefined) {
    queryOptions.perPage = 15;
  }

  if (queryOptions.page === null || queryOptions.page === undefined) {
    queryOptions.page = 1;
  }
  return queryOptions;
}

let PhotoAPI = {
  searchFor(url, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  search(type, perPage, page, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL(type, perPage, page);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  /**
   * Allows specifying the url to search and the authorization key.
   *
   * @param url The Pexels API URL. This must be the complete URL such as
   *        https://api.pexels.com/v1/curated?per_page=20&page=1
   * @param key The Authorization key in the form of "Bearer <YOUR AUTHORIZATION KEY>"
   * @returns {Promise<any>}
   */
  searchWithKey(url, key) {
    return new Promise((resolve, reject) => {

      let options = {
        port: 443,
        method: "GET",
        headers: {
          Authorization: key
        }
      };

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  /**
   * Takes an object called queryOptions which should have
   * type, perPage, and Page.
   *
   * type: The type of photos to search for.
   * perPage: Amount of photos to get.
   * page: The page to retrieve the photos from.
   *
   * @param queryOptions An object specifying type, perPage, and page.
   * @param key
   * @returns {Promise<any>}
   */
  queryWithKey(queryOptions, key) {
    return new Promise((resolve, reject) => {

      let options = {
        port: 443,
        method: "GET",
        headers: {
          Authorization: key
        }
      };

      queryOptions = formQueryOptionsForType(queryOptions);
      let url = formURL(queryOptions.type, queryOptions.perPage, queryOptions.page);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  getCurated(requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = base_url + curated;

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  queryCurated(queryOptions, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      queryOptions = formQueryOptions(queryOptions);
      let url = `${base_url}curated?per_page=${queryOptions.perPage}&page=${queryOptions.page}`;

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  getMobile(requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL("mobile", 20, 1);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  queryMobile(queryOptions, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      queryOptions = formQueryOptions(queryOptions);
      let url = formURL("mobile", queryOptions.perPage, queryOptions.page);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  getMoney(requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL("money", 20, 1);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  queryMoney(queryOptions, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      queryOptions = formQueryOptions(queryOptions);

      let url = formURL("money", queryOptions.perPage, queryOptions.page);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  getCreative(requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL("creative", 20, 1);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  queryCreative(queryOptions, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      queryOptions = formQueryOptions(queryOptions);
      let url = formURL("creative", queryOptions.perPage, queryOptions.page);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  getWriting(requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL("writing", 20, 1);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  queryWriting(queryOptions, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      queryOptions = formQueryOptions(queryOptions);
      let url = formURL("writing", queryOptions.perPage, queryOptions.page);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  getWedding(requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL("wedding", 20, 1);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  queryWedding(queryOptions, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      queryOptions = formQueryOptions(queryOptions);
      let url = formURL("wedding", queryOptions.perPage, queryOptions.page);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  getSummer(requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL("summer", 20, 1);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  querySummer(queryOptions, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      queryOptions = formQueryOptions(queryOptions);
      let url = formURL("summer", queryOptions.perPage, queryOptions.page);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  getConstruction(requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL("construction", 20, 1);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  queryConstruction(queryOptions, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      queryOptions = formQueryOptions(queryOptions);
      let url = formURL("construction", queryOptions.perPage, queryOptions.page);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  getWall(requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL("wall", 20, 1);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  queryWall(queryOptions, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      queryOptions = formQueryOptions(queryOptions);
      let url = formURL("wall", queryOptions.perPage, queryOptions.page);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  getWood(requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL("wood", 20, 1);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  queryWood(queryOptions, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      queryOptions = formQueryOptions(queryOptions);
      let url = formURL("wood", queryOptions.perPage, queryOptions.page);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  getPaint(requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL("paint", 20, 1);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  queryPaint(queryOptions, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      queryOptions = formQueryOptions(queryOptions);
      let url = formURL("paint", queryOptions.perPage, queryOptions.page);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  getBooks(requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL("books", 20, 1);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  queryBooks(queryOptions, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      queryOptions = formQueryOptions(queryOptions);
      let url = formURL("books", queryOptions.perPage, queryOptions.page);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  getStreet(requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL("street", 20, 1);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  queryStreet(queryOptions, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      queryOptions = formQueryOptions(queryOptions);
      let url = formURL("street", queryOptions.perPage, queryOptions.page);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  getLaptop(requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL("laptop", 20, 1);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  queryLaptop(queryOptions, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      queryOptions = formQueryOptions(queryOptions);
      let url = formURL("laptop", queryOptions.perPage, queryOptions.page);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  getSunset(requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL("sunset", 20, 1);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  querySunset(queryOptions, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      queryOptions = formQueryOptions(queryOptions);
      let url = formURL("Sunset", queryOptions.perPage, queryOptions.page);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  getKids(requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL("kids", 20, 1);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  queryKids(queryOptions, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      queryOptions = formQueryOptions(queryOptions);
      let url = formURL("kids", queryOptions.perPage, queryOptions.page);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  getCouple(requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL("couple", 20, 1);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  queryCouple(queryOptions, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      queryOptions = formQueryOptions(queryOptions);
      let url = formURL("couple", queryOptions.perPage, queryOptions.page);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  getDesert(requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL("Desert", 20, 1);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  queryDesert(queryOptions, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      queryOptions = formQueryOptions(queryOptions);
      let url = formURL("desert", queryOptions.perPage, queryOptions.page);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  getStudent(requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL("student", 20, 1);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  queryStudent(queryOptions, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      queryOptions = formQueryOptions(queryOptions);
      let url = formURL("student", queryOptions.perPage, queryOptions.page);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  getBeach(requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL("beach", 20, 1);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  queryBeach(queryOptions, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      queryOptions = formQueryOptions(queryOptions);
      let url = formURL("beach", queryOptions.perPage, queryOptions.page);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  getSport(requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL("sport", 20, 1);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  querySport(queryOptions, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      queryOptions = formQueryOptions(queryOptions);
      let url = formURL("sport", queryOptions.perPage, queryOptions.page);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  getSad(requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL("sad", 20, 1);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  querySad(queryOptions, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      queryOptions = formQueryOptions(queryOptions);
      let url = formURL("sad", queryOptions.perPage, queryOptions.page);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  getModel(requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL("model", 20, 1);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  queryModel(queryOptions, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      queryOptions = formQueryOptions(queryOptions);
      let url = formURL("model", queryOptions.perPage, queryOptions.page);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  getGreen(requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL("green", 20, 1);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  queryGreen(queryOptions, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      queryOptions = formQueryOptions(queryOptions);
      let url = formURL("green", queryOptions.perPage, queryOptions.page);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  getGrass(requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL("grass", 20, 1);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  queryGrass(queryOptions, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      queryOptions = formQueryOptions(queryOptions);
      let url = formURL("grass", queryOptions.perPage, queryOptions.page);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  getMarketing(requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL("marketing", 20, 1);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  queryMarketing(queryOptions, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      queryOptions = formQueryOptions(queryOptions);
      let url = formURL("marketing", queryOptions.perPage, queryOptions.page);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  getMeeting(requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL("meeting", 20, 1);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  queryMeeting(queryOptions, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      queryOptions = formQueryOptions(queryOptions);
      let url = formURL("meeting", queryOptions.perPage, queryOptions.page);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  getHome(requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL("home", 20, 1);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  queryHome(queryOptions, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      queryOptions = formQueryOptions(queryOptions);
      let url = formURL("home", queryOptions.perPage, queryOptions.page);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  getFitness(requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL("fitness", 20, 1);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  queryFitness(queryOptions, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      queryOptions = formQueryOptions(queryOptions);
      let url = formURL("fitness", queryOptions.perPage, queryOptions.page);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  getFashion(requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL("fashion", 20, 1);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  queryFashion(queryOptions, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      queryOptions = formQueryOptions(queryOptions);
      let url = formURL("fashion", queryOptions.perPage, queryOptions.page);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  getMockup(requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL("mockup", 20, 1);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  queryMockup(queryOptions, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      queryOptions = formQueryOptions(queryOptions);
      let url = formURL("mockup", queryOptions.perPage, queryOptions.page);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  getPerson(requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL("person", 20, 1);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  queryPerson(queryOptions, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      queryOptions = formQueryOptions(queryOptions);
      let url = formURL("person", queryOptions.perPage, queryOptions.page);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  getPlane(requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL("plane", 20, 1);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  queryPlane(queryOptions, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      queryOptions = formQueryOptions(queryOptions);
      let url = formURL("plane", queryOptions.perPage, queryOptions.page);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  getAdventure(requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL("adventure", 20, 1);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  queryAdventure(queryOptions, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      queryOptions = formQueryOptions(queryOptions);
      let url = formURL("adventure", queryOptions.perPage, queryOptions.page);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  getTechnology(requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL("technology", 20, 1);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  queryTechnology(queryOptions, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      queryOptions = formQueryOptions(queryOptions);
      let url = formURL("technology", queryOptions.perPage, queryOptions.page);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  getOffice(requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL("office", 20, 1);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  queryOffice(queryOptions, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      queryOptions = formQueryOptions(queryOptions);
      let url = formURL("office", queryOptions.perPage, queryOptions.page);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  getIphone(requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL("iphone", 20, 1);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  queryIphone(queryOptions, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      queryOptions = formQueryOptions(queryOptions);
      let url = formURL("iphone", queryOptions.perPage, queryOptions.page);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  getYoga(requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL("yoga", 20, 1);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  queryYoga(queryOptions, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      queryOptions = formQueryOptions(queryOptions);
      let url = formURL("yoga", queryOptions.perPage, queryOptions.page);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  getGym(requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL("gym", 20, 1);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  queryGym(queryOptions, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      queryOptions = formQueryOptions(queryOptions);
      let url = formURL("gym", queryOptions.perPage, queryOptions.page);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  getAbstract(requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL("abstract", 20, 1);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  queryAbstract(queryOptions, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      queryOptions = formQueryOptions(queryOptions);
      let url = formURL("abstract", queryOptions.perPage, queryOptions.page);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  getComputer(requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL("computer", 20, 1);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  queryComputer(queryOptions, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      queryOptions = formQueryOptions(queryOptions);
      let url = formURL("computer", queryOptions.perPage, queryOptions.page);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  getIndustry(requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL("industry", 20, 1);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },

  queryIndustry(queryOptions, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      queryOptions = formQueryOptions(queryOptions);
      let url = formURL("industry", queryOptions.perPage, queryOptions.page);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  }
};

module.exports = PhotoAPI;
