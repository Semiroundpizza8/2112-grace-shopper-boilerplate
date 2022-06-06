import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutPage = () => {
	return (
		<div>
			<p>Order Submitted successfully!!</p>
			<Link to='/'> Go Back to Home Page </Link>
		</div>
	);
};

export default CheckoutPage;
