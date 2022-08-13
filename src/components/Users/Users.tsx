import { Button } from '../Button/Button'
import { User } from '../User/User'
import { useFetchData } from '../../hooks/useFetchData'

import './Users.scss'
import { useEffect } from 'react'

export const Users = () => {
    const {data, error, loading, changePage} = useFetchData()
    const clickHandler = () => {
        changePage()
    }

    return (
        <section className='users' id='users'>
            <div className="container">
                <div className="users-wrapper">
                    <h2 className='title'>Working with GET request</h2>
                    <div className="users-inner-wrapper">
                        {data.map(user => <User key={user.id} user={user} />)}
                    </div>
                    <Button center text='Show more' showMore={clickHandler} />
                </div>
            </div>
        </section>
    )
}