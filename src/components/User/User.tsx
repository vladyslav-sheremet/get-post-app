import { IUser } from '../../models'
import './User.scss'

interface UserProps {
    user: IUser
}

export const User = ({user}: UserProps) => {
    return (
        <div className='user'>
            <img className='user-img' src={user.photo} alt={user.name} />
            <p>{user.name}</p>
            <div className="user-text-wrapper">
                <p>{user.position}</p>
                <p>{user.email}</p>
                <p>{user.phone}</p>
            </div>
        </div>
    )
}