import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

import { loginFB, loginTwitter, login, loginAsync, logout } from '../actions/user';

class SocialIconGroup extends Component {
        
    glogin = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
            console.log("Does it go here");
            var user = result.user;
            this.props.loginAsync(user.email)
            .then(res => {
                this.props.login(res.data);
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

    fbLogin = () => {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            this.props.loginAsync(user.email)
            .then(res => {
                this.props.login(res.data);
            });
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

    twitterLogin = () => {
        var provider = new firebase.auth.TwitterAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(user);
            this.props.loginAsync(user.email)
            .then(res => {
                this.props.login(res.data);
            });
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
                <Icon onClick={this.fbLogin} circular inverted size="large" name="facebook f" />
                <Icon onClick={this.twitterLogin} circular inverted size="large" name="twitter" />
                <Icon onClick={this.glogin} circular inverted size="large" name="google" />                
            </div>
        );
    }
}

const mapStateToProps = () => {
    return {
    }
}

export default connect(mapStateToProps, { loginFB, loginAsync, login, logout, loginTwitter })(SocialIconGroup);

