import React, { CSSProperties } from 'react'

interface IconButtonProps {
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    isLoading?: boolean;
    isLoadingText?: string;
    isDisabled?: boolean;
    children?: any;
    iconPosition?: 'left' | 'right';
    icon?: any;
}

export const IconButton = (props: IconButtonProps) => {
    const { children, className, isDisabled, isLoading, isLoadingText = '', onClick, type, icon, iconPosition } = props;

    return (
        // <button className="btn btn-outline-primary btn-load">
        //     <span className="d-flex align-items-center">
        //         <span className="flex-grow-1 me-2">
        //             Loading...
        //         </span>
        //         <span className="spinner-border flex-shrink-0" role="status">
        //             <span className="visually-hidden">Loading...</span>
        //         </span>
        //     </span>
        // </button>
        <button type={type} onClick={onClick}
            className={`btn ${className}`} disabled={isLoading ? true : isDisabled}>  {isLoading && isLoadingText !== '' ? 
            isLoadingText : isLoading && isLoadingText === '' ? 'Loading...' : children}</button>
    )
}
