import React, { Component } from 'react';
import { Card, Form, Button } from 'semantic-ui-react'; 

class LoginForm extends Component {

	renderLogin = () => {
		return (
			<Card className="raised card-norad mb-2 pop-up login" fluid>
				<Card.Header></Card.Header>
				<Card.Content>
				<Form>
					<Form.Field>
						<label>Sign in with your email</label>
						<input />
					</Form.Field>
					<Form.Field
						id='form-button-control-public'
						control={Button}
						content='Login'
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

export default LoginForm;