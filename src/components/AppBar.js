import React from 'react';
import { connect } from 'react-redux';
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

function AppBar(props) {

    const logOut = () => {
        localStorage.setItem('user', '');
    }
    return(
        <div className="app-header">
            <Image src={logo} style={style.image} />
            <h2 className="visible-md" style={style.centerText}>Infino Contributors</h2>
            {props.isLoggedIn && <Button style={style.button} onClick={logOut}>Logout</Button>}
            {!props.isLoggedIn && <Button style={style.button}><Link to="/login">Login</Link></Button>}
            <Button style={style.button}><Link to="/">Roadmap</Link></Button>
        </div>
    );
}

const mapStateToProps = store => {
    return {
        isLoggedIn: store.isLoggedIn
    };
}

export default connect(mapStateToProps, {})(AppBar);