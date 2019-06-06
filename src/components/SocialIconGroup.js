import React from 'react';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { loginFB, loginTwitter } from '../actions/user';

function SocialIconGroup(props) {
    return(
        <div className="block-centered text-center">
            <Icon circular inverted size="large" name="facebook f" onClick={ ()=> props.loginFB() } />
            <Icon circular inverted size="large" name="twitter" onClick={ ()=> props.loginTwitter()}/>
            <Icon circular inverted size="large" name="google" />
        </div>
    );
}

const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps, { loginFB, loginTwitter })(SocialIconGroup);

