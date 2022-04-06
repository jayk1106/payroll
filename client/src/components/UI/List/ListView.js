import React from 'react';
import { List, Avatar, Button } from 'antd';
import style from './ListView.module.css';

const ListView = (props) => {
    const data = [
        {
            id : 1,
            name : 'Jay Kaneriya',
            email : 'kaneriyajay3@gmail.com',
        },
        {
            id : 2,
            name : 'Jay Kaneriya',
            email : 'kaneriyajay3@gmail.com',
        },
        {
            id : 3,
            name : 'Digvijay Chauhan',
            email : 'ddchauhan610@gmail.com'
        }
    ]
    return (
        <div className={style.container}>
            <div className={style.label}>Latest Employees</div>
            <List 
            dataSource={data}
            renderItem={item =>(
                <List.Item key={item.id}>
                <List.Item.Meta
                    avatar={<Avatar>{item.name[0].toUpperCase()}</Avatar>}
                    title={<a href="https://ant.design">{item.name}</a>}
                    description={item.email}
                />
                </List.Item>
            )}
            />
            <div className="action"><Button type="text">View More &#8594;</Button></div>
        </div>
    )
}

export default ListView;