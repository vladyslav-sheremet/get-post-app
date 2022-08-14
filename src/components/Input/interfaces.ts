import { FieldError } from "react-hook-form";

interface InputPropsCustom {
    error?: boolean | FieldError;
    errorMessage?: string;
    text?: string;
    fileName?: string;
    fileHandler?: (event: any) => void;
}

export type InputProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> &
    InputPropsCustom;
