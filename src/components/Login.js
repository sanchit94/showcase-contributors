import React from 'react';
import LoginForm from './LoginForm';
import { Grid } from 'semantic-ui-react';

export default function(props) {

    const navigateToContent = () => {
        console.log(props);
        props.history.push('/');
    }

    return(
        <Grid verticalAlign='middle' centered>
            <Grid.Row>
                <Grid.Column mobile={16} tablet={8} computer={4}>
                    <LoginForm navigate={navigateToContent} />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}