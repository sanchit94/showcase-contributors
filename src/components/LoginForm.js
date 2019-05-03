import React, { Component } from 'react';
import { Card, Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { loginAsync, login } from '../actions/login';

class LoginForm extends Component {

	state = {
		email: ''
	}

	onSubmit = e => {
		e.preventDefault();
		console.log("Whatsup");
		console.log(this.state.email);
		this.props.loginAsync(this.state.email)
		.then(res => {
			console.log(res.data);
			localStorage.setItem('user', res.data.email);
			this.props.login(res.data);
			this.props.history.push('/');
		});
	}

	onChange = e => {
		console.log("what")
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	renderLogin = () => {
		return (
			<Card className="raised card-norad mb-2 pop-up login" fluid>
				<Card.Header></Card.Header>
				<Card.Content>
				<Form>
					<Form.Field>
						<label>Sign in with your email</label>
						<input name="email" onChange={this.onChange} />
					</Form.Field>
					<Form.Field
						id='form-button-control-public'
						control={Button}
						content='Login'
						onClick={this.onSubmit}
					/>
				</Form>
				</Card.Content>
			</Card>
		);
	}
	render() {
		return (
			<div className="app-over">
				<header className="app-bar mt-8">
				<div className="d-flex">
						Welcome Back Humans!
				</div>
				</header>
				<div className="board">
						<div className="auto-height d-flex">
								{this.renderLogin()}
						</div>
				</div>
			</div>			
		);
	}
}

const mapStateToProps = state => {
	return {
		isLoggedIn: state.isLoggedIn
	}
}

export default connect(mapStateToProps, { loginAsync, login })(LoginForm);