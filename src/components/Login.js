import React from 'react';
import LoginForm from './LoginForm';
import { Grid, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function Login(props) {
    const navigate = () => {
        props.history.push('/');
    }
    return(
        <div>
            <Grid centered>
            <Grid.Row>
                <Grid.Column mobile={16} tablet={8} computer={4}>
                <LoginForm navigate={navigate} />
                </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                <Grid.Column mobile={16} tablet={8} computer={4}>
                <Segment className="raised">New to Infino? <Link to="/signup">Sign Up!</Link></Segment>                
                </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
}

export default Login;