import { Routes, Route } from 'react-router-dom';

import Home from "../pages/home/home";
import Details from "../pages/details/details";
import Library from "../pages/library/library";
import Profile from "../pages/profile/profile";
import Login from "../pages/login/login";

import Layout from "../layout/Layout";

const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index path="/" element={<Home />}/>
                    <Route path="/details" element={<Details />}/>
                    <Route path="/library" element={<Library />}/>
                    <Route path="/profile" element={<Profile />}/>
                    <Route path="/login" element={<Login />}/>
                </Route>
            </Routes>
        </>
    );
};

export default Router;