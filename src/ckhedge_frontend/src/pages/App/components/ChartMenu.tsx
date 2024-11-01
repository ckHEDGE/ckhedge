import { useEffect, useRef, useState } from "react";
import { FiCamera, FiSettings } from "react-icons/fi";
import { MdFullscreen } from "react-icons/md";
import { MdMenu } from "react-icons/md";

const ChartMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };
    return (
        <>
            <div className="xs1:flex hidden gap-3 ml-3">
                <button>
                    <FiSettings size={18} />
                </button>
                <button>
                    <FiCamera size={18} />
                </button>
                <button>
                    <MdFullscreen size={25} />
                </button>
            </div>
            <div className="relative xs1:hidden inline-block text-left" ref={dropdownRef}>
                <div>
                    <button
                        type="button"
                        className="inline-flex w-full justify-center gap-x-1.5  rounded-md text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset"
                        id="menu-button"
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                        onClick={toggleDropdown}
                    >
                        <MdMenu size={25} className="text-white" />
                    </button>
                </div>

                {isOpen && (
                    <div
                        className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                        tabIndex={-1}
                    >
                        <div className="py-1" role="none">
                            <a
                                href="#"
                                className="text-gray-700 block px-4 py-2 text-sm"
                                role="menuitem"
                            >
                                Settings
                            </a>
                            <a
                                href="#"
                                className="text-gray-700 block px-4 py-2 text-sm"
                                role="menuitem"
                            >
                                Fullscreen
                            </a>
                            <a
                                href="#"
                                className="text-gray-700 block px-4 py-2 text-sm"
                                role="menuitem"
                            >
                                Capture
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default ChartMenu