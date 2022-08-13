import React, { AriaAttributes, DOMAttributes } from 'react'
import { DeepPartial, FieldError, FieldValues, Mode, Resolver, UseFormRegisterReturn } from 'react-hook-form'
import './Input.scss'

interface InputPropsTest {
    // placeholder?: string
    // type: string
    // inputHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void
    // name?: string
    // value?: string
    // id?: string
    error?: boolean
    errorMessage?: string
    text?: string
    fileName?: string
    fileHandler?: (event: any) => void
}

type InputProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> & InputPropsTest;



export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => (
    <>
        {props.type === 'file' ? (
            <label className='file' htmlFor="file" onChange={props.fileHandler}>
                <input
                    id='file'
                    style={{ display: 'none' }}
                    ref={ref}
                    {...props}
                />
                <div className='file-upload'>Upload</div>
                <div className={`file-text${props.fileName && ' active'}`}>{props.fileName ? props.fileName : 'Upload your photo'}</div>
            </label>
        ) : (
            <div className={props.text && ' input-radio-wrapper'}>
                <div className='input-wrapper'>
                    <input
                        className={`input${props.error ? ' input-error' : ''}`}
                        ref={ref}
                        {...props}
                    />
                    {props.error && <p className='error'>{props.errorMessage}</p>}
                </div>
                {props.text && <p>{props.text}</p>}
            </div>
        )}
    </>


))