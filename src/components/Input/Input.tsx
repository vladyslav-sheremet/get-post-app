import React from 'react'

import './Input.scss'

interface InputPropsCustom {
    error?: boolean
    errorMessage?: string
    text?: string
    fileName?: string
    fileHandler?: (event: any) => void
}

type InputProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> & InputPropsCustom;



export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const {error, errorMessage, fileName, fileHandler, ...rest} = props
    return (
        <>
            {props.type === 'file' ? (
                <label className='file' htmlFor="file" onChange={props.fileHandler}>
                    <input
                        id='file'
                        style={{ display: 'none' }}
                        ref={ref}
                        {...rest}
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
                            {...rest}
                        />
                        {props.error && <p className='error'>{props.errorMessage}</p>}
                    </div>
                    {props.text && <p>{props.text}</p>}
                </div>
            )}
        </>
    )

})