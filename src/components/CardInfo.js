import React, { Component } from 'react';

import { Card, Image, Icon } from 'semantic-ui-react';

export default class CardInfo extends Component {
    render() {
        return(
            <Card>
                <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
                <Card.Content>
                <Card.Header>Matthew</Card.Header>
                <Card.Meta>
                    <span className='date'>Joined in 2015</span>
                </Card.Meta>
                <Card.Description>Matthew is a musician living in Nashville.</Card.Description>
                </Card.Content>
                <Card.Content extra>
                <a>
                    <Icon name='user' />
                    22 Friends
                </a>
                </Card.Content>
            </Card>
        );
    }
}