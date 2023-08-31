import React, { FC } from "react";
import "./style.css";
import Link from "next/link";

interface FutureButtonProps {
	text: string | JSX.Element;
	color?: string;
	textColor?: string;
	to: string;
	className?: string;
}

const FutureButton: FC<FutureButtonProps> = ({ text, color, textColor, to, className = "" }) => {
	return (
		<Link href={to}>
			<button className={`generic-button ${className}`} style={{ backgroundColor: color, color: textColor }}>
				{text}
			</button>
		</Link>
	);
};

export default FutureButton;
