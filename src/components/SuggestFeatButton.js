import React, { Component } from 'react';
import { connect } from 'react-redux';
import { suggest } from '../actions/suggestion';
import { reqFailed } from '../actions/user';

import { Button, Form } from 'semantic-ui-react';

import Rodal from 'rodal';

class SuggestionButton extends Component {

    state = {
        isOpen: false,
        showConfirmation: false,
        suggestedText: ''
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
            suggestedText: e.target.value
        });
        
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.suggest(this.state.suggestedText)
        .then(res => {
            this.CloseModal();
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
                <Rodal closeOnEsc={true} width="300" height="400" animation="slideUp" visible={this.state.isOpen} onClose={this.CloseModal}>
                    <div className="header-text">Welcome</div>
                    <span role="img" aria-label="Namaste" className="font-lg">🙏</span>
                    <Form onSubmit={this.onSubmit} loading={this.props.reqSent} error={this.state.error}>
                        <Form.Field>
                        <Form.TextArea onChange={this.suggestionTyping} label='Suggest us!' placeholder='Suggest us a feature or an impovement...' />
                        </Form.Field>
                        <Button className="card-body-button">
                            SUBMIT
                        </Button>
                    </Form>
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
    reqSent: store.reqSent
})

export default connect(mapStateToProps, { suggest, reqFailed })(SuggestionButton);