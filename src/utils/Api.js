// utils/Api.js

class Api {
  constructor(options) {
    // constructor body
  }

  getInitialCards() {
    // ...
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "39df9e1c-6ec2-44d1-a3b6-60d6e9498d03",
      },
    }).then((res) => res.json());
  }

  // other methods for working with the API
}

// export the class
export default Api;
