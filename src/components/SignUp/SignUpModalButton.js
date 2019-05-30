import React, { useState } from 'react';
import Rodal from 'rodal';

import waitlist from '../../images/waitlist.png';
import card from '../../images/card.png';

import SignUpForm from './SignUpForm';

import { Image, Header, Grid, Icon, Button } from 'semantic-ui-react';
import SocialIconGroup from '../SocialIconGroup';

function SignUpModal() {
    const [isOpen, setOpen] = useState(false);
    
    const showModal = () => {
        setOpen(true)
    }

    const closeModal = () => {
        setOpen(false)
    }
    
    return(
        <div>
            <Button onClick={showModal} className="greenish">GET YOUR FREE CARD<Icon className="ml-1" name="rocket" /></Button>
            <Rodal className="signup-modal" width={"inherit"} height={"inherit"} closeOnEsc={true} animation="slideUp" visible={isOpen} onClose={closeModal}>
                <Grid>
                    <Grid.Row className="mt-12">
                        <Header as="h1" className="block-centered text-center font-size-30">You're About To Get Upgraded To Infino<span role="img" aria-label="Hooray!">🙌</span></Header>
                    </Grid.Row>
                    <Grid.Row>
                        <Header as="h3" className="block-centered">Fill out the form and follow the steps</Header>
                    </Grid.Row>
                    <Grid.Row>
                        <SignUpForm />
                    </Grid.Row>
                    <Grid.Row>
                        <Header as="h4" className="block-centered">Or Join With</Header>
                    </Grid.Row>
                    <Grid.Row>
                        <SocialIconGroup />
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column mobile={16} tablet={7} computer={7}>
                        <Header as="h3" className="d-block text-center block-centered" icon>
                            <Icon circular name="">1</Icon>
                            Join the waitlist
                            <Header.Subheader>Sign up using the above form to reserve your spot<br/> when we launch (Limited Spots)</Header.Subheader>
                        </Header>
                            <Image src={waitlist} width="50%" className="block-centered" />
                        </Grid.Column>
                        <Grid.Column computer={2}></Grid.Column>
                        <Grid.Column mobile={16} tablet={7} computer={7}>
                            <Header as="h3" className="d-block block-centered text-center" icon>
                            <Icon circular name="">2</Icon>
                            Get Your Free Card
                            <Header.Subheader>Invite 2 or more friends to get a FREE CARD and <br/> preferential access to Infino. (Very Limited Spots)</Header.Subheader>
                            </Header>
                            <Image src={card} width="50%" className="block-centered"/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Rodal>
        </div>

    );
    
}

export default SignUpModal;