import React from 'react'
import './Input.scss'

interface InputProps {
    placeholder?: string
    type: string
    inputHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void
    name?: string
    value?: string
    id?: string
    error?: string
}

export const Input = ({ placeholder, type, inputHandler, name, value, id, error }: InputProps) => {
    return (
        <div className="input-wrapper">
            <input
                className={`input${error ? ' input-error' : ''}`}
                type={type}
                placeholder={placeholder}
                onChange={inputHandler}
                name={name}
                value={value}
                id={id}
            />
            <p className='error'>{error}</p>
        </div>
    )
}