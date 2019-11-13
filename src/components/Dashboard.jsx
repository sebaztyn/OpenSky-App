/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from "react";
import { fetchFlightInfo } from "../db/fetchData";
import { airportData } from "../db/dummyData";
import Loading from "./Loading.jsx";
import Modal from "./Modal.jsx";
import FlightDetails from "./FlightDetails.jsx";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import Grid from "@material-ui/core/Grid";
import classes from "../scss/dashboard.module.scss"

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.myref = React.createRef();
  }

  state = {
    cityData: [],
    isLoading: true,
    icaoIdentifier: "",
    flightArrivalData: [],
    flightDepartureData: [],
    departureNumber: null,
    arrivalNumber: null,
    airportName: "",
    isModalOpen: false,
    flightDetailsLoading: true,
    errorFetch: false
  };

  componentDidMount() {
    const cities = airportData.filter(result => {
      const cityData =
        result.cityName === "London" ||
        result.cityName === "Los Angeles" ||
        result.cityName === "Atlanta" ||
        result.cityName === "Shanghai" ||
        result.cityName === "Bangkok" ||
        result.cityName === "Beijing" ||
        result.cityName === "Chicago" ||
        result.cityName === "New York" ||
        result.cityName === "Paris" ||
        result.cityName === "Tokyo";
      return cityData;
    });
    return this.setState({ cityData: cities, isLoading: false });
  }

  componentWillUnmount() {}

  handleClick = e => {
    e.preventDefault;
    const { icao } = e.target.dataset;
    const { textContent } = e.target;
    this.setState({
      flightDetailsLoading: true,
      isModalOpen: true,
      errorFetch: false,
      airportName: textContent,
      flightArrivalData: [],
      flightDepartureData: []
    });
    if (icao)
      return this.setState({ icaoIdentifier: icao }, () => {
        fetchFlightInfo(this.state.icaoIdentifier)
          .then(data =>
            this.setState({
              flightArrivalData: [...data.arrivalInfo.data],
              flightDepartureData: [...data.departureInfo.data],
              airportName: textContent,
              flightDetailsLoading: false
            })
          )
          .catch(err =>
            this.setState({ errorFetch: true, flightDetailsLoading: false })
          );
      });
    return this.setState({ icaoIdentifier: "" });
  };
  closeModalHandler = () => {
    return this.setState({ isModalOpen: false });
  };
  render() {
    const {
      isLoading,
      cityData,
      airportName,
      isModalOpen,
      flightDepartureData,
      flightArrivalData,
      flightDetailsLoading,
      errorFetch
    } = this.state;
    const citiesList = cityData.map(data => (
      <Grid key={data.airportCode} sm={6} item className={classes.citylist}>
          <span>{data.cityName} - </span>
          <span
            onClick={this.handleClick}
            data-icao={data.airportCode}
            ref={this.myref}
          >
            {`${data.airportName} Airport`}
          </span>
      </Grid>
    ));
    if (isLoading) return <Loading />;
    return (
      <Grid
        spacing={5}
        direction="column"
        container
        justify="center"
        alignItems="center"
        className={classes.cityDisplay}
      >
        <AppBar position="static">
          <ToolBar>
            <Typography>List of Top Airports by Air Traffic</Typography>
          </ToolBar>
        </AppBar>
        {citiesList}
        {isModalOpen && (
          <Modal>
            <FlightDetails
              errorFetch={errorFetch}
              flightDetailsLoading={flightDetailsLoading}
              airport={airportName}
              departureNumber={flightDepartureData.length}
              arrivalNumber={flightArrivalData.length}
              closeModal={this.closeModalHandler}
            />
          </Modal>
        )}
      </Grid>
    );
  }
}

export default Dashboard;
