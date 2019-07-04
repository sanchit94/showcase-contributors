import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';
import { Image, Button } from 'semantic-ui-react';
import styled from 'styled-components';

import SuggestButton from './SuggestFeatButton';
import LoginButton from './SignIn/SignInModalButton';
import SignUpButton from './SignUp/SignUpModalButton';
import logo from '../images/logo.png';

import { logout } from '../actions/user';

const LogoImage = styled(Image)`
    height: 48px;
    marginRight : auto;
`;

const CentralText = styled.h2`
    flex-grow : 1;
    line-height : 1em;
    text-align: left;
    margin: auto
`;

const style = {
    centerText: {
        
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

    return(
        <div className="app-header">
            <Link to="/"><LogoImage src={logo}/></Link>
            <CentralText className="visible-md">Product Roadmap</CentralText>
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