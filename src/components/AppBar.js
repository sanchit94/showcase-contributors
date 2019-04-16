import React, { Component } from 'react';

import { Image, Button } from 'semantic-ui-react';
import logo from '../images/logo.png';

const style = {
    image: {
        height: "48px",
        display: "inline-block"
    },
    centerText: {
        display: "inline-block",
        "flex-grow": "1",
        "line-height": "1em",
        margin: "0.5em",
        "text-align": "center"
    },
    button: {
        display: "inline-block",
        float: "right",
    }
    
}

function AppBar() {
    return(
        <div className="app-header">
            <Image src={logo} style={style.image} />
            <h2 style={style.centerText}>Infino Contributors</h2>
            <Button style={style.button}>Suggest Features</Button>
        </div>
    );
}

export default AppBar;