import reportWebVitals from './reportWebVitals';
import { rerenderEntireTree } from './render'; 
import state from './State/State';
 
rerenderEntireTree(state);

reportWebVitals(); 
