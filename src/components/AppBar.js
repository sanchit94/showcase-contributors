import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/user';
import * as firebase from 'firebase';

import { Image, Button } from 'semantic-ui-react';
import logo from '../images/logo.png';
import SuggestButton from './SuggestFeatButton';
import LoginButton from './SignIn/SignInModalButton';
import SignUpButton from './SignUp/SignUpModalButton';

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

    const logout = () => {
        firebase.auth().signOut().then(function() {
            props.logout();
            // Sign-out successful.
          }).catch(function(error) {
            // An error happened.
          });
    }

    
    // const getName = () => {
    //     if(localStorage.getItem('username')) {
    //         return `Hello, ${localStorage.getItem('username')}`
    //     }
    //     return "Hello, Contributor"
    // }

    return(
        <div className="app-header">
            <Link to="/"><Image src={logo} style={style.image}/></Link>
            <h2 className="visible-md" style={style.centerText}>Product Roadmap</h2>
            <SuggestButton />
            {props.isLoggedIn && <Button onClick={logout} className="greenish">Sign out</Button>}
            {!props.isLoggedIn && <LoginButton />}
            {!props.isLoggedIn && <SignUpButton />}
        </div>
    );

}
    

const mapStateToProps = store => {
    return {
        isLoggedIn: store.isLoggedIn
    };
}

export default connect(mapStateToProps, { logout })(AppBar);