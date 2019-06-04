import React, { Component } from 'react';
import { connect } from 'react-redux';
import { suggest } from '../actions/suggestion';
import { reqFailed, reqSuccess } from '../actions/user';

import { Button, Form } from 'semantic-ui-react';

import Rodal from 'rodal';

class SuggestionButton extends Component {

    state = {
        isOpen: false,
        showConfirmation: false,
        suggestedText: '',
        name: '',
        email: ''
    }

    toggleModal = () => {
        this.setState({
            isOpen: true
        })
    }

    CloseModal = () => {
        this.setState({
            isOpen: false
        })
    }

    showConfirmDialog = () => {
        this.setState({
            showConfirmation: true
        });
        setTimeout(() => {
            this.setState({
                showConfirmation: false
            })
        }, 1500);
    }

    suggestionTyping = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(this.state)
    }

    dynamicHeight = () => {
        if(this.props.isLoggedIn) {
            return 350;
        }
        return 500;

    }

    onSubmit = e => {
        e.preventDefault();
        this.props.suggest({
            suggestion: this.state.suggestedText,
            name: this.state.name || localStorage.getItem('username'),
            usermail: this.state.email || localStorage.getItem('user')
        })
        .then(res => {
            this.CloseModal();
            this.props.reqSuccess();
            this.showConfirmDialog();
        })
        .catch(err => {
            this.props.reqFailed();
            alert("Something's wrong!");
        })
    }

    render() {
        return(
            <div>
                <div onClick={this.toggleModal} className="underlined bold">Have a cool idea?</div>
                <Rodal closeOnEsc={true} width="300" height={this.dynamicHeight()} animation="slideUp" visible={this.state.isOpen} onClose={this.CloseModal}>
                    <div className="header-text">Welcome</div>
                    <span role="img" aria-label="Namaste" className="font-lg">🙏</span>
                    {!this.props.isLoggedIn && 
                    <Form onSubmit={this.onSubmit} loading={this.props.reqSent} error={this.state.error}>
                        <Form.Field>
                            <Form.Input onChange={this.suggestionTyping} name="email" label='Email address' />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input onChange={this.suggestionTyping} name="name" label="Name" />
                        </Form.Field>
                        <Form.Field>
                            <Form.TextArea onChange={this.suggestionTyping} name="suggestedText" label='Suggest us!' placeholder='Suggest us a feature or an impovement...' />
                        </Form.Field>
                        <Button className="card-body-button">
                            SUBMIT
                        </Button>
                    </Form>}
                    {this.props.isLoggedIn &&
                    <Form onSubmit={this.onSubmit} loading={this.props.reqSent} error={this.state.error}>
                        <Form.Field>
                            <Form.TextArea name="suggestedText" onChange={this.suggestionTyping} label='Suggest us!' placeholder='Suggest us a feature or an impovement...' />
                        </Form.Field>
                        <Button className="card-body-button">
                            SUBMIT
                        </Button>
                    </Form>}
                </Rodal>
                <Rodal width="200" height="200" animation="fade" visible={this.state.showConfirmation}>
                    <div className="font-lg">
                        <span role="img" aria-label="Thumbs-up">👍</span>
                        Submitted
                    </div>
                </Rodal>
            </div>
        );
    }
}

const mapStateToProps = store => ({
    reqSent: store.reqSent,
    isLoggedIn: store.isLoggedIn
})

export default connect(mapStateToProps, { suggest, reqFailed, reqSuccess })(SuggestionButton);