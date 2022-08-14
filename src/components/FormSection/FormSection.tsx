import { useState } from 'react'
import axios from 'axios'
import { SubmitHandler, useForm } from 'react-hook-form'

import { IUser } from '../../models'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'
import { useFetchData } from '../../hooks/useFetchData'

import './FormSection.scss'

const formData = new FormData()

export const FormSection = () => {
    const [fileName, setFileName] = useState('')

    const {addUser} = useFetchData()

    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        reset,
    } = useForm<IUser>({
        mode: 'onBlur'
    })

    const fileHandler = (event: any) => {
        setFileName(event.target.files[0].name)
    }

    const submitHandler: SubmitHandler<IUser> = async (data) => {
        alert(JSON.stringify(data))

        formData.append('name', data.name)
        formData.append('email', data.email)
        formData.append('phone', data.phone)
        formData.append('position_id', data.position_id)
        formData.append('photo', data.photo[0])

        reset()
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
                    <Input
                        placeholder='Your name'
                        type='text'
                        error={!!errors?.name}
                        errorMessage='Username should contain 2-60 characters'
                        {...register('name', {
                            required: true,
                            minLength: 2,
                            maxLength: 60
                        })}
                    />
                    <Input
                        placeholder='Email'
                        type='email'
                        error={!!errors?.email}
                        errorMessage='User email, must be a valid email according to RFC2822'
                        {...register('email', {
                            required: true,
                            minLength: 2,
                            maxLength: 100,
                            pattern: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
                        })}
                    />
                    <Input
                        placeholder='Phone'
                        type='phone'
                        error={!!errors?.phone}
                        errorMessage='+38 (XXX) XXX - XX - XX'
                        {...register('phone', {
                            required: true,
                            pattern: /^[\+]{0,1}380([0-9]{9})$/
                        })}
                    />
                    <p className='form-text'>Select your position</p>
                    <Input
                        type='radio'
                        value='1'
                        text='Frontend developer'
                        {...register('position_id', {
                            required: true,
                        })}
                    />
                    <Input
                        type='radio'
                        value='2'
                        text='Backend developer'
                        {...register('position_id', {
                            required: true,
                        })}
                    />
                    <Input
                        type='radio'
                        value='3'
                        text='Designer'
                        {...register('position_id', {
                            required: true,
                        })}
                    />
                    <Input
                        type='radio'
                        value='4'
                        text='QA'
                        {...register('position_id', {
                            required: true,
                        })}
                    />
                    <Input
                        type='file'
                        fileName={fileName}
                        fileHandler={fileHandler}
                        {...register('photo', {
                            required: true,
                        })}
                    />
                    <Button disable={!isValid} center typeSubmit text='Sign up' />
                </form>
            </div>
        </section>
    )
}