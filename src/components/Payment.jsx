import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Section } from 'react-materialize';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function Payment() {
    const navigate = useNavigate();

    const paymentURL = 'https://ygcapi.azurewebsites.net/api/payment';
    const bookClassURL = 'https://ygcapi.azurewebsites.net/api/learning';

    const token = useSelector(state => state.user.token);

    const { classId } = useParams();
    const [payments, setPayments] = useState([]);
    const [paymentId, setPaymentId] = useState('');

    useEffect(() => {
        const getAllPayments = async () => {
            try {
                const response = await axios.get(paymentURL);
                setPayments(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        getAllPayments();

    }, [])

    const handlePayment = async (e) => {
        e.preventDefault();

        const payload = {
            classId: classId,
            paymentId: paymentId
        }

        const headers = {
            'Authorization': 'Bearer ' + token,
            'accept': '*/*'

        }

        try {
            const response = await axios.post(bookClassURL, payload, { headers })
            if (response.status === 200) {
                alert('Booking successfully');
                navigate('/')
            }

        } catch (error) {
            if (error.message.includes('409')) {
                alert('You are already booking this class');
                navigate('/class')
            }
        }

    }


    return (
        <Section>
            {
                payments?.map((payment) => {
                    return (
                        <div key={payment.id}>
                            <label>
                                <input name='group' type="radio" onChange={() => setPaymentId(payment.id)} />
                                <span>{payment.name}</span>
                            </label>
                        </div>
                    )
                })
            }
            <button onClick={handlePayment} className='btn'>
                Payment
            </button>
        </Section>
    )
}
