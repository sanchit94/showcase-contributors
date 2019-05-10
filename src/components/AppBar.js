import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/login';

import { Image, Dropdown } from 'semantic-ui-react';
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
        marginRight: "2.5em"
    }
}

function AppBar(props) {

    const logOut = () => {
        props.logout();
    }

    const getName = () => {
        
        return localStorage.getItem('username') || "Not a member";
    }

    return(
        <div className="app-header">
            <Link to="/"><Image src={logo} style={style.image}/></Link>
            <h2 className="visible-md" style={style.centerText}>Infino Contributors</h2>
            <Dropdown text={getName()} style={style.dropdown}>
            <Dropdown.Menu>
            <Dropdown.Item><Link to="/">Roadmap</Link></Dropdown.Item>
            {props.isLoggedIn && <Dropdown.Item onClick={logOut}><Link to="/logout">Logout</Link></Dropdown.Item>}
            {!props.isLoggedIn && <Dropdown.Item><Link to="/login">Login</Link></Dropdown.Item>}
            {!props.isLoggedIn && <Dropdown.Item><Link to="/signup">Signup</Link></Dropdown.Item>}
            </Dropdown.Menu>
            </Dropdown>
            
        </div>
    );

}
    

const mapStateToProps = store => {
    return {
        isLoggedIn: store.isLoggedIn
    };
}

export default connect(mapStateToProps, { logout })(AppBar);