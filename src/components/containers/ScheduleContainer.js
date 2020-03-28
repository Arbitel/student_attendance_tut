import React from "react";
import DayPicker, { dateUtils } from "react-day-picker";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as attendanceRecordActions from "../../actions/attendanceRecordActions";
import AttendanceRecordShow from "../AttendanceRecordShow";

class ScheduleContainer extends React.Component {
  constructor(props) {
    super(props);
    this.selectStudent = this.selectStudent.bind(this);
    this.state = {
      selectedStudent: null,
      selectedRecord: null,
      SelectedDay: new Date()
    };
  }

  //Use the lifecycle method, componentDidMount to check if there are in fact attendance records.
  //If not, dispatch the fetchAttendanceRecords action, which will make an API call, get the attendance records, populate them into application state and cause a re-render.
  componentDidMount() {
    if (this.props.attendanceRecords.length == 0) {
      this.props.actions.fetchAttendanceRecords();
    }
  }

  selectStudent(studentId) {
    const student = this.props.students.find(
      student => student.id == studentId
    );
    var that = this;
    const recordsBySelectedDate = this.props.attendanceRecords.find(
      recordsByDate => {
        const date = new Date(recordsByDate.date);
        return date.toDateString() == that.state.selectedDay.toDateString();
      }
    );
    const record = recordsBySelectedDate.records.find(
      record => record.student_id
    );
    this.setState({ selectedStudent: student, selectedRecord: record });
  }

  selectDay(e, day) {
    e.preventDefault();
    if (this.state.selectedStudent) {
      const recordsBySelectedDate = this.props.attendanceRecords.find(
        recordsByDate => {
          const date = new Date(recordsByDate.date);
          return date.toDateString() == day.toDateString();
        }
      );
      const record = recordsBySelectedDate.records.find(
        record => student_id == this.state.selectedStudent.id
      );

      this.setState({ selectedRecord: record, selectedDay: day });
    } else {
      this.setState({ selectedDay: day });
    }
  }

  render() {
    return (
      <div>
        <StudentsContainer selectedStudent={this.selectStudent} />
        <DayPicker
          locale="us"
          selectedDays={day => {
            DateUtils.isSameDay(new Date());
          }}
        />

        <AttendanceRecordShow
          day={this.SelectedDay}
          student={this.selectedStudent}
          record={this.selectedRecord}
        />
      </div>
    );
  }
}

//Use mapStateToProps to get the attendance records from state and make them available to our component as props.
//(The default value for this key of state is an empty array, and it is set in the initial state of our application, not shown here.)
const mapStateToProps = (state, ownProps) => {
  return { attendanceRecords: state.attendanceRecords };
};

//Use mapDispatchToProps to get the attendanceRecordActions functions and make them available to our component under this.props.actions.
const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(attendanceRecordActions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleContainer);
