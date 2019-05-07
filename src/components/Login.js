import React from 'react';
import LoginForm from './LoginForm';
import { Grid } from 'semantic-ui-react'

function Login() {
    return(
        <div>
            <Grid centered>
                <Grid.Column mobile={16} tablet={8} computer={4}>
                <LoginForm />                
                </Grid.Column>
            </Grid>
        </div>
    );
}

export default Login;