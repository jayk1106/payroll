import { Avatar, Table} from 'antd';

const Employees = props => {
    const dataSource = [
        {
          key: '1',
          name: 'Mike',
          age: 32,
          salary: 1200000,
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          salary: 1200000,
        },
    ];
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render : value => {
            return <div>
                <Avatar>J</Avatar>
                Jay <br />
                kaneriyajay3@gmail.com
            </div>
          },
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Salary',
          dataIndex: 'salary',
          key: 'salary',
          render : value =>  `₹ ${value} PA`,
        },
    ];

    return(
        <>
            <div className='main-layout__heading'>Employees</div>
            <Table dataSource={dataSource} columns={columns} />
        </>
    )
}       
    
export default Employees;