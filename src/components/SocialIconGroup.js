import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { loginFB, loginTwitter } from '../actions/user';

class SocialIconGroup extends Component {

        onSignIn = (googleUser) => {
        // Useful data for your client-side scripts:
        var profile = googleUser.getBasicProfile();
        console.log("ID: " + profile.getId()); // Don't send this directly to your server!
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());

        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);
        }
    render() {
        return(
            <div className="block-centered text-center">
                <Icon circular inverted size="large" name="facebook f" >
                    <div class="g-signin2" onClick={this.onSignIn} data-onsuccess="onSignIn" data-theme="dark"></div>
                </Icon>
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

