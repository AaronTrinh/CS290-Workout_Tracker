import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <div>
            <nav>
                <Link to="/">Homepage</Link>
                <Link to="/add-exercise">Add Exercise</Link>
            </nav>
        </div>
    )
}

export default Navigation;