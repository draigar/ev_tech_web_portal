import React from 'react'
import { config } from 'web/store'

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6">
                        {new Date().getFullYear()} © {config.AppName}.
                    </div>
                    <div className="col-sm-6">
                        <div className="text-sm-end d-none d-sm-block">
                            Design & Develop by Astutia Technologies
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
