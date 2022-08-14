import { Button } from '../Button/Button'

import './Header.scss'

export const Header = () => (
        <header className='header'>
            <div className='container'>
                <div className="header-wrapper">
                    <a href="#"><img src="./logo.svg" alt="logo" /></a>
                    <div className="buttons-wrapper">
                        <Button text='Users' href="#users" />
                        <Button text='Sign up' href="#form" />
                    </div>
                </div>
            </div>
        </header>
)