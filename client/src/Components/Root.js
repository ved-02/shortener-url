import React from 'react'
import { Link } from 'react-router-dom'

export default function Root() {
    return (
        <div className='container d-flex flex-column justify-content-center align-items-center'>
            <div className='container d-flex flex-column bd-highlight mb-3 my-5 justify-content-center align-items-center"'>
                <h3 className='display-4 text-center'>Welcome to shorten URL</h3>
                <h5 className='text-center'>Now get rid of those long URLs.</h5>
                <p className='text-center'>Register yourself with us to customize your URLs.</p>
                <p className='text-center'>You will also get to see information about how your URL is performing on our Dashboard.</p>
                <div className="d-flex p-2 bd-highlight justify-content-center my-4">
                    <button type="button" className="btn btn-primary btn-lg mx-4">
                        <Link to="/register" style={{ color: "white", textDecoration: "none" }}>Register</Link>
                    </button>
                    <button type="button" className="btn btn-primary btn-lg mx-4">
                        <Link to="/login" style={{ color: "white", textDecoration: "none" }}>Login</Link>
                    </button>
                </div>
                <h5>Lets see what our app can do:</h5>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Short URL</th>
                            <th scope="col">Long URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th><a href={`http://smolurl.herokuapp.com/ved`}>http://smolurl.herokuapp.com/ved</a></th>
                            <th>https://www.linkedin.com/in/ved-prakash-t-40a421200/</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
