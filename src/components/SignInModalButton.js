import React, { Component } from 'react';
import Rodal from 'rodal';
import {connect} from 'react-redux';
import { Button, Icon, Form, Header, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { loginAsync, login, reqFailed } from '../actions/user';

import SocailIconGroup from './SocialIconGroup';


class SignInButton extends Component {
    state = {
        isOpen: false,
        email: '',
        error: false
    }
    toggleModal = () => {
        this.setState({
            isOpen: true
        })
    }

    CloseModal = () => {
        this.setState({
            isOpen: false
        })
    }

    setHeight = () => {
        if (this.state.error) {
            return 500;
        }
        return 400;
    }

    onSubmit = e => {
		console.log(this.props);
		e.preventDefault();
		console.log(this.state.email);
		this.props.loginAsync(this.state.email)
		.then(res => {
			console.log(res.data);
            this.props.login(res.data);
            this.setState({
                isOpen: false
            });
            
		})
		.catch(err => {
			this.props.reqFailed();
			this.setState({
				error: true
			});
		})
	}

	onChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
    }
    
    render() {
        return(
            <div>
                <Button onClick={this.toggleModal} className="tertiary mr-2">LOG IN<Icon className="ml-1" name="sign in" /></Button>
                <Rodal closeOnEsc={true} width={300} height={this.setHeight()} animation="slideUp" visible={this.state.isOpen} onClose={this.CloseModal}>
                    
                        <div className="header-text">Welcome back</div>
                        <span role="img" aria-label="Namaste" className="font-lg">🙏</span>
                        <Form loading={this.props.reqSent} error={this.state.error}>
                            <Form.Field>
                                <label><div className="card-body-text">Sign in with your email</div></label>
                                <input name="email" onChange={this.onChange} placeholder="email address" />
                            </Form.Field>
                            <Button onClick={this.onSubmit} className="card-body-button">
                            SIGN IN
                            </Button>
                            <Message
                            error
                            >You have entered an incorrect email address. Please enter correct email address or <Link onClick={this.CloseModal} to="/signup">SignUp</Link>
                            </Message>
                            <Header as="h4" className="text-center">Or Join With</Header>
                            <SocailIconGroup />
                        </Form>
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

export default connect(mapStateToProps, { loginAsync, login, reqFailed })(SignInButton);