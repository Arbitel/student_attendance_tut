import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as instructorActions from "../../actions/instructorActions";
import StudentList from "../studentList";

class StudentContainer extends React.Component {
  componentDidMount() {
    if (this.props.students.length == 0) {
      this.props.actions.fetchStudents();
    }
  }

  render() {
    return (
      <div className="col-lg-4">
        <h2>Students</h2>
        <StudentList students={this.props.students} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { students: state.students };
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(instructorActions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentContainer);
