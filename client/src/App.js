// import { Layout, Menu, Statistic } from 'antd';
// import { WalletOutlined, UserOutlined, TeamOutlined, LoginOutlined , DashboardOutlined, LineChartOutlined, StockOutlined, SwapOutlined } from '@ant-design/icons';
import "./App.css";
import "antd/dist/antd.css";
// import ListView from './components/UI/List/ListView';
// import Icon from './components/UI/Icon/Icon';
import Employees from "./components/Employees/Employees";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import CreateOrganization from "./components/Organization/CreateOrganization";
import UserProfile from "./components/Profile/UserProfile";
import Requests from "./components/Request/Requests";
// const { Content, Footer, Sider } = Layout;
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import authContext from "./context/auth/authContext";
import MainLayout from "./components/UI/MainLayout/MainLayout";

function App() {
  const { isLoggedIn } = useContext(authContext);
  const URL = process.env.REACT_APP_API_URL;
  console.log(URL);
  return (
    <>
      <Routes>
        <Route path="login" element={<Login api_url={URL} employeeLogin={false} />} />
        <Route path="signup" element={<Signup api_url={URL}/>} />

        <Route
          path="login/:orgId"
          element={
            <Login api_url={URL}  employeeLogin={true}/>
          }
        />

        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="create-organization"
          element={
            isLoggedIn ? (
              <CreateOrganization />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="employees"
          element={
            isLoggedIn ? (
              <MainLayout>
                <Employees api_url={URL} />
              </MainLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="employees/:employeeId"
          element={
            isLoggedIn ? (
              <MainLayout>
                <UserProfile api_url={URL} />
              </MainLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="dashboard"
          element={
            isLoggedIn ? (
              <MainLayout>
                <Dashboard />
              </MainLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="requests"
          element={
            isLoggedIn ? (
              <MainLayout>
                <Requests api_url={URL} />
              </MainLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>

      {/* <MainLayout>
      <Employees/>
    </MainLayout> */}
    </>
  );
}

export default App;
