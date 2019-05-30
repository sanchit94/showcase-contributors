import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Form, Header, Message } from 'semantic-ui-react';
// import {Spring, animated} from 'react-spring';
import { Spring, animated } from 'react-spring/renderprops'

import SocailIconGroup from '../SocialIconGroup';

import { loginAsync, login, reqFailed } from '../../actions/user';


const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
const errorMessage = {
    blank: "This field cannot be blank",
    filled: "Please enter a valid email"
};

class SignInForm extends React.Component {
    state = {
        email: '',
        error: false,
        validationError: false,
        wobble: false,
    }

    onSubmit = e => {
        if(!this.state.email || !expression.test(String(this.state.email).toLowerCase())) {
            this.setState({
                wobble: true,
                validationError: true
            });
            return;
        }
        if (this.state.validationError) {
            return;
        } else {
            e.preventDefault();
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
    }
    
    validateEmail = e => {
        if (!e.target.value) {
            this.setState({
                validationError: true,
                wobble: true
            });
        } else {
            if(!expression.test(String(e.target.value).toLowerCase())) {
                this.setState({
                    validationError: true,
                    wobble: true
                })
            }
        }
    }

	handleChange = e => {
        console.log(e)
		this.setState({
            [e.target.name]: e.target.value,
            validationError: false,
            wobble: false
        });
    }

    render() {
        return(
            <Form onSubmit={this.onSubmit} warning={this.state.validationError} loading={this.props.reqSent} error={this.state.error}>
                <Form.Field>
                    <label><div className="card-body-text">Sign in with your email</div></label>
                    <Form.Group className="d-flex justify-center">
                    <Spring reset native from={{ x: 0 }} to={{x: this.state.wobble ? 1 : 0}} config={{duration: 1000}}>
                    {({x}) => <animated.div
                            style={{transform: x
                                .interpolate({
                                  range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                                  output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1]
                                })
                                .interpolate(x => `scale(${x})`)
                            }}
                            >
                                <Form.Field>
                                    <Form.Input 
                                    placeholder='Email' 
                                    name='email' 
                                    onChange={this.handleChange}
                                    onBlur={this.validateEmail} 
                                    error={this.state.emailError}
                                    />
                                    <Message
                                    warning
                                    header={!this.state.email ? errorMessage.blank : errorMessage.filled}
                                    />
                                </Form.Field>
                            </animated.div>}
            {/* {({ t }) => <animated.path d={t.interpolate(interpolator)} />} */}
                    </Spring>
                    
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