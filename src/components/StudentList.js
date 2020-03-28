import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

const StudentList = props => {
	const triggerSelectStudent = (e) => {
		e.preventDefault()
		props.selectStudent(e.target.id)
	}

  const studentListItems = () => {
    return props.students.map((student, i) => {
      return (
        <ListGroupItem onClick={triggerSelectStudent} id={student.id}>
          {student.first_name} {student.last_name}
        </ListGroupItem>
      );
    });
  };

  const studentListGroup = () => {
    return <ListGroup>{studentListItems()}</ListGroup>;
  };

  return { studentListGroup() };
};

export default StudentList