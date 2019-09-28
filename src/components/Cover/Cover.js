import React from 'react';
import './Cover.css';
import { useSpring, animated } from 'react-spring';

function Cover() {
	var height = window.innerHeight;
	const coverShow = useSpring({
		top: 0,
		from: { top: height }
	})

	return (
		<div>
			<animated.div className="cover absolute left-0 right-0 bottom-0" 
				style={ coverShow }>
			</animated.div>
		</div>
	);
}

export default Cover;