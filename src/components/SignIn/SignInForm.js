import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';


import { Form, Header, Message } from 'semantic-ui-react';

import SocailIconGroup from '../SocialIconGroup';

import { loginAsync, login, reqFailed } from '../../actions/user';




class SignInForm extends React.Component {
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

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
    }

    signInField = () => {
        return(
            <Form.Field>
                <Form.Input 
                placeholder='Email' 
                name='email' 
                onChange={this.handleChange} 
                />
            </Form.Field>

        );

    }

    render() {
        return(
            <Form onSubmit={this.onSubmit} loading={this.props.reqSent} error={this.state.error}>
                <Form.Field>
                    <label><div className="card-body-text">Sign in with your email</div></label>
                    <Form.Group className="d-flex justify-center">
                    </Form.Group>
                    <Form.Group className="d-flex justify-center">
                        <Form.Field><Form.Button className="greenish" content='LOGIN' /></Form.Field>
                    </Form.Group>
                </Form.Field>
                <Message
                error
                >You have entered an incorrect email address. Please enter correct email address or <Link onClick={this.CloseModal} to="/signup">SignUp</Link>
                </Message>
                <Header as="h4" className="text-center">Or Join With</Header>
                <SocailIconGroup />
            </Form>
        );
    }
}

const mapStateToProps = state => {
	return {
		reqSent: state.reqSent
	}
}

export default connect(mapStateToProps, { loginAsync, login, reqFailed })(SignInForm);