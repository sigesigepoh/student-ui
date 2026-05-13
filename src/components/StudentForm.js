import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentForm = ({ fetchStudents, editingStudent, setEditingStudent }) => {
    const [student, setStudent] = useState({ firstname: '', lastname: '', course: '' });

    // Lab 06: Fill form when editing 
    useEffect(() => {
        if (editingStudent) {
            setStudent(editingStudent);
        }
    }, [editingStudent]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingStudent) {
                // Lab 06: PUT Request 
                await axios.put(`/api/students/${editingStudent._id}`, student);
                setEditingStudent(null);
            } else {
                // Lab 05: POST Request [cite: 2]
                await axios.post('/api/students', student);
            }
            setStudent({ firstname: '', lastname: '', course: '' });
            fetchStudents(); // Refresh the list
        } catch (error) {
            console.error("Error saving student:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "5px" }}>
            <h3>{editingStudent ? 'Edit Student' : 'Add New Student'}</h3>
            <input 
                placeholder="First Name" 
                value={student.firstname} 
                onChange={(e) => setStudent({...student, firstname: e.target.value})} 
                required 
                style={{ marginRight: "10px", padding: "8px" }}
            />
            <input 
                placeholder="Last Name" 
                value={student.lastname} 
                onChange={(e) => setStudent({...student, lastname: e.target.value})} 
                required 
                style={{ marginRight: "10px", padding: "8px" }}
            />
            <input 
                placeholder="Course" 
                value={student.course} 
                onChange={(e) => setStudent({...student, course: e.target.value})} 
                required 
                style={{ marginRight: "10px", padding: "8px" }}
            />
            <button type="submit" style={{ marginRight: "10px", padding: "8px 15px" }}>
                {editingStudent ? 'Update' : 'Add'}
            </button>
            {editingStudent && (
                <button 
                    type="button" 
                    onClick={() => setEditingStudent(null)}
                    style={{ padding: "8px 15px", background: "gray", color: "white" }}
                >
                    Cancel
                </button>
            )}
        </form>
    );
};

export default StudentForm;