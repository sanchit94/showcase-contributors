import React, { Component } from 'react';
import Rodal from 'rodal';

import waitlist from '../images/waitlist.png';
import card from '../images/card.png';

import { connect } from 'react-redux';
import { signupAsync, signup, reqFailed } from '../actions/user';
import { Image, Header, Grid, Form, Icon, Button, Message } from 'semantic-ui-react';
import SocialIconGroup from './SocialIconGroup';

class SignUpModal extends Component {
    
    state = {
        isOpen: false,
        error: false,
        name: '',
        email: ''
    }

    showModal = () => {
        this.setState({
            isOpen: true
        });
    }

    CloseModal = () => {
        this.setState({
            isOpen: false
        });
    }

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
            this.setState({
                isOpen: false
            });
        })
        .catch(err => {
            this.props.reqFailed();
            this.setState({
                error: true
            })
        })

    }

    render() {
        return(
            <div>
            <Button onClick={this.showModal} className="greenish">GET YOUR FREE CARD<Icon className="ml-1" name="rocket" /></Button>
            <Rodal className="signup-modal" width={"inherit"} height={"inherit"} closeOnEsc={true} animation="slideUp" visible={this.state.isOpen} onClose={this.CloseModal}>
            <Grid>
                <Grid.Row className="mt-12">
                <Grid.Column>
                    <Header as="h1" className="block-centered text-center font-size-30">You're About To Get Upgraded To Infino<span role="img" aria-label="Hooray!">🙌</span></Header>
                </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Header as="h3" className="block-centered">Fill out the form and follow the steps</Header>
                </Grid.Row>
                <Grid.Row>
                <Form loading={this.props.reqSent} className="block-centered" onSubmit={this.handleSubmit} error={this.state.error}>
                    <Form.Group className="d-flex justify-center">
                        <Form.Field><Form.Input placeholder='Name' name='name' onChange={this.handleChange} /></Form.Field>
                        <Form.Field><Form.Input placeholder='Email' name='email' onChange={this.handleChange} /></Form.Field>
                        <Form.Field><Form.Button className="greenish" content='GET YOUR FREE CARD' /></Form.Field>
                    </Form.Group>
                    <Message
                    error
                    >Please check your internet connection, or try again!
                    </Message>
                </Form>
                </Grid.Row>
                <Grid.Row>
                <Header as="h4" className="block-centered">Or Join With</Header>
                </Grid.Row>
                <Grid.Row>
                    <SocialIconGroup />
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column mobile={16} tablet={7} computer={7}>
                    <Header as="h3" className="d-block text-center block-centered" icon>
                        <Icon circular name="">1</Icon>
                        Join the waitlist
                        <Header.Subheader>Sign up using the above form to reserve your spot<br/> when we launch (Limited Spots)</Header.Subheader>
                    </Header>
                        <Image src={waitlist} width="50%" className="block-centered" />
                    </Grid.Column>
                    <Grid.Column computer={2}></Grid.Column>
                    <Grid.Column mobile={16} tablet={7} computer={7}>
                        <Header as="h3" className="d-block block-centered text-center" icon>
                        <Icon circular name="">2</Icon>
                        Get Your Free Card
                        <Header.Subheader>Invite 2 or more friends to get a FREE CARD and <br/> preferential access to Infino. (Very Limited Spots)</Header.Subheader>
                        </Header>
                        <Image src={card} width="50%" className="block-centered"/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            
            </Rodal>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        reqSent: state.reqSent
    }
}


export default connect(mapStateToProps, { signup, signupAsync, reqFailed })(SignUpModal);