import { List, Avatar} from 'antd';

const ListItem = props => {
    <List.Item key={props.id}>
                <List.Item.Meta
                    avatar={<Avatar>{props.name[0].toUpperCase()}</Avatar>}
                    title={<a href="https://ant.design">{props.name}</a>}
                    description={props.email}
                />
    </List.Item>
}

export default ListItem;