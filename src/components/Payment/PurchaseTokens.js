import React, { useState } from 'react';
import axios from 'axios';

const PurchaseTokens = () => {
    const [phone, setPhone] = useState('');

    const handlePurchase = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.post('https://demoinvestorbackend.onrender.com/api/payment/purchase', { phone }, {
                headers: { 'x-auth-token': token }
            });
            window.location.href = res.data.paymentResponse.redirectUrl;
        } catch (error) {
            console.error(error.response.data.message);
        }
    };

    return (
        <div>
            <h1>Purchase Tokens</h1>
            <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
            />
            <button onClick={handlePurchase}>Purchase Tokens</button>
        </div>
    );
};

export default PurchaseTokens;
