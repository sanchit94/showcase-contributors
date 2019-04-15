import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Card, Image, Icon } from 'semantic-ui-react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';

import { useMeasure, usePrevious } from './helpers/react-spring-helpers';
import { domain } from '../constants';


const Content = styled(animated.div)`
  will-change: transform, height;
  overflow: hidden;
`
  

function CardInfo(props) {
    const [open, setValue] = useState(0);
    const previous = usePrevious(open);
    const [bind, { height: viewHeight }] = useMeasure();
    const { height, transform } = useSpring({
        height: open ? `${viewHeight}px` : '0px',
        transform: open ? `rotate(-180deg)`: `rotate(0deg)`,
        from: {
            height: '0px',
            transform: 'rotate(0deg)'
        }});

    const getIndex = () => {
        const { id } = props;
        const index = props.cards.findIndex(
            card => card.id === id
        );
        return index;

    }

    const accordionContent = () => {
        const index = getIndex();
        return (
            <Content style={{height: open && previous === open ? 'auto' : height}}>
            <animated.div className="anim-from-top hide-overflow" {...bind}>
            {props.cards[index].content}
            </animated.div>
            </Content>
        );
    }

    // const renderDate = () => {
    //     const index = this.getIndex();
    //     let { timeStamp } = this.props.cards[index];
    //     timeStamp = new Date(timeStamp);
    //     const now = new Date();
    //     if (timeStamp.toDateString() === now.toDateString()) {
    //         return "Today";
    //     }
    //     return timeStamp.toDateString().slice(0,9);
    // }

    const expandModal = () => {
        return setValue(state => {
            return state ? 0 : 1
        });
    }

    

    const renderCard = () => {
        const index = getIndex();
        const imageSource = `${domain}/uploads/${props.cards[index].cardImage}`;
        return(
            <div>
            <Card className="raised card-norad mb-2" fluid>
                <div></div> {/* For avoiding wierd card css from semantic-ui */}
                {props.cards[index].cardImage && <Image src={imageSource} alt="Couldn't load image" />}
                <div className={`card__labels__${props.cards[index].priority || 2}`}>
                </div>
                <Card.Content>
                <Card.Header className="card-header" onClick={expandModal}>
                    {props.cards[index].heading}
                    { 
                        props.cards[index] && props.cards[index].content && 
                    <animated.div className="float-right" style={{transform}}>
                    <Icon name="angle down"></Icon>     
                    </animated.div>
                    }
                </Card.Header>
                </Card.Content>
                <Card.Content>
                    <div>
                { props.cards[index] && props.cards[index].content && accordionContent() }
                </div>
                
                    </Card.Content>
            </Card>
            {/* <Card style={{height, transform}} className="raised card-norad mb-2" fluid>
            <Card.Content style={{height, transform}}>
            
            </Card.Content>
            </Card> */}
            </div>
        );
    }
        
    return(
        <div>
        {!props.loading && renderCard()}
        </div>
    );
}

const mapDispatchToProps = store => ({
    cards: store.cards,
    loading: store.loading
})

export default connect(mapDispatchToProps, null)(CardInfo)