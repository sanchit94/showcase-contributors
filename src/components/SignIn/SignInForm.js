import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


import { Form, Header, Message } from 'semantic-ui-react';

import SocailIconGroup from '../SocialIconGroup';

import { loginAsync, login, reqFailed } from '../../actions/user';


const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

class SignInForm extends React.Component {
    state = {
        email: '',
        error: false,
        emailError: false
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
    
    validateEmail = e => {
        
        if (!e.target.value) {
            this.setState({
                emailError: true
            });
        } else {
            if(!expression.test(String(e.target.value).toLowerCase())) {
                this.setState({
                    emailError: true
                })

            }
        }
    }

	handleChange = e => {
		this.setState({
            [e.target.name]: e.target.value,
            emailError: false
        });
    }

    render() {
        return(
            <Form onSubmit={this.onSubmit} warning={this.state.emailError} loading={this.props.reqSent} error={this.state.error}>
                <Form.Field>
                    <label><div className="card-body-text">Sign in with your email</div></label>
                    <Form.Group className="d-flex justify-center">
                    <Form.Field>
                        <Form.Input 
                        placeholder='Email' 
                        name='email' 
                        onChange={this.handleChange}
                        onBlur={this.validateEmail} 
                        error={this.state.emailError}
                        />
                    </Form.Field>
                    </Form.Group>
                    <Form.Group className="d-flex justify-center">
                        <Form.Field><Form.Button className="greenish" content='LOGIN' /></Form.Field>
                    </Form.Group>
                </Form.Field>
                <Message
                error
                >You have entered an incorrect email address. Please enter correct email address or <Link onClick={this.CloseModal} to="/signup">SignUp</Link>
                </Message>
                <Message
                warning
                header='Cannot leave this field blank.'
                list={[
                    'That e-mail has been subscribed, but you have not yet clicked the verification link in your e-mail.',
                ]}
                />
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