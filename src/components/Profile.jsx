import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Section, TextInput } from 'react-materialize';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { updateProfile } from '../redux/userSlice';

export default function Profile() {
    const user = useSelector(state => state.user.user);
    const token = useSelector(state => state.user.token);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const profileURL = 'https://ygcapi.azurewebsites.net/api/user/profile';
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    const handleDateChange = (date) => {
        setDateOfBirth(date);
    }

    const handleEditProfile = async (e) => {
        e.preventDefault();

        const payload = {
            phone: phone,
            fullName: fullName,
            email: email,
            address: address,
            dateOfBirth: dateOfBirth
        }

        const headers = {
            'Authorization': 'Bearer ' + token,
            'accept': '*/*'
        };

        try {
            const response = await axios.put(profileURL, payload, { headers })
            const dataUpdated = JSON.parse(response.config.data);
            dispatch(updateProfile(dataUpdated));

            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setFullName(user.fullName);
        setPhone(user.phone);
        setDateOfBirth(user.dateOfBirth);
        setEmail(user.email);
        setAddress(user.address);
    }, [user.fullName, user.phone, user.dateOfBirth, user.email, user.address]);

    return (
        <Section >
            <h3 className='center'>Profile</h3>

            <Section style={{
                backgroundColor: '#f0f2f5',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '70px'
            }}>
                <Card style={{
                    width: '30%',
                }}>
                    <form onSubmit={handleEditProfile}>
                        <TextInput label="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} />
                        <TextInput label="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
                        <DatePicker value={dateOfBirth} onChange={handleDateChange}
                            dateFormat='dd-MM-yyyy' showYearDropdown scrollableYearDropdown
                            yearDropdownItemNumber={100} />
                        <TextInput label='Address' value={address} onChange={e => setAddress(e.target.value)} />
                        <TextInput label='Email' email value={email} onChange={e => setEmail(e.target.value)} />
                        <Link to='/password'>Change Password</Link><br />
                        <button type='submit' className='btn'>
                            Edit
                        </button>
                    </form>
                </Card>
            </Section>

        </Section>
    )
}
