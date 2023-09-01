export const ErrorFallback = (props: {error: Error; resetErrorBoundary: () => void}) => {
    return (
        <div className="d-flex flex-column flex-1 justify-content-center align-items-center" style={{height: 'vh'}}>
            <h1>Process error</h1>
            <p>An error occurred!</p>
            <p>{props.error.message}</p>
            <button onClick={() => props.resetErrorBoundary()}>Refresh Process</button>
        </div>
    )
}