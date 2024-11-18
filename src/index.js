import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom"
// import { Provider } from 'react-redux';
// import { store } from './state/store';
import {MyContext} from "./state/context/context"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <Provider >
     <BrowserRouter>
      <MyContext>
        <App />
      </MyContext>
     </BrowserRouter>
    // </Provider>
);

