import React from 'react';
import PropTypes from 'prop-types';

import './AuthError.scss';

const AuthError = (props) => {
	const { errorMsg } = props;

	return (
		<div className='exc-authError__label'>
			<span>{errorMsg}</span>
		</div>
	);
};

AuthError.propTypes = {
	errorMsg: PropTypes.string.isRequired
};

export default AuthError;
