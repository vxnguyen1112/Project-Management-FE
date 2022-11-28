import React, { useState, useEffect, useRef } from "react";
import './index.css';

const DropdownMenu = (props) => {
    const {items} = props;
    const [isOpen, setIsOpen] = useState(false);
    const btnRef = useRef();

    useEffect(() => {
        const closeDropdown = e => {
            if(e.path[1] !== btnRef.current) {
                setIsOpen(false);
            }
        }

        document.body.addEventListener('click', closeDropdown);

        return () => {
            document.body.removeEventListener('click', closeDropdown);
        }
    },[])

    return (
        <React.Fragment>
            <div className="dropdown">
                <button 
                    type="button"
                    ref={btnRef}
                    onClick={() => setIsOpen(prev => !prev)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
                        <g fill="currentColor" fillRule="evenodd">
                            <circle cx="5" cy="12" r="2" />
                            <circle cx="12" cy="12" r="2" />
                            <circle cx="19" cy="12" r="2" />
                        </g>
                    </svg>
                </button>
                <ul className={isOpen ? 'dropdown-list dropdown-open' : 'dropdown-list'}>
                    {items.map(item => (
                        <li 
                            key={item.id} 
                            onClick={() => item.callback()}>
                                <a href="#">{item.content}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </React.Fragment>
    );
}

export default DropdownMenu;