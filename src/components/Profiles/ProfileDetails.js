import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProfileDetails = ({ match }) => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');
    const [tokens , setTokens]=useState("")
    const params =useParams()
    console.log(params)

    useEffect(() => {
        const fetchTokensAndProfile = async () => {
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user'));
            try {
                // First API call to fetch tokens
                const tokenRes = await axios.get(`https://demoinvestorbackend.onrender.com/api/tokens/${user._id}`, {
                    headers: { 'x-auth-token': token }
                });
                setTokens(tokenRes?.data.tokens);
                    console.log(tokens,"111111111111111",params._id)
                // Second API call to access profile
                const profileRes = await axios.post(`https://demoinvestorbackend.onrender.com/api/profiles/access/${params.id}`, {tokens:tokenRes?.data.tokens},  {
                    headers: { 'x-auth-token': token }
                });
                setProfile(profileRes.data.details);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.response ? error.response.data.message : 'An error occurred');
            }
        };
        fetchTokensAndProfile();
    }, [params.id ,tokens]);

    if (error) return <div>{error}</div>;
    if (!profile) return <div>Loading...</div>;

    return (
        <div>
            <h1>{profile.address}</h1>
            <p>{profile.companyName}</p>
        </div>
    );
};

export default ProfileDetails;
