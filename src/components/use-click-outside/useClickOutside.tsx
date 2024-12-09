import { useEffect } from "react";

type TUseClickOutside = {
	menuRef: React.RefObject<HTMLDivElement>,
	isMenuOpen: boolean,
	setIsMenuOpen: (isOpen: boolean) => void

}

export const useClickOutside = ({menuRef, isMenuOpen, setIsMenuOpen}:TUseClickOutside) => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setIsMenuOpen(false);
			}
		};

		if (isMenuOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [menuRef, isMenuOpen, setIsMenuOpen]);
};