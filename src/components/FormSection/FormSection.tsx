import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IUser } from '../../models'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'
import './FormSection.scss'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useFetchData } from '../../hooks/useFetchData'

const formData = new FormData()

export const FormSection = () => {
    const [fileName, setFileName] = useState('')
    const [nameError, setnameError] = useState('')
    const [emailError, setemailError] = useState('')
    const [disable, setDisable] = useState(true)

    const addUser = useFetchData()[3]

    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        reset,
    } = useForm<IUser>({
        mode: 'onBlur'
    })

    const fileHandler = (event: any) => {
        console.log(event.target.files[0].name)
        formData.append('photo', event.target.files[0])
        setFileName(event.target.files[0].name)
    }

    const nameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const e = event.target.value
        if (e.length < 2 || e.length > 60) {
            setnameError('Username should contain 2-60 characters')
            setDisable(true)
        } else {
            formData.append('name', e)
            setDisable(false)
            setnameError('')
        }
    }

    const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        formData.append('email', event.target.value)
    }

    const phoneHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        formData.append('phone', event.target.value)
    }

    const professionHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
        formData.append('position_id', event.target.value)
    }

    const submitHandler: SubmitHandler<IUser> = async (data) => {
        // event.preventDefault()
        alert(JSON.stringify(data))
        console.log(data)
        console.log('start', formData)

        formData.append('name', data.name)
        formData.append('email', data.email)
        formData.append('phone', data.phone)
        formData.append('position_id', data.position_id)
        formData.append('photo', data.photo[0])

        console.log('photo', data.photo[0])
        console.log('end', formData)

        reset()
        console.log('it should be visible only when all is ok!')
        const responseToken = await axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/token')
        const token = responseToken.data.token
        const response = await axios.post('https://frontend-test-assignment-api.abz.agency/api/v1/users', formData, { headers: { 'Token': token } })
        addUser(response.data)
    }
    return (
        <section className='section-form' id='form'>
            <div className="container">
                <h2 className="title section-form-title">Working with POST request</h2>
                <form className='form' onSubmit={handleSubmit(submitHandler)}>
                    <input
                        {...register('name', {
                            required: true,
                            minLength: 2,
                            maxLength: 60
                        })}
                        type='text'
                    />
                    <div>
                        {errors?.name && <p>Username should contain 2-60 characters</p>}
                    </div>

                    <input
                        {...register('email', {
                            required: true,
                            minLength: 2,
                            maxLength: 100,
                            pattern: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
                        })}
                        type='email'
                    />
                    <div>
                        {errors?.email && <p>User email, must be a valid email according to RFC2822</p>}
                    </div>

                    <input
                        {...register('phone', {
                            required: true,
                            minLength: 2,
                            maxLength: 100,
                            pattern: /^[\+]{0,1}380([0-9]{9})$/
                        })}
                        type='phone'
                    />
                    <div>
                        {errors?.phone && <p>Number should start with code of Ukraine +380</p>}
                    </div>

                    <input
                        {...register('position_id', {
                            required: true,
                        })}
                        type='radio'
                        value='1'
                    />
                    <input
                        {...register('position_id', {
                            required: true,
                        })}
                        type='radio'
                        value='2'
                    />
                    <input
                        {...register('position_id', {
                            required: true,
                        })}
                        type='radio'
                        value='3'
                    />
                    <input
                        {...register('position_id', {
                            required: true,
                        })}
                        type='radio'
                        value='4'
                    />
                    <div>
                        {errors?.position_id && <p>Number should start with code of Ukraine +380</p>}
                    </div>

                    <input
                        {...register('photo', {
                            required: true,
                        })}
                        type='file'
                    />
                    <div>
                        {errors?.photo && <p>Number should start with code of Ukraine +380</p>}
                    </div>
                    <button type='submit' disabled={!isValid}>Sign up</button>
                </form>
            </div>
        </section>
    )
}