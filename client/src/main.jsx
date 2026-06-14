import { createRoot } from 'react-dom/client';
import './index.css';
import GlobalProvider from './app/providers/GlobalProvider.jsx';

createRoot(document.getElementById('root')).render(<GlobalProvider />);
