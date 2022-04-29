// import { Layout, Menu, Statistic } from 'antd';
// import { WalletOutlined, UserOutlined, TeamOutlined, LoginOutlined , DashboardOutlined, LineChartOutlined, StockOutlined, SwapOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import './App.css';
import 'antd/dist/antd.css';
// import ListView from './components/UI/List/ListView';
// import Icon from './components/UI/Icon/Icon';
import Organization from './components/Organization/Organization';
import Employees from './components/Employees/Employees';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import CreateOrganization from './components/Organization/CreateOrganization';
import UserProfile from './components/Profile/UserProfile';
import Requests from './components/Request/Requests';
import AddRequest from './components/Request/AddRequest';
import Profile from './components/Profile/Profile';
import Salary from './components/Salary/Salary';
import Activity from './components/Activity/Activity';
import Deduction from './components/Deduction/Deduction';
import DeductionDetail from './components/Deduction/DeductionDetail';
import PageNotFound from './components/Error/PageNotFound';
// const { Content, Footer, Sider } = Layout;
import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';

import authContext from './context/auth/authContext';
import MainLayout from './components/UI/MainLayout/MainLayout';

function App() {
  const { isLoggedIn, isAdmin, isUser } = useContext(authContext);
  const URL = process.env.REACT_APP_API_URL;

  if ((isAdmin === null || isUser === null) && isLoggedIn) {
    return (
      <>
        <Spin />
      </>
    );
  }
  return (
    <>
      <Routes>
        <Route
          path="login"
          element={<Login api_url={URL} employeeLogin={false} />}
        />
        <Route path="signup" element={<Signup api_url={URL} />} />

        <Route
          path="login/:orgId"
          element={<Login api_url={URL} employeeLogin={true} />}
        />
        <Route path="login" element={<Login api_url={URL} />} />
        <Route path="signup" element={<Signup api_url={URL} />} />
        <Route
          path="/"
          element={
            isLoggedIn ? (
              isAdmin || isUser ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/activity" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="organization"
          element={
            isLoggedIn ? (
              <MainLayout>
                <Organization api_url={URL} />
              </MainLayout>
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
          path="employees/:employeeId/deduction"
          element={
            isLoggedIn ? (
              <MainLayout>
                <Deduction api_url={URL} />
              </MainLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="profile"
          element={
            isLoggedIn ? (
              <MainLayout>
                <Profile api_url={URL} />
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
              isAdmin ? (
                <MainLayout>
                  <Dashboard api_url={URL} />
                </MainLayout>
              ) : (
                <MainLayout>
                  <PageNotFound />
                </MainLayout>
              )
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

        <Route
          path="requests/add-request"
          element={
            isLoggedIn ? (
              <MainLayout>
                <AddRequest api_url={URL} />
              </MainLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="salary"
          element={
            isLoggedIn ? (
              <MainLayout>
                <Salary api_url={URL} />
              </MainLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="activity"
          element={
            isLoggedIn ? (
              !isAdmin && !isUser ? (
                <MainLayout>
                  <Activity api_url={URL} />
                </MainLayout>
              ) : (
                <Navigate to="/dashboard" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="deductions"
          element={
            isLoggedIn ? (
              <MainLayout>
                <DeductionDetail api_url={URL} />
              </MainLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="*"
          element={
            isLoggedIn ? (
              <MainLayout>
                <PageNotFound />
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
