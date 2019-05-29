import React, { Component } from 'react';
import { Form, Message } from 'semantic-ui-react';

import { connect } from 'react-redux';
import { signupAsync, signup, reqFailed } from '../../actions/user';

const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
const errorMessage = {
    blank: "This field cannot be blank",
    filled: "Please enter a valid email"
};

class SignUpForm extends Component {

    state = {
        name: '',
        email: '',
        validation: {
            name: true,
            email: true
        },
        networkError: false
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
            validation: {
                [e.target.name]: true
            }
        });
    };

    validateName = e => {
        console.log("Name validation done")
        console.log(this.state.validation);
        if(!e.target.value) {
            this.setState({
                validation: {
                    name: false
                }
            });
        }
    }

    validateEmail = e => {
        console.log("EMail validation done");
        console.log(this.state.validation);
        if (!e.target.value) {
            this.setState({
                validation: {
                    email: false
                }
            });
        } else if(!expression.test(String(e.target.value).toLowerCase())) {
            this.setState({
                validation: {
                    email: false
                }
            });
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        if(!this.state.validation.name || !this.state.validation.email) {
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
        })

    }

    render() {
        return(
            <Form loading={this.props.reqSent} warning={true} className="block-centered" onSubmit={this.handleSubmit} error={this.state.networkError}>
                <Form.Group className="d-flex justify-center">
                    <Form.Field>
                        <Form.Input 
                        placeholder='Name' 
                        onBlur={this.validateName}
                        name='name' 
                        onChange={this.handleChange}
                        />
                        {!this.state.validation.name &&
                        <Message
                        warning
                        header="This field cannot be blank!"
                        />}
                    </Form.Field>
                    <Form.Field>
                        <Form.Input 
                        placeholder='Email'
                        onBlur={this.validateEmail} 
                        name='email' 
                        onChange={this.handleChange}
                        />
                        {!this.state.validation.email &&
                        <Message
                        warning
                        header={this.state.email ? "True" : "False"}
                        />}
                        </Form.Field>
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