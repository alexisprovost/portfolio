import React, { FC } from "react";
import { Link } from "react-router-dom";
import "./style.css";

interface FutureButtonProps {
	text: string | JSX.Element;
	color?: string;
	textColor?: string;
	to: string;
	className?: string;
}

const FutureButton: FC<FutureButtonProps> = ({ text, color, textColor, to, className = "" }) => {
	return (
		<Link to={to}>
			<button className={`generic-button ${className}`} style={{ backgroundColor: color, color: textColor }}>
				{text}
			</button>
		</Link>
	);
};

export default FutureButton;
