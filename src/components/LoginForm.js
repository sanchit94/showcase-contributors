import React, { Component } from 'react';
import { Card, Form, Button, Icon, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { loginAsync, login } from '../actions/user';

class LoginForm extends Component {

	state = {
		email: ''
	}

	onSubmit = e => {
		e.preventDefault();
		console.log(this.state.email);
		this.props.loginAsync(this.state.email)
		.then(res => {
			console.log(res.data);
			this.props.login(res.data);
			this.props.navigate();
		});
	}

	onChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	renderLogin = () => {
		return (
			<Card className="raised card-norad mb-2 login" fluid>
				<Card.Header className="header-grey">
					<div className="header-text">Welcome back</div>
					<span role="img" aria-label="Namaste" className="font-lg">🙏</span>
				</Card.Header>
				<Card.Content>
				<Form loading={this.props.reqSent}>
					<Form.Field>
						<label><div className="card-body-text">Sign in with your email</div></label>
						<input name="email" onChange={this.onChange} placeholder="email address" />
					</Form.Field>
					<Button onClick={this.onSubmit} className="card-body-button">
					LOGIN
					</Button>
					
					<label><div className="card-body-text">Or Join With</div></label>
					<div className="icon-holder">
					<div className="social__item">
					<span className="icon-links round social__icon--facebook fill">
					<Icon name="facebook f"></Icon>
					</span>
					</div>
					<div className="social__item">
					<span className="icon-links round social__icon--twitter fill">
					<Icon name="twitter"></Icon>
					</span>
					</div>
					<div className="social__item">
					<span className="icon-links round social__icon--googleplus fill">
					<Icon name="google"></Icon>
					</span>
					</div>
					</div>
					<Message success header='Form Completed' content="You're all signed up for the newsletter" />
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
		reqSent: state.reqSent
	}
}

export default connect(mapStateToProps, { loginAsync, login })(LoginForm);