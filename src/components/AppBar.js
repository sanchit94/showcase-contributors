import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { logout } from '../actions/user';

import { Image, Button, Header } from 'semantic-ui-react';
import logo from '../images/logo.png';

const style = {
    image: {
        height: "48px",
        marginRight : "auto",
    },
    centerText: {
        flexGrow : "1",
        lineHeight : "1em",
        textAlign: "left",
        margin: "auto"
    },
    dropdown: {
        marginRight: "6em"
    }
}



function AppBar(props) {

    
    const getName = () => {
        if(localStorage.getItem('username')) {
            return `Hello, ${localStorage.getItem('username')}`
        }
        return "Hello, Contributor"
    }

    return(
        <div className="app-header">
            <Link to="/"><Image src={logo} style={style.image}/></Link>
            <h2 className="visible-md" style={style.centerText}>Infino Contributors</h2>
            {props.isLoggedIn && <Button as={NavLink} to="/logout" onClick={() => props.logout()} className="greenish">Sign out</Button>}
            {!props.isLoggedIn && <Button as={NavLink} to="/login" className="tertiary">Sign in</Button>}
            {!props.isLoggedIn && <Button as={NavLink} to="/signup" className="greenish">Get A Free Card</Button>}         
        </div>
    );

}
    

const mapStateToProps = store => {
    return {
        isLoggedIn: store.isLoggedIn
    };
}

export default connect(mapStateToProps, { logout })(AppBar);