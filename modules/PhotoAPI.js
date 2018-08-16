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

function formURL(type, perPage, page) {
  return base_url + `search?query=${type}&per_page=${perPage}$page=${page}`;
}

let PhotoAPI = {

  search(type, perPage, page, requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL(type, perPage, page);

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

  getAdventure(requestOptions) {
    return new Promise((resolve, reject) => {
      let options;

      if (!requestOptions) {
        options = getAuthorizationOptions();
      } else {
        options = requestOptions;
      }

      let url = formURL("Adventure", 20, 1);

      genericSearch(url, options).then((photos) => {
        resolve(photos);
      }).catch((error) => {
        reject(error);
      });
    });
  },
};

module.exports = PhotoAPI;