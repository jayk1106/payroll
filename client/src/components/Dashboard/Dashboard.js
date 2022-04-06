import {Statistic} from 'antd';
import ListView from '../UI/List/ListView';
import './Dashboard.css';

const Dashboard = () => {
    return(
        <> 
        <div className='main-layout__heading'>Dashboard</div>
        <div className="main-layout__content__container">
            <div className="statistic-container">
                <div className="statistic">
                <Statistic title="Total Employees" value={20} />
                </div>
                <div className="statistic">
                <Statistic title="Pending Requests" value={9} />
                </div>
                <div className="statistic">
                <Statistic title="Pending Salary" value={0} />
                </div>
                <div className="statistic">
                <Statistic title="Paid Salary" value={112893} />
                </div>
            </div>
            <div className="list-container">
                <div className="list">
                    <ListView />
                </div>
                <div className="list">
                    <ListView />
                </div>
            </div>
        </div>
        </>
    )
}

export default Dashboard;