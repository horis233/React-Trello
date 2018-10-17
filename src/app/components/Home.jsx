// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import slugify from 'slugify';

type Props = {
	boards: Array<{ title: string, _id: string }>
};

class Home extends Component<Props> {
	render = () => {
		const { boards } = this.props;
		return (
			<div>
				<Helmet>
					<title>Home | Trello</title>
				</Helmet>
				{boards.map((board) => (
					<Link key={board._id} to={`/b/${board._id}/${slugify(board.title, { lower: true })}`}>
						{board.title}
					</Link>
				))}
			</div>
		);
	};
}

const mapStateToProps = (state) => ({
	boards: Object.values(state.boardsById)
});

export default connect(mapStateToProps)(Home);
