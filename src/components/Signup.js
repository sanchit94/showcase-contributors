import React, { Component } from 'react'
import { Image, Header, Grid, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { signupAsync, signup } from '../actions/user';

import waitlist from '../images/waitlist.png';
import card from '../images/card.png';

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
                    <Grid.Column mobile={16} tablet={8} computer={7}><Image src={waitlist} width="60%" style={{float: "right"}} /></Grid.Column>
                    <Grid.Column computer={2}></Grid.Column>
                    <Grid.Column mobile={16} tablet={8} computer={7}><Image src={card} width="60%" /></Grid.Column>
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