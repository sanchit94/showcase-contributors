import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { logout } from '../actions/user';

import { Image, Dropdown, Icon, Header } from 'semantic-ui-react';
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

    const getOptions = () => {
        if(props.isLoggedIn) {
            return [
                {
                    key: 1,
                    text: "Roadmap",
                    value: 1,
                    content: <NavLink to="/"><Header icon="map signs" content="Roadmap" /></NavLink>
                },
                {
                    key: 2,
                    text: "Logout",
                    value: 2,
                    content: <NavLink onClick={() => props.logout()} to="/logout"><Header icon="sign-out" content="Logout" /></NavLink>
                }
            ];
        } else {
            return [
                {
                    key: 1,
                    text: "Roadmap",
                    value: 1,
                    content: <NavLink to="/"><Header icon="map signs" content="Roadmap" /></NavLink>
                },
                {
                    key: 2,
                    text: "Login",
                    value: 2,
                    content: <NavLink to="/login"><Header icon="sign-in" content="LogIn" /></NavLink>
                },
                {
                    key: 3,
                    text: "SignUp",
                    value: 3,
                    content: <NavLink to="/signup"><Header icon="signup" content="SignUp" /></NavLink>
                }
            ];
        }
    }

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
            <Dropdown pointing options={getOptions()} text={getName()} style={style.dropdown} />           
        </div>
    );

}
    

const mapStateToProps = store => {
    return {
        isLoggedIn: store.isLoggedIn
    };
}

export default connect(mapStateToProps, { logout })(AppBar);