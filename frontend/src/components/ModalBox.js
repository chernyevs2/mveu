import './ModalBox.css';
import React from 'react';

function ModalBox({ setModalBox, children }) {
  return (
    <>
    <div className='echo' onClick={() => setModalBox('none')}></div>
    <div className="ModalBox">
      {children}
    </div>
    
    </>
  );
}

export default ModalBox;