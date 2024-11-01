import { useEffect, useRef, useState } from "react";

const periods = [
    {
        short: '1D',
        long: '1 Day'
    },
    {
        short: '1M',
        long: '1 Month'
    },
    {
        short: '6M',
        long: '6 Months'
    },
    {
        short: '1Y',
        long: '1 Year'
    },
    {
        short: 'ALL',
        long: 'All Time'
    }
]

const PeriodDropdown = () => {


    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [selectedPeriod, setSelectedPeriod] = useState(periods[0]);

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
            <div className="ss1:flex gap-3 hidden">
                {periods.map((period, index) => (
                    <button
                        key={index}
                        className='rounded-2xl border border-[#43507a] p-2 sm:px-3 py-1'
                    >
                        {period.short}
                    </button>
                ))}
            </div>
            <div className="relative ss1:hidden inline-block text-left" ref={dropdownRef}>
                <div>
                    <button
                        type="button"
                        className={`${isOpen ? "text-black" : "text-white"} inline-flex w-full justify-center gap-x-1.5 rounded-md  p-1 text-sm font-semibold  shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50`}
                        id="menu-button"
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                        onClick={toggleDropdown}
                    >
                        {selectedPeriod.short}
                        <svg
                            className="-mr-1 h-5 w-5 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                                clipRule="evenodd"
                            />
                        </svg>
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
                            {periods.map((period, index) => (
                                <div
                                    key={index}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    role="menuitem"
                                    onClick={() => {
                                        setSelectedPeriod(period);
                                        setIsOpen(false);
                                    }}
                                >
                                    {period.long}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default PeriodDropdown