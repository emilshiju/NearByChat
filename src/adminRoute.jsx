
import AdminLogin from "./pages/adminAuthenitcation/adminLogin"
import AdminHome from "./pages/AdminHome/adminHome"

import ListUsers from "./pages/AdminHome/listUsers"

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const AdminRoute=()=>{

    return (
        <Router>
            <Routes>
                <Route path="/" element={<AdminHome />}>
                    <Route path="admin/userslist" element={<ListUsers />} />
                </Route>
            </Routes>
        </Router>
    );
};



export default AdminRoute