import Image from 'next/image'
import { useState } from 'react'
import { useAuth } from 'web/hooks'
import { AuthLayout } from 'web/layouts'
import { config } from 'web/store'
import { AuthData, LoginAdminApiType, UserDataType, apiTypes } from 'web/types'

export default function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)

    const { Login } = useAuth();

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRememberMe(event.target.checked);
    };

    const DoLogin = (e: any) => {
        e.preventDefault();
        if (username === "" || password === "") {
            alert('Username and password are required')
        } else {
            const payload = {
                username,
                password,
            }

            Login.mutate(payload, {
                onSuccess: (val: apiTypes) => {
                    if (val.status) {
                        window.location.href = "/app";
                    }
                }
            })

        }
    }

    return (
        <AuthLayout title={'Login to ' + config.AppName}>
            <div>
                <div className="auth-one-bg-position auth-one-bg">
                    <div className="bg-overlay"></div>

                    <div className="shape">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 1440 120">
                            <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
                        </svg>
                    </div>
                </div>
                <div className="auth-page-content">
                    <div className="container">

                        <div className="row justify-content-center mt-8">
                            <div className="col-md-8 col-lg-6 col-xl-5">
                                <div className="card mt-5" style={{position: 'relative', top: 120, zIndex: 4}}>

                                    <div className="card-body p-4">
                                        <div className='d-flex w-full justify-content-center mb-4'>
                                            <a href="index.html" className="d-inline-block auth-logo">
                                                <Image src="/images/sterling-bank-plc.svg" alt="" width="120" height="120" />
                                            </a>
                                        </div>
                                        <div className="text-center mt-2">
                                            <h5 className="text-primary">Welcome Back !</h5>
                                            <p className="text-muted">Sign in to continue to {config.AppName}.</p>
                                        </div>
                                        <div className="p-2 mt-4">
                                            <form onSubmit={DoLogin}>

                                                <div className="mb-3">
                                                    <label htmlFor="username" className="form-label">Username</label>
                                                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" id="username" placeholder="Enter username" />
                                                </div>

                                                <div className="mb-3">
                                                    {/* <div className="float-end">
                                                <a href="auth-pass-reset-basic.html" className="text-muted">Forgot password?</a>
                                            </div> */}
                                                    <label className="form-label" htmlFor="password-input">Password</label>
                                                    <div className="position-relative auth-pass-inputgroup mb-3">
                                                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control pe-5 password-input" placeholder="Enter password" id="password-input" />
                                                        <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" id="password-addon"><i className="ri-eye-fill align-middle"></i></button>
                                                    </div>
                                                </div>

                                                {/* <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" checked={rememberMe} onChange={handleCheckboxChange} id="auth-remember-check" />
                                                    <label className="form-check-label" htmlFor="auth-remember-check">Remember me</label>
                                                </div> */}

                                                <div className="mt-4">
                                                    <button className="btn btn-success w-100" disabled={Login.isLoading} type="submit">{Login.isLoading ? 'Logging you in' : 'Sign In'}</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}
