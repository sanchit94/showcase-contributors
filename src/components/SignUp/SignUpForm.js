import React, { Component } from 'react';
import { Form, Message } from 'semantic-ui-react';

import { Spring, animated } from 'react-spring/renderprops';

import { connect } from 'react-redux';
import { signupAsync, signup, reqFailed } from '../../actions/user';

const expression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // eslint-disable-line no-useless-escape
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
        if(!this.state.name.value && (!this.state.email.value || !expression.test(String(e.target.value).toLowerCase())) ) {
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
        if(!this.state.email.value || !expression.test(String(this.state.email.value).toLowerCase())) {
            this.setState({
                email: {
                    isInvalid: true,
                    value: this.state.email.value
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
                networkError: true
            })
        });
    }

    render() {
        return(
            <Form loading={this.props.reqSent} warning={true} className="block-centered" onSubmit={this.handleSubmit} error={this.state.networkError}>
                <Form.Group className="d-flex justify-center">
                <Spring reset native from={{ x: 0 }} to={{x: this.state.wobble.name && !this.state.name.value ? 1 : 0}} config={{duration: 1000}}>
                    {({x}) => <animated.div
                            className="mr-3"
                            style={{transform: x
                                .interpolate({
                                  range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                                  output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1]
                                })
                                .interpolate(x => `scale(${x})`)
                            }}>
                    <Form.Field className="form-field-smaller">
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
                            className="mr-3"
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
                    <Form.Field>
                        <Form.Button className="greenish" content='GET YOUR FREE CARD' />
                    </Form.Field>
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