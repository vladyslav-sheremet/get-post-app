import { Button } from '../Button/Button'

import './Hero.scss'

export const Hero = () => (
        <section className='hero'>
            <div className='container'>
                <div className='hero-wrapper'>
                    <div className='hero-inner-wrapper'>
                        <h1 className='title hero-title'>Test assignment for front-end developer</h1>
                        <p className='text hero-text'>What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</p>
                        <Button text='Sign up' href="#form" />
                    </div>
                </div>
            </div>
        </section>
)