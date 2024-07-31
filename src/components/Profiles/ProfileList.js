import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ProfileList.css'; // Import the CSS file

const ProfileList = () => {
    const [profiles, setProfiles] = useState([]);
    const [tokens ,setTokens]=useState("")
    useEffect(() => {
        const fetchProfiles = async () => {
            const token = localStorage.getItem('token');
            const res = await axios.get('https://demoinvestorbackend.vercel.app/api/profiles', {
                headers: { 'x-auth-token': token }
            });
            setProfiles(res.data);
        };
        fetchProfiles();
    }, []);
    useEffect(() => {
        const fetchTokensAndProfile = async () => {
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user'));
            console.log(user._id)
            try {
                // First API call to fetch tokens
                const tokenRes = await axios.get(`https://demoinvestorbackend.vercel.app/api/tokens/${user._id}`, {
                    headers: { 'x-auth-token': token }
                });
                setTokens(tokenRes.data.tokens);

                // Second API call to access profile
             
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchTokensAndProfile();
    }, []);

    return (
        <div className="profile-container">
        <div>Tokens-{tokens?tokens:0}</div>
        <div><Link to="/subscription">Take Subscription</Link></div>
            <h1>Business Tycoons</h1>
            <ul className="profile-list">
                {profiles.map(profile => (
                    <li key={profile._id} className="profile-card">
                        <h1>{profile.name}</h1>
                        <div className="blurred-content">
                        </div>
                        <button className="unlock-button"><Link style={{textDecoration:"none" , color:"white"}} to={`/profile/${profile._id}`}>Unlock</Link></button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProfileList;
