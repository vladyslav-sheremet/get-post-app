export interface ButtonProps {
    text: string;
    href?: string;
    showMore?: (event: React.MouseEvent) => void;
    typeSubmit?: boolean;
    center?: boolean;
    disable?: boolean;
}
