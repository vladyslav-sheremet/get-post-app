import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IUser } from '../../models'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'
import './FormSection.scss'

const formData = new FormData()

interface FormSectionProps {
    onCreate: (user: IUser) => void
}

export const FormSectionOld = ({ onCreate }: FormSectionProps) => {
    const [fileName, setFileName] = useState('')
    const [nameError, setnameError] = useState('')
    const [emailError, setemailError] = useState('')
    const [disable, setDisable] = useState(true)

    const fileHandler = (event: any) => {
        console.log(event.target.files[0].name)
        formData.append('photo', event.target.files[0])
        console.log('photo', event.target.files[0])
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
        // const e = event.target.value

        // const validate = (e: string) => {
        //     const re = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$)/
        //     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        //     return re.test(String(e).toLowerCase())
        // }
        // if (validate(e)) {
        //     setemailError('User email, must be a valid email according to RFC2822')
        //     setDisable(true)
        // } else {
        //     formData.append('email', e)
        //     setDisable(false)
        //     setemailError('')
        // }

        formData.append('email', event.target.value)
    }

    const phoneHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        formData.append('phone', event.target.value)
    }

    const professionHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
        formData.append('position_id', event.target.value)
    }

    const submitHandler = async (event: React.FormEvent) => {
        // setError('')
        event.preventDefault()
        const responseToken = await axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/token')
        const token = responseToken.data.token
        console.log(formData)
        const response = await axios.post('https://frontend-test-assignment-api.abz.agency/api/v1/users', formData, { headers: { 'Token': token } })
        onCreate(response.data)

    }
    return (
        <section className='section-form' id='form'>
            <div className="container">
                <h2 className="title section-form-title">Working with POST request</h2>
                <form className='form' onSubmit={submitHandler}>
                    <Input error={nameError} type='text' placeholder='Your name' inputHandler={nameHandler} />
                    <Input error={emailError} type='email' placeholder='Email' inputHandler={emailHandler} />
                    <Input type='phone' placeholder='Phone' inputHandler={phoneHandler} />
                    <p className='form-text'>Select your position</p>
                    <div className="section-form-inner">
                        <Input type="radio" name='profession' value='1' inputHandler={professionHandler} id='profession1' />
                        <label htmlFor="profession1"></label>
                        <p>Frontend developer</p>
                    </div>
                    <div className="section-form-inner">
                        <Input type="radio" name='profession' value='2' inputHandler={professionHandler} />
                        <p>Backend developer</p>
                    </div>
                    <div className="section-form-inner">
                        <Input type="radio" name='profession' value='4' inputHandler={professionHandler} />
                        <p>Designer</p>
                    </div>
                    <div className="section-form-inner">
                        <Input type="radio" name='profession' value='4' inputHandler={professionHandler} />
                        <p>QA</p>
                    </div>
                    <label className='file' htmlFor="file" onChange={fileHandler}>
                        <input type="file" id='file' style={{ display: 'none' }} />
                        <div className='file-upload'>Upload</div>
                        <div className={`file-text${fileName && ' active'}`}>{fileName ? fileName : 'Upload your photo'}</div>
                    </label>
                    <Button disable={disable} center typeSubmit text='Sign up' />
                </form>
            </div>
        </section>
    )
}