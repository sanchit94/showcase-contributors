import React, { Component } from 'react';
import { connect } from 'react-redux';
import { suggest } from '../actions/suggestion';
import { reqFailed } from '../actions/user';

import { Button, Form } from 'semantic-ui-react';

import Rodal from 'rodal';

class SuggestionButton extends Component {

    state = {
        isOpen: false,
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

    suggestionTyping = e => {
        this.setState({
            suggestedText: e.target.value
        });
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.suggest(this.state.suggestedText)
        .then(res => {
            alert("Thanks for the suggestion");
        })
        .catch(err => {
            this.props.reqFailed();
            alert("Something's wrong!");
        })


    }

    render() {
        return(
            <div>
                <Button onClick={this.toggleModal} className="tertiary mr-2">Suggestions</Button>
                <Rodal closeOnEsc={true} width="300" height="500" animation="slideUp" visible={this.state.isOpen} onClose={this.CloseModal}>
                    
                        <div className="header-text">Welcome</div>
                        <span role="img" aria-label="Namaste" className="font-lg">🙏</span>
                        <Form loading={this.props.reqSent} error={this.state.error}>
                            <Form.Field>
                            <Form.TextArea label='Suggest us!' placeholder='Suggest us a feature or an impovement...' />
                            </Form.Field>
                            <Button onClick={this.onSubmit} className="card-body-button">
                            SUBMIT
                            </Button>
                        </Form>
                </Rodal>
            </div>
        );
    }
}

const mapStateToProps = store => ({
    reqSent: store.reqSent
})

export default connect(mapStateToProps, { suggest, reqFailed })(SuggestionButton);