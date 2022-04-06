import style from './Icon.module.css';

const Icon = props => {
    return(
        <div className={`${style.icon} ${props.active ? style.active : ''}`}>{props.children}</div>
    )
}

export default Icon;