import React, { useState } from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

import ModalTopAligned from './ReqModal';
import { Button, Label, Icon } from 'semantic-ui-react';
import { likeAsync, unlikeAsync } from '../actions/vote';
import { incrementVotes, decrementVotes } from '../actions/card';


function LikeNComment(props) {
  const [voted, setVoted] = useState((props.isLoggedIn && props.user && props.user.votes && props.user.votes.includes(props.cardId)) || false);
  const [isOpened, setOpened] = useState(false);

  const vote = () => {
    if(!props.isLoggedIn) {
      setOpened(!isOpened);
    } else {
      _.throttle((cardId, voted) => {
        if (voted) {
          setVoted(false);
          props.unlikeAsync(cardId)
            .then(res => {
              console.log(res);
              props.decrementVotes(cardId);
            })
        } else {
          setVoted(true);
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

  const getColor = () => {
    if (voted) {
      return "red";
    } else {
      return null;
    }
  }

  
	return(
		<div>
			<Button as='div' labelPosition='right'>
      <Button icon color={getColor()} onClick={vote}>
        <Icon name='heart' />
        <ModalTopAligned open={isOpened} closeModal={closeModal} />
      </Button>
      <Label as='a' basic pointing='left'>
        {props.cards[props.index] && props.cards[props.index].votes}
      </Label>
    </Button>
		</div>
	);
}

const mapStateToProps = state => {
  return {
    cards: state.cards,
    user: state.user,
    isLoggedIn: state.isLoggedIn
  };
}

export default connect(mapStateToProps, { unlikeAsync, likeAsync, incrementVotes, decrementVotes })(LikeNComment);