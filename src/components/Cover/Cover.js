import React from 'react';
// import './Cover.css';
// import { useSpring, animated } from 'react-spring';
import styled from "styled-components";

const CoverContainer = styled.div`
	position: absolute;
	top: ${props => props.top}px;
	left: 0;
	right: 0;
	bottom: ${props => props.bottom}px;

	background-color: #58AF9B;

	transition: top .8s ease-in-out, bottom .5s ease-in-out;
`;

function Cover({ top, bottom }) {
	console.log("Cover");

	return (
		<CoverContainer top={top} bottom={bottom}/>
	);
}

export default Cover;