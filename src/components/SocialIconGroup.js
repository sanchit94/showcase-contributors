import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

import { loginFB, loginTwitter } from '../actions/user';

class SocialIconGroup extends Component {
    componentDidMount = () => {
        
    }

    glogin = () => {
        console.log('meme')
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            console.log(token);
            // The signed-in user info.
            var user = result.user;
            console.log(user);
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    }

    render() {
        return(
            <div className="block-centered text-center">
                <Icon onClick={this.glogin} circular inverted size="large" name="facebook f" />
                <Icon circular inverted size="large" name="twitter" />
                <Icon circular inverted size="large" name="google" />                
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps, { loginFB, loginTwitter })(SocialIconGroup);

