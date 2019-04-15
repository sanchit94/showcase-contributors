import React, { Component } from 'react';

import { Image, Button } from 'semantic-ui-react';
import logo from '../images/logo.png';

const style = {
    image: {
        height: "48px",
        display: "inline-block"
    },
    button: {
        display: "inline-block",
        float: "right"
    }
    
}

function AppBar(props) {
    return(
        <div className="app-header">
            <Image src={logo} style={style.image} />
            <Button style={style.button}>Suggest Features</Button>
        </div>
    );
}

export default AppBar;