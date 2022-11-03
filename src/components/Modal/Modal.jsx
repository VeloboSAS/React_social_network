import React, {useState} from "react";
import s from './Modal.module.scss';

const Modal = () => {

    const [open, setOpen] = useState(false)
    return (
        <div className={s.App}>
          <button onClick={() => setOpen(true)} className={s.open_modal_btn}>✨ Открыть окно</button>
          {open && (
          <div className={s.overlay}>
            <div className={s.modal}>
              <svg onClick={() => setOpen(false)} height="200" viewBox="0 0 200 200" width="200">
                <title />
                <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
              </svg>
              <h3>This is modal Window</h3>
              <img src='https://i.gifer.com/origin/d6/d66620ccdb4aee4182879a2c07d393ef_w200.webp' alt="gif"/>
            </div>
          </div>
          )};
        </div>
      );
    }

export default Modal;