import React from 'react'

export default function Footer() {
    return (
        <div className="container">
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <div className="col-md-4 d-flex align-items-center">
                    <span className="text-muted">Made by Ved</span>
                </div>

                <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                    <li className="ms-3"><a className="text-muted" href="https://www.linkedin.com/in/ved-prakash-t-40a421200/">Linkedin</a></li>
                    <li className="ms-3"><a className="text-muted" href="https://github.com/ved-02">GitHub</a></li>
                    <li className="ms-3"><a className="text-muted" href="https://twitter.com/veedTiwari">Twitter</a></li>
                </ul>
            </footer>
        </div>
    )
};