import { createRoot } from 'react-dom/client';

import './global.css';


const rootNode = document.getElementById('root');

if (rootNode) {
  createRoot(rootNode).render(<div>Hello world!</div>);
}
