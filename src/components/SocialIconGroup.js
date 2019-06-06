import React from 'react';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { loginFB, loginTwitter } from '../actions/user';
import { userDomain } from '../constants';

function SocialIconGroup(props) {
    return(
        <div className="block-centered text-center">
            <a href={`${userDomain}/users/auth/facebook`}>
                <Icon circular inverted size="large" name="facebook f" />
            </a>
            <a href={`${userDomain}/users/auth/twitter`}>
                <Icon circular inverted size="large" name="twitter" />
            </a>
            <a href={`${userDomain}/users/auth/google`}>
                <Icon circular inverted size="large" name="google" />                
            </a>
        </div>
    );
}

const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps, { loginFB, loginTwitter })(SocialIconGroup);

