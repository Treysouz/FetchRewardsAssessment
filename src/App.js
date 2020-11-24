import React, { Component } from "react";
import $ from "jquery";

export default class App extends Component {
  //Set state 'data' to store data from AJAX call
  constructor() {
    super();
    this.state = {
      data: null,
    };
  }
  //When app component mounts....
  componentDidMount() {
    //Use Ajax to access the data in hiring.json and upon success, filter out all data within JSON object with 'Name' value set to null or an empty string then sort by listId and itemName and store it in state 'data.'
    $.ajax({
      url: "https://fetch-hiring.s3.amazonaws.com/hiring.json",
      method: "GET",
      success: (results) => {
        var sortedResults = results
          .filter((item) => item.name !== null && item.name !== "")
          .sort((a, b) => {
            if (a.listId > b.listId) {
              return 1;
            } else if (a.listId < b.listId) {
              return -1;
            } else {
              return a.name.localeCompare(b.name, undefined, { numeric: true });
            }
          });
        this.setState({
          data: sortedResults,
        });
      },
    });
  }
  render() {
    return (
      <main>
        <h1>Fetch Rewards Coding Exercise </h1>
        <h2>Software Engineering - Front End</h2>
        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>ID</th> <th>List ID</th> <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {/* {Iterate through 'data' state and print object values in respective positions in data table if data exists.  If data does not exist, print error message } */}
              {this.state.data
                ? this.state.data.map((item, index) => {
                    return (
                      <tr key={index + item.id + item.name}>
                        <td>{item.id}</td>
                        <td>{item.listId}</td>
                        <td>{item.name}</td>
                      </tr>
                    );
                  })
                :<tr><td className="errorMsg">There was an error accessing the data</td></tr>}
            </tbody>
          </table>
    
        </div>
    
      </main>
    );
  }
}
