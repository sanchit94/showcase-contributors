import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { loginFB, loginTwitter } from '../actions/user';

class SocialIconGroup extends Component {

    componentDidMount = () => {
        
    }
    render() {
        return(
            <div className="block-centered text-center">
                <Icon circular inverted size="large" name="facebook f" >
                    <div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
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

