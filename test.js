let PhotoAPI = require("./index");
let assert = require("assert");

PhotoAPI.queryAbstract({perPage: 5, page: 1}).then((p) => {
  let photos = JSON.parse(p);
  let a = photos['photos'];
  assert.equal(a.length, 5);
});

PhotoAPI.getCurated().then((p) => {
  let photos = JSON.parse(p);
  let a = photos['photos'];
  assert.equal(a.length, 20);
});

