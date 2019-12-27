import React from "react";
import Cover from "../Cover/Cover";

const ScreenHover = React.memo(({ coverUp, coverShow }) => {
	const height = window.innerHeight;

	const top = coverShow && coverUp ? 0 : (coverUp ? 0 : height);
	const bottom = coverShow && coverUp ? 0 : (coverUp ? height : 0);

	return <Cover top={top} bottom={bottom} />
})

export default ScreenHover;