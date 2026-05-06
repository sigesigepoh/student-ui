import React from 'react';
import axios from 'axios';

const StudentList = ({ students, fetchStudents, setEditingStudent }) => {
    
    // Lab 05: DELETE Request [cite: 2]
    const deleteStudent = async (id) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            await axios.delete(`/api/students/${id}`);
            fetchStudents();
        }
    };

    return (
        <div>
            <h2>Student List</h2>
            <ul>
                {students.map((student) => (
                    <li key={student._id} style={{ margin: "10px 0" }}>
                        {student.firstname} {student.lastname} ({student.course})
                        {/* Lab 06: Edit Button  */}
                        <button onClick={() => setEditingStudent(student)} style={{ marginLeft: "10px" }}>Edit</button>
                        {/* Lab 05: Delete Button [cite: 2] */}
                        <button onClick={() => deleteStudent(student._id)} style={{ marginLeft: "5px", color: "red" }}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentList;