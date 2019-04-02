import React, { Component } from "react";
import axios from "axios";
class App extends Component {
  async getCustomers() {
    let apiUrl = "";
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    if (process.env.NODE_ENV === "development") {
      apiUrl = proxyUrl + "http://demo.kimai.org/api/";
      console.log(process.env.NODE_ENV);
    } else {
      apiUrl = "https://demo.kimai.org/api/";
      console.log(process.env.NODE_ENV);
    }
    let headers = {
      "X-AUTH-USER": "susan_super",
      "X-AUTH-TOKEN": "api_kitten"
    };
    try {
      const response = await axios.get(apiUrl + "customers", {
        headers: headers
      });
      const customer = await response;
      console.log(customer);
      return customer;
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <>
        <p>hello</p>
        <button onClick={() => this.getCustomers()}>customers</button>
      </>
    );
  }
}

export default App;
