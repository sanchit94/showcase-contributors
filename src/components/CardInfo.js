import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

import { Card, Image, Icon } from 'semantic-ui-react';
import { useMeasure, usePrevious } from './helpers/react-spring-helpers';

import { domain } from '../constants';
import LikeNComment from './LikeNComment';


const Content = styled(animated.div)`
  will-change: transform, height;
  overflow: hidden;
`;


function CardInfo(props) {
    const [isOpen, setOpen] = useState(false);
    const previous = usePrevious(isOpen);
    const [bind, { height: viewHeight }] = useMeasure();
    const { height, transform } = useSpring({
			height: isOpen ? `${viewHeight}px` : '0px',
			transform: isOpen ? `rotate(-180deg)`: `rotate(0deg)`,
			from: {
				height: '0px',
				transform: 'rotate(0deg)'
			}
		});

    const getIndex = () => {
			return props.cards.findIndex(
				card => card.id === props.id
			);
		}

		const toggleModal = () => {
			return setOpen(!isOpen);
    }

    const accordionContent = () => {
			const index = getIndex();
			return (
				<Content style={{height: isOpen && previous === isOpen ? 'auto' : height}}>
				{/* Using dangerouslySetInnerHtml so that html can inserted instead of simple text. This can be risky as it can enable Cross Site Scripting, but we don't have that kind of data here so it's harmless for now. */}
				<animated.div className="anim-from-top hide-overflow" {...bind} dangerouslySetInnerHTML={{__html: props.cards[index].content}}>
				{/* {props.cards[index].content} */}
				</animated.div>
				</Content>
			);
		}

    const renderCard = () => {
			const index = getIndex();
			const imageSource = `${domain}/uploads/${props.cards[index].cardImage}`;
			return(
					<Card className="raised card-norad mb-2 pop-up" fluid>
							<div></div> {/* For avoiding wierd card styling from semantic-ui */}
							{props.cards[index].cardImage && <Image src={imageSource} alt="Couldn't load image" />}
							<div className={`card__labels__${props.cards[index].priority || 2}`}>
							</div>
							<Card.Content>
							<Card.Header className={`card-header ${props.cards[index].content && 'pointed'}`} onClick={toggleModal}>
									<span style={{ display: "inline-block", width: "80%" }}>{props.cards[index].heading}</span>
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
							<Card.Content>
								<LikeNComment cardId={props.cards[index].id} index={index} />
							</Card.Content>
					</Card>
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
