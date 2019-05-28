import React, { Component } from 'react';
import Rodal from 'rodal';
import { Button, Icon, Form, Header, Message } from 'semantic-ui-react';





class SignInButton extends Component {
    state = {
        isOpen: false,
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

    // setHeight = () => {
    //     if (this.state.error) {
    //         return 500;
    //     }
    //     return 400;
    // }

    
    
    render() {
        return(
            <div>
                <Button onClick={this.toggleModal} className="tertiary mr-2">LOG IN<Icon className="ml-1" name="sign in" /></Button>
                <Rodal closeOnEsc={true} width={300} height={500} animation="slideUp" visible={this.state.isOpen} onClose={this.CloseModal}>
                    
                        <div className="header-text">Welcome back</div>
                        <span role="img" aria-label="Namaste" className="font-lg">🙏</span>
                        
                </Rodal>
            </div>
        );

    }
    
}


export default SignInButton;