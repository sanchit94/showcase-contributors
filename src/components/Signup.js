import React, { Component } from 'react'
import { Image, Header, Grid, Form, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { signupAsync, signup } from '../actions/user';

import waitlist from '../images/waitlist.png';
import card from '../images/card.png';
import SocialIconGroup from './SocialIconGroup';

class Signup extends Component {
    state = {
        name: '',
        email: ''
    };

    handleChange = e => {
        this.setState({
			[e.target.name]: e.target.value
		})
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.signupAsync(this.state)
        .then(res => {
            this.props.signup(this.state);
            localStorage.setItem('user', this.state.email);
            this.props.history.push('/');
        })

    }

    render() {
        return(
            <div>
            <Grid>
                <Grid.Row className="mt-12">
                    <Header as="h1" className="block-centered">You are about to be upgraded to Infino</Header>
                </Grid.Row>
                <Grid.Row>
                    <Header as="h4" className="block-centered">Fill out the form and follow the steps</Header>
                </Grid.Row>
                <Grid.Row>
                <Form loading={this.props.reqSent} className="block-centered" onSubmit={this.handleSubmit}>
                    <Form.Group>
                    <Form.Input placeholder='Name' name='name' onChange={this.handleChange} />
                    <Form.Input placeholder='Email' name='email' onChange={this.handleChange} />
                    <Form.Button content='Get Your Free Card' />
                    </Form.Group>
                </Form>
                </Grid.Row>
                <Grid.Row>
                <Header as="h4" className="block-centered">Or Join With</Header>
                </Grid.Row>
                <Grid.Row>
                    <SocialIconGroup />
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column mobile={16} tablet={8} computer={7}>
                    <Header as="h3" className="d-block text-center block-centered" icon>
                        <Icon name="wait" />
                        Join the waitlist
                        <Header.Subheader>Sign up using the above form to reserve your spot<br/> when we launch (Limited Spots)</Header.Subheader>
                    </Header>
                        <Image src={waitlist} width="45%" className="block-centered" />
                    </Grid.Column>
                    <Grid.Column computer={2}></Grid.Column>
                    <Grid.Column mobile={16} tablet={8} computer={7}>
                        <Header as="h3" className="d-block block-centered text-center" icon>
                        <Icon name="credit card" />
                        Get Your Free Card
                        <Header.Subheader>Invite 2 or more friends to get a FREE CARD and <br/> preferential access to Infino. (Very Limited Spots)</Header.Subheader>
                        </Header>
                        <Image src={card} width="45%" className="block-centered"/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        reqSent: state.reqSent
    }
}


export default connect(mapStateToProps, { signup, signupAsync })(Signup);