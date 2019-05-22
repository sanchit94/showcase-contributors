import React, { Component } from 'react';

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

export default SuggestionButton;