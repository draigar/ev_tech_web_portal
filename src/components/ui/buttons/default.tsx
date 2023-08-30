import React, { CSSProperties } from 'react'

interface DefaultButtonProps {
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    isLoading?: boolean;
    isLoadingText?: string;
    isDisabled?: boolean;
    children: any;
    style?: CSSProperties;
}

export const DefaultButton = (props: DefaultButtonProps) => {
    const { children, className, isDisabled, isLoading, isLoadingText = '', onClick, type, style } = props;

    return (
        <button type={type} onClick={onClick}
            className={`btn ${className}`} style={style} disabled={isLoading ? true : isDisabled}>{isLoading && isLoadingText !== '' ? 
            isLoadingText : isLoading && isLoadingText === '' ? 'Loading...' : children}</button>
    )
}
