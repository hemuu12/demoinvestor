import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './subscription.css'; // Import the CSS file

const Subscription = () => {
    const [tokens, setTokens] = useState(0);
    const [subscriptions] = useState([
        { price: 1000, tokens: 1 },
        { price: 2000, tokens: 2 },
        { price: 5000, tokens: 5 },
    ]);

    useEffect(() => {
        const fetchUserTokens = async () => {
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user'));
            try {
                const tokenRes = await axios.get(`https://demoinvestorbackend.onrender.com/api/tokens/${user._id}`, {
                    headers: { 'x-auth-token': token }
                });
            setTokens(tokenRes.data.tokens);
            } catch (error) {
                console.error('Error fetching tokens:', error);
            }
        };
        fetchUserTokens();
    }, []);

    const handleSubscription = async (price, tokens) => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        try {
            const response = await axios.post('https://demoinvestorbackend.onrender.com/api/payment/purchase', { price }, {
                headers: { 'x-auth-token': token }
            });
            if (response.status === 200) {
                window.location.href = response.data.paymentRequest.url; // Redirect to PayU payment page
            }
            alert('Subscription successful! You have purchased ' + tokens + ' tokens.');
        } catch (error) {
            console.error('Error during payment:', error);
            const tokenRes = await axios.get(`https://demoinvestorbackend.onrender.com/api/tokens/${user._id}`, {
                headers: { 'x-auth-token': token }
            });
        setTokens(tokenRes.data.tokens);
            alert('Subscription successful! You have purchased');
        }
    };

    return (
        <div className="subscription-container">
            <h2>Subscription Plans</h2>
            <div className="subscriptions">
                {subscriptions.map((subscription, index) => (
                    <div key={index} className="subscription-card">
                        <h3>₹{subscription.price}</h3>
                        <p>{subscription.tokens} Token{subscription.tokens > 1 ? 's' : ''}</p>
                        <button onClick={() => handleSubscription(subscription.price, subscription.tokens)}>
                            Subscribe
                        </button>
                    </div>
                ))}
            </div>
            <h3>Your Tokens: {tokens}</h3>
        </div>
    );
};

export default Subscription;
