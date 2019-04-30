import React from 'react';
import { Button, Label, Icon } from 'semantic-ui-react';

function LikeNComment() {
	return(
		<div>
			<Button as='div' labelPosition='right'>
      <Button icon>
        <Icon name='heart' />
        Like
      </Button>
      <Label as='a' basic pointing='left'>
        2,048
      </Label>
    </Button>
		</div>
	);
}

export default LikeNComment;