'use client';

import React, { useEffect, useState } from 'react';
import ShulService from '../../services/shulService'; // Import the service

// Define the type for the Shul data
interface Shul {
    id: string; // Adjust the type and fields based on your actual data structure
    name: string;
}

const ShulComponent: React.FC = () => {
    const [shuls, setShuls] = useState<Shul[]>([]); // Use a typed state
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await ShulService.fetchShuls();
                setShuls(data); // Ensure `data` matches the expected `Shul[]` structure
            } catch (err) {
                setError('Failed to fetch Shuls');
                console.error(err); // Log the error for debugging purposes
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>; // Improve error display
    }

    return (
        <div>
            <h1>Shuls</h1>
            <ul>
                {shuls.map((shul) => (
                    <li key={shul.id}>{shul.name}</li> // Adjust rendering based on your data
                ))}
            </ul>
        </div>
    );
};

export default ShulComponent;
