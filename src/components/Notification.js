import React, { useState, useEffect } from 'react';

// Notification component
const Notification = ({ message, type }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false); // Hide the notification after 5 seconds
        }, 5000);

        // Cleanup timer when the component is unmounted
        return () => clearTimeout(timer);
    }, []);
    if (!isVisible) return null;

    return (
        <div
            className={`fixed top-32 right-4 p-4 rounded-lg shadow-lg ${type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                } text-white`}
        >
            <span>{message}</span>
        </div>
    );
};

export default Notification;
