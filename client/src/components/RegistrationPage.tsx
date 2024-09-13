import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {useAuth} from "../context/AuthContext";

interface IRegistrationForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const RegistrationPage: React.FC = () => {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const navigate = useNavigate();

    const { login } = useAuth();

    const [formData, setFormData] = useState<IRegistrationForm>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateFormData = (): boolean => {
        let isValid = true;
        const newErrors: { [key: string]: string } = {};

        if (!formData.firstName) {
            newErrors.firstName = 'First name is required';
            isValid = false;
        }

        if (!formData.lastName) {
            newErrors.lastName = 'Last name is required';
            isValid = false;
        }

        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Valid email is required';
            isValid = false;
        }
        if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateFormData()) {
            try {
                const response = await fetch('http://localhost:3000/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const { token } = await response.json();
                if (token) {
                    login(token);
                    navigate('/');
                } else {
                    alert("Invalid registration");
                }

            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        }
    };

return (
    <div className="App">
        <h1>Registration Form</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="firstName">First name:</label>
                <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                /><label style={{color: 'red'}}>*</label>
                {errors.firstName && <p style={{color: 'red'}}>{errors.firstName}</p>}
            </div>
            <div>
                <label htmlFor="lastName">Last name:</label>
                <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                /><label style={{color: 'red'}}>*</label>
                {errors.lastName && <p style={{color: 'red'}}>{errors.lastName}</p>}
            </div>

            <div>
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                /><label style={{color: 'red'}}>*</label>
                {errors.email && <p style={{color: 'red'}}>{errors.email}</p>}
            </div>

            <div>
                <label htmlFor="password">Password:</label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                /><label style={{color: 'red'}}>*</label>
                {errors.password && <p style={{color: 'red'}}>{errors.password}</p>}
            </div>

            <button type="submit">Register</button>
        </form>
    </div>
    );
};

export default RegistrationPage;