import './style.scss'

import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';

const Modal = ({ isShowing, hide, children, className }) => isShowing ? ReactDOM.createPortal(

//     <React.Fragment>
//         <div className="modal-overlay" />
        
//         <div 
//             className="modal-wrapper" 
//             aria-modal 
//             aria-hidden 
//             tabIndex={-1} 
//             role="dialog">

//             <div className={ `modal ${className}` }>

//                 <div className="modal-header">
//                     <button 
//                         type="button" 
//                         className="modal-close-button" 
//                         data-dismiss="modal" 
//                         aria-label="Close" 
//                         onClick={ hide }>
//                         <span aria-hidden="true">&times;</span>
//                     </button>
//                 </div>

//                 <div className="modal-content">
//                     {children}
//                 </div>
//             </div>
//         </div>
        
//     </React.Fragment>, document.body
// ) : null;
<React.Fragment>
    <div className="modal-overlay"/>
    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className="modal">
        <div className="modal-header">
          <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <p>
          Hello, I'm a modal.
        </p>
      </div>
    </div>
  </React.Fragment>, document.body
) : null;

const useModal = () => {
    
    const [isShowing, setIsShowing] = useState(false);

    function toggle() {
        setIsShowing(!isShowing);
    }

    return {
        isShowing,
        toggle,
    }
};


export {
    Modal,
    useModal
};
