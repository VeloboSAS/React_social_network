import React from "react";
import s from './Dialogs.module.css';

const Dialogs = (props) => {
    return (
            <div className={s.dialogs}>
                <div className={s.dialogsItems}>
                        <div className={s.dialog + ' ' + s.active}>
                            Alex
                        </div>
                        <div className={s.dialog}>
                            Nastya
                        </div>
                        <div className={s.dialog}>
                            Alina
                        </div>
                        <div className={s.dialog}>
                            Artem
                        </div>
                </div>
                <div className={s.messages}>
                    <div className={s.message}>Hi</div>
                    <div className={s.message}>Hi Hi</div>
                    <div className={s.message}>Hello World</div>
                </div>
            </div>
    );
    
}

export default Dialogs;