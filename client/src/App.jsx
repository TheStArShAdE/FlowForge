import { Routes, Route } from 'react-router-dom';
import Canvas from '@/pages/Canvas';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Canvas />} />
            <Route path="*" element={<div>404 - Not Found</div>} />
        </Routes>
    );
}

export default App;