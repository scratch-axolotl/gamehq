import React, { useState } from 'react';
import onClickOutside from 'react-onclickoutside';

// INDIVIDUAL SEARCH DROPDOWN CREATOR FUNCTION //
const SearchDropDown = ({ category, title, items = [], multiSelect = true, searchState }) => {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState([]);
  const toggle = () => setOpen(!open);

  // ONCLICK-OUTSIDE //
  // SearchDropdown.handleClickOutisde = () => setOpen(false);

  // FUNCTION FOR ADDING ITEM TO SELECTION //
  const handleOnClick = (item) => {
    if (!selection.some((current) => current.id === item.id)) {
      if (!multiSelect) {
        setSelection([item]);
      } else if (multiSelect) {
        setSelection([...selection, item]);
        searchState(category, [...selection, item]);
      }
    } else {
      let selectionAfterRemoval = selection;
      selectionAfterRemoval = selectionAfterRemoval.filter((current) => current.id !== item.id);
      setSelection([...selectionAfterRemoval]);
      searchState(category, [...selectionAfterRemoval]);
    }
  };

  // FUNCTION FOR IS ITEM IN SELECTION //
  const isItemInSelection = (item) => {
    if (selection.find((current) => current.id === item.id)) {
      return true;
    }
    return false;
  };

  // CONSOLE LOG SELECTED ITEMS //
  // console.log(selection);

  // RENDER RETURN //
  return (
    <div className='dd-wrapper'>
      <div tabIndex={0} className='dd-header' role='button' onKeyPress={() => toggle(!open)} onClick={() => toggle(!open)}>
        <div className='dd-header__title'>
          <p className='dd-header__title--bold'>{title}</p>
        </div>
        <div className='dd-header__action'>
          <p>{open ? 'Close' : 'Open'}</p>
        </div>
      </div>
      {open && (
        <ul className='dd-list'>
          {items.map((item) => (
            <li className='dd-list-item' key={item.id}>
              <button type='button' onClick={() => handleOnClick(item)}>
                <span>{item.name}</span>
                <span>{isItemInSelection(item) && 'Selected'}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// ONCLICK OUTSIDE //
// const clickOutsideConfig = {
//   handleClickOutside: () => SearchDropdown.handleClickOutisde,
// };

// export default onClickOutside(SearchDropdown, clickOutsideConfig);
export default SearchDropDown;
