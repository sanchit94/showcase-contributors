import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

import { loginFB, loginTwitter, login, loginAsync } from '../actions/user';

class SocialIconGroup extends Component {
    
    glogin = () => {
        const that = this;
        console.log('meme');
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            console.log("Does it go here");
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            console.log(token);
            // The signed-in user info.
            var user = result.user;
            console.log(user);
            that.props.loginAsync(user.email)
            .then(res => {
                that.props.login(res.data);
            })
            // ...
          }).catch(function(error) {
              console.log("errored", error);
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
                <Icon circular inverted size="large" name="facebook f" />
                <Icon circular inverted size="large" name="twitter" />
                <Icon onClick={this.glogin} circular inverted size="large" name="google" />                
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps, { loginFB, loginAsync, login, loginTwitter })(SocialIconGroup);

