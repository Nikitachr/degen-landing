import { FC, PropsWithChildren } from 'react';

export interface ButtonProps {
    onClick?: () => void;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    outline?: boolean;
}


export const Button: FC<PropsWithChildren<ButtonProps>> = ({ children, disabled = false, onClick, type, outline }) => {
    return <button
        className={`w-full rounded-xl border-4 border-aqua py-4 px-3.5 ${outline ? 'bg-transparent text-white' : 'bg-aqua'} font-bold uppercase`}
        onClick={onClick} disabled={disabled} type={type}>{children}</button>
}
