import React, { useState } from 'react';
import axios from 'axios';

const StudentList = ({ students, fetchStudents, setEditingStudent }) => {
    // Lab 07: State for delete confirmation
    const [deletingId, setDeletingId] = useState(null);
    
    // Lab 05: DELETE Request [cite: 2]
    const deleteStudent = async (id) => {
        try {
            await axios.delete(`/api/students/${id}`);
            fetchStudents();
            setDeletingId(null); // Clear deletion state
        } catch (error) {
            console.error("Error deleting student:", error);
        }
    };

    return (
        <div>
            <h2>Student List</h2>
            <ul>
                {students.map((student) => (
                    <li key={student._id} style={{ margin: "10px 0", padding: "10px", border: "1px solid #ccc" }}>
                        <div>
                            <strong>{student.firstname} {student.lastname}</strong> ({student.course})
                        </div>
                        <div style={{ marginTop: "8px" }}>
                            {/* Lab 06: Edit Button  */}
                            <button 
                                onClick={() => setEditingStudent(student)} 
                                style={{ marginRight: "5px", padding: "5px 10px" }}
                            >
                                Edit
                            </button>
                            
                            {/* Lab 07: Delete Button with Cancel */}
                            {deletingId === student._id ? (
                                <div style={{ display: "inline-block", marginLeft: "5px" }}>
                                    <span style={{ marginRight: "10px", color: "red" }}>Confirm Delete?</span>
                                    <button 
                                        onClick={() => deleteStudent(student._id)} 
                                        style={{ marginRight: "5px", padding: "5px 10px", background: "red", color: "white" }}
                                    >
                                        Delete
                                    </button>
                                    <button 
                                        onClick={() => setDeletingId(null)} 
                                        style={{ padding: "5px 10px", background: "gray", color: "white" }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <button 
                                    onClick={() => setDeletingId(student._id)} 
                                    style={{ marginLeft: "5px", padding: "5px 10px", color: "red" }}
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentList;