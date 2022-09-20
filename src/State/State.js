import img_1 from './1.jpg';
import img_2 from './2.jpg';
import img_3 from './3.jpg';
import img_4 from './4.jpg';

let state = {

    profilePages: {
       posts:  [
        { id: 1, message: "Hi, how are you?", likesCount: 15},
        { id: 2, message: "It's my first post", likesCount: 10},
        { id: 2, message: "Oups", likesCount: 1},
        { id: 3, message: "Oupsss", likesCount: 12},
      ],
    },

    dialogsPages: {
        dialogs: [
            {id: 1, name: 'Alex', img: {img_1}},
            {id: 2, name: 'Nastya', img: {img_2}},
            {id: 3, name: 'Alina', img: {img_3}},
            {id: 4, name: 'Artem', img: {img_4}},
    
    ],
        messages: [
            {id: 1, message: "Hi"},
            {id: 2, message: "Hi Hi"},
            {id: 3, message: 'Hello World'}
            ],
    },

};
export default state;