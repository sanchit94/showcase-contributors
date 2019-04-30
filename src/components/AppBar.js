import React from 'react';
import { Link } from 'react-router-dom';

import { Image, Button } from 'semantic-ui-react';
import logo from '../images/logo.png';

const style = {
    image: {
        height: "48px",
        marginRight : "auto",
    },
    centerText: {
        flexGrow : "1",
        lineHeight : "1em",
        textAlign: "center",
        margin: "auto"
    },
    button: {
        float: "right",
        marginLeft : "auto"
    }
    
}

function AppBar() {
    return(
        <div className="app-header">
            <Image src={logo} style={style.image} />
            <h2 className="visible-md" style={style.centerText}>Infino Contributors</h2>
            <Button style={style.button}><Link to="/login">Login</Link></Button>
            <Button style={style.button}><Link to="/">Roadmap</Link></Button>
        </div>
    );
}

export default AppBar;