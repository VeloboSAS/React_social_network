import React from "react";
import s from './Dialogs.module.css';

const Dialogs = (props) => {
    return (
        <div className="dialogs">
           <div className="dialogs-items">
            <div className="item">
                Alex
            </div>
            <div className="item">
                Nastya
            </div>
            <div className="item">
                Alina
            </div>
            <div className="item">
                Artem
            </div>
           </div>
        </div>
    );
    
}

export default Dialogs;