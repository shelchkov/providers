import React from 'react';
import { useSpring, animated } from 'react-spring';

function Cover() {

	var height = window.innerHeight;
	const coverHide = useSpring({
		bottom: height + 100,
		from: { bottom: 0 }
	})

	return (
		<div>
			<animated.div className="cover absolute left-0 right-0 top-0" 
				style={ coverHide }>
			</animated.div>
		</div>
	);
}

export default Cover;