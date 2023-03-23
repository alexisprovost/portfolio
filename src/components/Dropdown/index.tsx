// Dropdown.tsx
import React, { useState, useRef } from "react";
import "./dropdown.css";

interface Option {
	text: string;
	function: () => void;
}

interface DropdownProps {
	options: Option[];
	label?: string | JSX.Element;
	initialSelection?: Option;
}

const Dropdown: React.FC<DropdownProps> = ({ options, label, initialSelection }) => {
	const [selected, setSelected] = useState<Option>(initialSelection || options[0]);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const handleClickOutside = (event: MouseEvent) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
			setIsOpen(false);
		}
	};

	React.useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleLabelClick = () => {
		setIsOpen(!isOpen);
	};

	const handleOptionClick = (option: Option) => {
		setSelected(option);
		option.function();
		setIsOpen(false);
	};

	return (
		<div className="dropdown" ref={dropdownRef}>
			<div className="dropdown-label" onClick={handleLabelClick}>
				{label}
			</div>
			{isOpen && (
				<div className="dropdown-menu animate__animated animate__fadeIn animate__faster">
					{options.map((option, index) => (
						<div key={index} className={`dropdown-menu-item`} onClick={() => handleOptionClick(option)}>
							{option.text}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Dropdown;
