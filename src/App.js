import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

function App() {
    const [students, setStudents] = useState([]);
    // Lab 06: Edit state 
    const [editingStudent, setEditingStudent] = useState(null);

    // Lab 05: Fetch data from server [cite: 2]
    const fetchStudents = async () => {
        try {
            const response = await axios.get('/api/students');
            setStudents(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h1>Student Management System</h1>
            {/* Pass props as required by Lab 06  */}
            <StudentForm 
                fetchStudents={fetchStudents} 
                editingStudent={editingStudent} 
                setEditingStudent={setEditingStudent} 
            />
            <hr />
            <StudentList 
                students={students} 
                fetchStudents={fetchStudents} 
                setEditingStudent={setEditingStudent} 
            />
        </div>
    );
}

export default App;