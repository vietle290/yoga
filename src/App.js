import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import config from './config';
// import { DefaultLayout, HeaderOnly } from './components/Layout';
import Dashboard from './pages/Dashboard';
import User from './pages/User';
import Class from './pages/Class';
import Course from './pages/Course';
import Room from './pages/Room';
import CreateCourse from './pages/Course/createCourse';
import CreateClass from './pages/Class/createClass';
import CreateTimeTable from './pages/Timetable/createTimeTable';
import TimeTableList from './pages/Timetable/timeTableList';
import BookingManagement from './pages/BookingManagement';
import Staff from './pages/Staff';

function App() {


    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path={config.routes.dashboard} element={<Dashboard />} />
                    <Route path={config.routes.user} element={<User />} />
                    <Route path={config.routes.class} element={<Class />} />
                    <Route path={config.routes.course} element={<Course />} />
                    <Route path={config.routes.room} element={<Room />} />
                    <Route path={config.routes.createCourse} element={<CreateCourse />} />
                    <Route path={config.routes.createClass} element={<CreateClass />} />
                    <Route path={config.routes.createTimeTable} element={<CreateTimeTable />} />
                    <Route path={config.routes.timeTableList} element={<TimeTableList />} />
                    <Route path={config.routes.bookingManagement} element={<BookingManagement />} />
                    <Route path={config.routes.staff} element={<Staff />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
