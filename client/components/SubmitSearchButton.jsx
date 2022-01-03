import React, { useState } from 'react';

export const SubmitSearchButton = () => {
  return (
    <div className='submitSearch'>
      <button
        className='submitSearchButton'
        onClick={() => {
          console.log('submit button clicked');
          // console.log(document.getElementById('dropDownsContainer'));
        }}
      >
        SUBMIT SEARCH
      </button>
    </div>
  );
};
