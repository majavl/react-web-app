import React, { useState, useEffect } from 'react';
import { getToken } from "../utils/auth";
import LogoutButton from "./LogoutButton";

const HomePage: React.FC = () => {
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await fetch('http://localhost:3000/api/user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${getToken()}`,
                    }
                });
                const result = await userData.json();

                setFirstName(result.firstName);
                setLastName(result.lastName);
            } catch (error) {
                // handle error
            }
        };

        fetchData();

    }, []);

    return (
        <div>
            <h1>Welcome {firstName} {lastName}</h1>
            <div>
                <LogoutButton />
            </div>
        </div>
    );
};

export default HomePage;
