import React, { Component, Fragment } from "react";
import logo from "./logo.svg";
import "./App.css";
import ScheduleContainer from "./components/containers/SchedulerContainer";
import StudentContainer from "./components/containers/StudentsContainer";

class App extends Component {
  render() {
    return (
      <Fragment>
        <ScheduleContainer />
        <StudentContainer />
      </Fragment>
    );
  }
}

export default App;
