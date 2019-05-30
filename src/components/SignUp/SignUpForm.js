import React, { Component } from 'react';
import { Form, Message } from 'semantic-ui-react';

import { Spring, animated } from 'react-spring/renderprops';

import { connect } from 'react-redux';
import { signupAsync, signup, reqFailed } from '../../actions/user';

const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
const errorMessage = {
    blank: "This field cannot be blank",
    filled: "Please enter a valid email"
};

class SignUpForm extends Component {

    state = {
        name: {
            value: '',
            isInvalid: false,
        },
        email: {
            value: '',
            isInvalid: false
        },
        wobble: {
            email: false,
            name: false
        },
        networkError: false
    };

    handleChange = e => {
        this.setState({
            wobble: {
                email: false,
                name: false
            },
            [e.target.name]: {
                value: e.target.value,
            }
        });

        this.validateWhileTyping(e);
    };

    validateWhileTyping = e => {
        if (!e.target.value) {
            this.setState({
                [e.target.name]: {
                    value: '',
                    isInvalid: true,
                }
            });
        } else if(e.target.name === "email" && !expression.test(String(e.target.value).toLowerCase())) {
            this.setState({
                email: {
                    value: e.target.value,
                    isInvalid: true,
                }
            });
        }
    }


    validateInputOnBlur = e => {
        if (!e.target.value) {
            this.setState({
                [e.target.name]: {
                    value: '',
                    isInvalid: true,
                },
                wobble: {
                    [e.target.name]: true
                }
            });
        } else if(e.target.name === "email" && !expression.test(String(e.target.value).toLowerCase())) {
            this.setState({
                email: {
                    value: e.target.value,
                    isInvalid: true,
                },
                wobble: {
                    email: true
                }
            });
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        if(!this.state.name.value && !this.state.email.value) {
            this.setState({
                name: {
                    isInvalid: true
                },
                email: {
                    isInvalid: true
                },
                wobble: {
                    email: true,
                    name: true
                }
            });
            return;
        }
        if(!this.state.name.value) {
            this.setState({
                name: {
                    isInvalid: true
                },
                wobble: {
                    name: true
                }
            });
            return;
        }
        if(!this.state.email.value) {
            this.setState({
                email: {
                    isInvalid: true
                },
                wobble: {
                    email: true
                }
            });
            return;
        }
        if(this.state.name.isInvalid || this.state.email.isInvalid) {
            return;
        }

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
        });
    }

    render() {
        return(
            <Form loading={this.props.reqSent} warning={true} className="block-centered" onSubmit={this.handleSubmit} error={this.state.networkError}>
                <Form.Group className="d-flex justify-center">
                <Spring reset native from={{ x: 0 }} to={{x: this.state.wobble.name && !this.state.name.value ? 1 : 0}} config={{duration: 1000}}>
                    {({x}) => <animated.div
                            className="mr-2"
                            style={{transform: x
                                .interpolate({
                                  range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                                  output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1]
                                })
                                .interpolate(x => `scale(${x})`)
                            }}>
                    <Form.Field>
                        <Form.Input 
                        placeholder='Name' 
                        onBlur={this.validateInputOnBlur}
                        name='name' 
                        onChange={this.handleChange}
                        />
                        {this.state.name.isInvalid &&
                        <Message
                        warning
                        header="This field cannot be blank!"
                        />}
                    </Form.Field>
                    </animated.div>}
                    </Spring>
                    <Spring reset native from={{ y: 0 }} to={{y: this.state.wobble.email ? 1 : 0}} config={{duration: 1000}}>
                    {({y}) => <animated.div
                            className="mr-2"
                            style={{transform: y
                                .interpolate({
                                  range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                                  output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1]
                                })
                                .interpolate(y => `scale(${y})`)
                            }}>
                    <Form.Field>
                        <Form.Input 
                        placeholder='Email'
                        onBlur={this.validateInputOnBlur} 
                        name='email' 
                        onChange={this.handleChange}
                        />
                        {this.state.email.isInvalid &&
                        <Message
                        warning
                        header={this.state.email.value ? errorMessage.filled : errorMessage.blank}
                        />}
                        </Form.Field>
                        </animated.div>}
                        </Spring>
                    <Form.Field><Form.Button className="greenish" content='GET YOUR FREE CARD' /></Form.Field>
                </Form.Group>
                <Message
                error
                >Please check your internet connection, or try again!
                </Message>
            </Form>
        );
    }
}

const mapStateToProps = state => {
    return {
        reqSent: state.reqSent
    }
}


export default connect(mapStateToProps, { signup, signupAsync, reqFailed })(SignUpForm);