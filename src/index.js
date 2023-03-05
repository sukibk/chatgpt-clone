import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import LoginProvider from "./components/store/LoginProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<LoginProvider><App /></LoginProvider>);
