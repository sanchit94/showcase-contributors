import React, { Component } from 'react';

import { Image, Button } from 'semantic-ui-react';
import logo from '../images/logo.png';

const style = {
    image: {
        height: "48px",
        "margin-right": "auto",
    },
    centerText: {
        "flex-grow": "1",
        "line-height": "1em",
        margin: "0.5em",
        "text-align": "center"
    },
    button: {
        float: "right",
        "margin-left": "auto"
    }
    
}

function AppBar() {
    return(
        <div className="app-header">
            <Image className="d-inline-block" src={logo} style={style.image} />
            <h2 className="d-inline-block visible-md" style={style.centerText}>Infino Contributors</h2>
            <Button className="d-inline-block" style={style.button}>Suggest Features</Button>
        </div>
    );
}

export default AppBar;