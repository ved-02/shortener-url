import React from 'react'

export default function Footer() {
    return (
        <div class="container">
            <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <div class="col-md-4 d-flex align-items-center">
                    <span class="text-muted">Made by Ved</span>
                </div>

                <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
                    <li class="ms-3"><a class="text-muted" href="https://www.linkedin.com/in/ved-prakash-t-40a421200/">Linkedin</a></li>
                    <li class="ms-3"><a class="text-muted" href="https://github.com/ved-02">GitHub</a></li>
                    <li class="ms-3"><a class="text-muted" href="https://twitter.com/veedTiwari">Twitter</a></li>
                </ul>
            </footer>
        </div>
    )
};