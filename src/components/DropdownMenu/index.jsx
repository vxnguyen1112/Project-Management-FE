import React from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './index.css';

const DropdownMenu = (props) => {
    const {items} = props;

    return (
        <React.Fragment>
            <Dropdown options={items} onChange={() => {}} value={items[0]} placeholder="Select an option" />
        </React.Fragment>
    );
}

export default DropdownMenu;    