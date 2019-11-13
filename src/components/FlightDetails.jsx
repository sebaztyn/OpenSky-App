import React, { Component } from "react";
import Loading from "./Loading.jsx";

export class FlightDetails extends Component {
  render() {
    return (
      <div>
        <h3>Airport</h3>
        <p>{this.props.airport}</p>
        {this.props.flightDetailsLoading ? (
          <Loading />
        ) : !this.props.errorFetch ? (
          <div>
            <span>Number of Departed Flights in the last 1440 hours:</span>{" "}
            <span>
              <em>{this.props.departureNumber}</em>
            </span>{" "}
            <br />
            <span>Number of Arrived Flights in the last 1440 hours:</span>{" "}
            <span>
              <em>{this.props.arrivalNumber}</em>
            </span>{" "}
            <br />
          </div>
        ) : this.props.errorFetch ? (
          <div>No data returned for {this.props.airport}</div>
        ) : null}
        <button onClick={this.props.closeModal} className="buttons">CLOSE</button>
      </div>
    );
  }
}

export default FlightDetails;
