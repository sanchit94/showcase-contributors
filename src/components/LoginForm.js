import React, { Component } from 'react';
import { Card, Form, Button, Message, Header, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SocailIconGroup from './SocialIconGroup';
import { loginAsync, login, reqFailed } from '../actions/user';

class LoginForm extends Component {

	state = {
		email: '',
		error: false
	}

	onSubmit = e => {
		console.log(this.props);
		e.preventDefault();
		console.log(this.state.email);
		this.props.loginAsync(this.state.email)
		.then(res => {
			console.log(res.data);
			this.props.login(res.data);
			this.props.navigate();
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
		return (
			<div>
			<Card className="raised card-norad mb-2 login" fluid>
				<Card.Header className="header-grey">
					<div className="header-text">Welcome back</div>
					<span role="img" aria-label="Namaste" className="font-lg">🙏</span>
				</Card.Header>
				<Card.Content>
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
					>You have entered an incorrect email address. Please enter correct email address or <Link to="/signup">SignUp</Link>
					</Message>
					<Header as="h4">Or Join With</Header>
					<SocailIconGroup />
				</Form>
				</Card.Content>
			</Card>
			<Segment className="raised">
				New to Infino? <Link to="/signup"> Sign Up!</Link>
			</Segment>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		reqSent: state.reqSent
	}
}

export default connect(mapStateToProps, { loginAsync, login, reqFailed })(LoginForm);