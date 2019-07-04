import React, { Component } from 'react';
import { connect } from "react-redux";
import { Switch, Route } from 'react-router-dom';

import Board from './Board';
import Signup from './Signup';


function Content() {

	return(
		<Switch>
			<Route exact path="/" component={Board} />
			<Route exact path="/signup" component={Signup} />
			<Route exact path="/home" component={Board} />
		</Switch>
	);
}

const mapStateToProps = store => ({
    lists: store.lists,
    boards: store.boards.boards,
    loading: store.loading
})

export default connect(mapStateToProps, {})(Content);
