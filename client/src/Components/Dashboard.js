import React, { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode"
import { useNavigate } from 'react-router-dom'

export default function Dashboard(props) {
    const [username, setUsername] = useState("");
    const [longURL, setlongURL] = useState("");
    const [shortURL, setShortURL] = useState("");
    const [url, setUrl] = useState([]);
    const getURLs = async (token) => {
        const response = await fetch("http://smolurl.herokuapp.com/api/url", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token
            })
        });
        const data = await response.json();
        return data;
    }
    const navigate = useNavigate()
    useEffect(async () => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = jwt_decode(token);
            if (!user) {
                localStorage.removeItem('token');
                props.showAlert("danger", "Please Login First");
                navigate("/login");
            }
            else {
                setUsername(user.username);
                const data = await getURLs(token);
                if (data.error) {
                    props.showAlert("danger", data.error);
                }
                else {
                    setUrl(data.urls);
                    // console.log(data.urls);
                }
            }
        }
        else {
            props.showAlert("danger", "Please Login First");
            navigate("/login");
        }
    }, [])
    const logOut = () => {
        localStorage.removeItem('token');
        props.showAlert("success", "Logged Out Successfully");
        navigate("/");
        return;
    }
    const addURL = async()=>{
        const token = localStorage.getItem('token');
        const response = await fetch("http://smolurl.herokuapp.com/api/url/add", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                longURL,
                shortURL,
                token
            })
        });
        const data = await response.json();
        if(data.error)
        {
            props.showAlert("danger", data.error);
        }
    }
    return (
        <div className='container'>
            <div className="d-flex p-2 bd-highlight justify-content-between">
                <div className="d-inline-flex p-2 bd-highlight ">
                    <h1 className='display-5'>Hello, {username}</h1>
                </div>
                <div className="d-inline-flex p-2 bd-highlight" style={{ height: "70px" }}>
                    <button type="button" className="btn btn-secondary" onClick={logOut}>Log Out</button>
                </div>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Short URL</th>
                        <th scope="col">Clicks</th>
                        <th scope="col">Long URL</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        url.map((url) => {
                            return (<tr key={url.shortURL}>
                                <th><a href={`http://smolurl.herokuapp.com/${url.shortURL}`}>{`http://smolurl.herokuapp.com/${url.shortURL}`}</a></th>
                                <th>{url.count}</th>
                                <th>{url.longURL}</th>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
            <div className="accordion my-5" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Add a new URL
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <form onSubmit={addURL}>
                                <input className="form-control my-3" type="text" placeholder="Long url" aria-label="default input example" value={longURL} onChange={(event) => { setlongURL(event.target.value) }} />
                                <input className="form-control my-3" type="text" placeholder="short url" aria-label="default input example" value={shortURL} onChange={(event) => { setShortURL(event.target.value) }} />
                                <button type="submit" className="btn btn-primary my-3" >Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
