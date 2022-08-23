import React from "react";

import { InputProps } from "./interfaces";

import "./Input.scss";

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        { type, text, error, errorMessage, fileName, fileHandler, ...rest },
        ref
    ) => (
        <>
            {type === "file" ? (
                <label
                    className={`file${error ? " input-error" : ""}`}
                    htmlFor="file"
                >
                    <input
                        type={type}
                        id="file"
                        style={{ opacity: 0, width: 0, height: 0 }}
                        ref={ref}
                        {...rest}
                        onChange={fileHandler}
                    />
                    <div className="file-upload">Upload</div>
                    {error && <p className="error">{errorMessage}</p>}
                    <div className={`file-text${fileName && " active"}`}>
                        {fileName ? fileName : "Upload your photo"}
                    </div>
                </label>
            ) : (
                <div className={text && "input-radio-wrapper"}>
                    <div className="input-wrapper">
                        <input
                            type={type}
                            className={`input${error ? " input-error" : ""}`}
                            ref={ref}
                            {...rest}
                        />
                        {error && <p className="error">{errorMessage}</p>}
                    </div>
                    {text && <p>{text}</p>}
                </div>
            )}
        </>
    )
);

export default Input;
