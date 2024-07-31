import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProfileList from './components/Profiles/ProfileList';
import ProfileDetails from './components/Profiles/ProfileDetails';
import PurchaseTokens from './components/Payment/PurchaseTokens';
import PrivateRoute from './PrivateRoute';
import Subscription from './components/Subscription/subscription';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
                <Route path="/register" element={<Register />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/subscription" element={<Subscription />} />
                    <Route path="/" element={<ProfileList />} />
                    <Route path="/profile/:id" element={<ProfileDetails />} />
                    <Route path="/purchase-tokens" element={<PurchaseTokens />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
