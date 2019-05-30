import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

import ModalTopAligned from './ReqModal';
import { Icon } from 'semantic-ui-react';
import { likeAsync, unlikeAsync } from '../actions/vote';
import { incrementVotes, decrementVotes } from '../actions/vote';
import { useSpring, animated, config } from 'react-spring';


function LikeNComment(props) {
  const [voted, setVoted] = useState((props.isLoggedIn && props.user && props.user.votes && props.user.votes.includes(props.cardId)) || false);
  useEffect(() => {
      setVoted((props.isLoggedIn && props.user && props.user.votes && props.user.votes.includes(props.cardId)) || false);
  }, [props]);
  const [isOpened, setOpened] = useState(false);
  const { transform, right } = useSpring({
    transform: voted ? `scale(1.2, 1.2)` : `scale(0, 0)`,
    right: voted ? `0em` : `0.1em`,
    from: {
      transform: 'scale(0, 0)'
    },
    config: config.wobbly
  });

  const vote = () => {
    if(!props.isLoggedIn) {
      setOpened(!isOpened);
    } else {
      _.throttle((cardId, voted) => {
        if (voted) {
          setVoted(!voted);
          props.unlikeAsync(cardId)
            .then(res => {
              console.log(res);
              props.decrementVotes(cardId);
            })
        } else {
          setVoted(!voted);
          props.likeAsync(props.cardId)
            .then(res => {
              console.log(res);
              props.incrementVotes(props.cardId);
            })
        }
      }, 2000)(props.cardId, voted);
    }
  }

  const closeModal = () => {
    setOpened(!isOpened);
  }

	return(
		<div>
      <Icon className="pointer-cursor" size="large" name="heart outline" color="grey" onClick={vote} />
      <span style={{verticalAlign: "bottom", marginLeft: "0.2em"}}>{props.cards[props.index] && props.cards[props.index].votes}</span>
      <animated.div className="pointer-cursor" style={{transform, right, marginTop: "-1.55em", position: "relative", width: "fit-content"}}><Icon onClick={vote} size="large" color="red" name="heart" /></animated.div>
      <ModalTopAligned open={isOpened} closeModal={closeModal} />
		</div>
	);
}

const mapStateToProps = state => {
  return {
    cards: state.cards,
    user: state.user,
    isLoggedIn: state.isLoggedIn,
    reqSent: state.reqSent    
  };
}

export default connect(mapStateToProps, { unlikeAsync, likeAsync, incrementVotes, decrementVotes })(LikeNComment);