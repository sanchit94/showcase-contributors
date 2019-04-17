import React, { Component } from 'react';

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
            <Button style={style.button}>Suggest Features</Button>
        </div>
    );
}

export default AppBar;