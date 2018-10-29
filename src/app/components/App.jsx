import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './Home/Home';
import Board from './Board/Board';
import LandingPage from './LandingPage';
import './App.scss';

const App = ({ user }) => {
	if (true) {
		return (
			<div>
				<Route exact path="/" component={Home} />
				<Route path="/login" component={LandingPage} />
				<Route path="/b/:boardId" component={Board} />
			</div>
		);
	}
	return (
		<Switch>
			<Route exact path="/" component={LandingPage} />
			<Redirect to="/" />
		</Switch>
	);
};

App.propTypes = { user: PropTypes.object };

const mapStateToProps = (state) => ({ user: state.user });

export default withRouter(connect(mapStateToProps)(App));
