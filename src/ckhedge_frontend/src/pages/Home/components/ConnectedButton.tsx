import React, { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../../../hooks/auth/AuthContext';
import icblast from "@infu/icblast"
import { Principal } from '@psychedelic/dab-js';
import { FaRegCopy } from "react-icons/fa6";

type Balance = {
    name: string;
    value: number;
}


const tokens = [
    {
        name: "ICP",
        id: "ryjl3-tyaaa-aaaaa-aaaba-cai"
    },
    {
        name: "ckHedge",
        id: "r6qdv-dqaaa-aaaal-qmy7a-cai"
    }
]

type Ids = {
    principal: string;
    aid: string;
}

const ConnectedButton = () => {
    const [balances, setBalances] = useState<Balance[] | null>(null);
    const [ids, setIds] = useState<Ids>({ principal: "", aid: "" });
    const { logout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ids = localStorage.getItem("session-data");
        if (ids !== null) {
            const data = JSON.parse(ids);
            setIds({ principal: data.principalId, aid: data.aid });
            getBalances({ principal: data.principalId, aid: data.aid });
        }

    }, []);

    const getBalances = async (ids: Ids) => {
        if (ids.principal === "" || ids.aid === "") {
            console.error("Principal or Aid not available");
            return;
        }
        let _balances: Balance[] = [];
        for (let token of tokens) {
            let ic = icblast({
                local: false
            })

            const user = {
                owner: Principal.fromText(ids.principal),
                subaccount: null
            }
            let decimals = 8
            let actor = await ic(token.id)
            const bal = await actor.icrc1_balance_of(user);
            if (token.name !== "ICP") {
                decimals = await actor.icrc1_decimals();
            }
            const balance = Number(bal) / (10 ** decimals);
            _balances.push({ name: token.name, value: balance });
        }
        setBalances(_balances);
    };

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


    const truncateId = (id: string, length = 6) => {
        if (id.length <= length * 2) return id;
        return `${id.slice(0, length)}...${id.slice(-length)}`;
    };


    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
    };



    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <div>
                <button
                    type="button"
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    id="menu-button"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={toggleDropdown}
                >
                    Connected
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
                    className="absolute right-0 z-10 mt-2 w-64 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex={-1}
                >
                    <div className="py-3 px-4 border-b border-gray-200 text-sm text-gray-700" role="none">
                        <div className="flex items-center justify-between">
                            <p><strong>Principal ID:</strong></p>
                            <div className="flex items-center gap-1 cursor-pointer text-blue-500" onClick={() => copyToClipboard(ids.principal)}>
                                <span>{truncateId(ids.principal, 6)}</span>
                                <FaRegCopy />
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-1">
                            <p><strong>AID:</strong></p>
                            <div className="flex items-center gap-1 cursor-pointer text-blue-500" onClick={() => copyToClipboard(ids.aid)}>
                                <span>{truncateId(ids.aid, 6)}</span>
                                <FaRegCopy />
                            </div>
                        </div>
                    </div>

                    <div className="py-3 px-4" role="none">
                        <h3 className="text-sm font-semibold text-gray-800">Balances</h3>
                        {balances && balances.length > 0 ? (
                            <ul className="mt-2 space-y-1">
                                {balances.map((balance) => (
                                    <li key={balance.name} className="flex justify-between text-sm text-gray-700">
                                        <span>{balance.name}</span>
                                        <span>{balance.value.toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-500">No balances available</p>
                        )}
                    </div>

                    <div className="border-t border-gray-200" role="none">
                        <button
                            onClick={logout}
                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                        >
                            Disconnect
                        </button>
                    </div>
                </div>
            )}


        </div>
    );
};

export default ConnectedButton;
