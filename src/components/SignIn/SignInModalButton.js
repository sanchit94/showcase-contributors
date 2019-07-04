import React, { useState } from 'react';
import Rodal from 'rodal';
import { Button, Icon } from 'semantic-ui-react';

import SignInForm from './SignInForm';

function SignInButton() {
    const [isOpen, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true)
    }

    const closeModal = () => {
        setOpen(false)
    }

    return(
        <div>
            <Button onClick={showModal} className="tertiary mr-2">LOG IN<Icon className="ml-1" name="sign in" /></Button>
            <Rodal className="login" closeOnEsc={true} width={300} height={500} animation="slideUp" visible={isOpen} onClose={closeModal}>
                <div className="custom-color">
                    <div className="header-text">Welcome back</div>
                    <span role="img" aria-label="Namaste" className="font-lg">🙏</span>
                </div>
                <SignInForm />
            </Rodal>
        </div>
    );

    
}


export default SignInButton;