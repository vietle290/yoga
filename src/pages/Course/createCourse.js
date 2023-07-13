import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateCourse() {
    const token =
        'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTIzNDU2Nzg5IiwiaWF0IjoxNjg5MjA2OTMyLCJleHAiOjE2ODkyOTMzMzJ9.gahZpRUlrgRy7m6w6gC4uqJcXR7iWrkJwN2DQmEbvvw';
    const navigate = useNavigate();
    const [course, setCourse] = useState({
        courseId: 0,
        name: '',
        description: '',
        price: 0,
    });

    const handleChange = (e) => {
        setCourse({
            ...course,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = 'https://ygcapi.azurewebsites.net/api/course';
            const headers = {
                accept: '*/*',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };

            const response = await axios.post(url, course, { headers });
            console.log(response.data);
            navigate('/course');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={course.name} onChange={handleChange} placeholder="Course Name" />
            <input
                type="text"
                name="description"
                value={course.description}
                onChange={handleChange}
                placeholder="Course Description"
            />
            <input type="number" name="price" value={course.price} onChange={handleChange} placeholder="Course Price" />
            <button type="submit">Create Course</button>
        </form>
    );
}

export default CreateCourse;
