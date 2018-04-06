import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// eslint-disable-next-line
import Logout from 'Components/Logout/Logout';

// Component styles
// import './Header.scss';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		const { profile } = this.props;
		return (
			<nav className='navbar is-transparent'>
				<div className='navbar-brand'>
					<a className='navbar-item' href='https://bulma.io'>
						<img src='https://bulma.io/images/bulma-logo.png' alt='Bulma: a modern CSS framework based on Flexbox' width='112' height='28' />
					</a>
					<div className='navbar-burger burger' data-target='navbarExampleTransparentExample'>
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>

				<div id='navbarExampleTransparentExample' className='navbar-menu'>
					<div className='navbar-start'>
						<a className='navbar-item' href='https://bulma.io/'>
              Home
						</a>
					</div>
					<div className='navbar-end'>
						<div className='navbar-item has-dropdown is-hoverable'>
							<p className='navbar-item'>
								<span>{profile.firstName}</span>
							</p>
							<a className='navbar-link'>Esci</a>
							<Logout profile={profile} />
						</div>
					</div>
				</div>
			</nav>
		);
	}
}
Header.propTypes = {
	profile: PropTypes.object
};

function mapStateToProps(state) {
	const { auth } = state;
	const { profile } = auth;

	return {
		profile
	};
}

export default connect(mapStateToProps)(Header);
