import { Routes, Route } from 'react-router-dom';
import Canvas from '@/pages/Canvas';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ProtectedRoute from '@/components/ProtectedRoute';

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Canvas />
                    </ProtectedRoute>
                }
            />
            <Route path="*" element={<div>404 - Not Found</div>} />
        </Routes>
    );
}

export default App;