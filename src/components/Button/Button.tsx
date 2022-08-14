import React from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll'

import './Button.scss'

interface ButtonProps {
    text: string
    href?: string
    showMore?: (event: React.MouseEvent) => void
    typeSubmit?: boolean
    center?: boolean
    disable?: boolean
}

export const Button = ({ text, href, showMore, typeSubmit, center, disable }: ButtonProps) => (
        <>

            {href ? (<AnchorLink className='link' href={href}>{text}</AnchorLink>)
                : showMore ? <button className={`button${center ? ' center' : ''}`} onClick={showMore}>{text}</button>
                : <button type={typeSubmit ? 'submit' : 'button'} className={`button${center ? ' center' : ''}`} disabled={disable}>{text}</button>}
        </>
)