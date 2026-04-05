import { Routes, Route } from 'react-router-dom';
import { Button } from '@/components/ui/button';

function App() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <div className="flex items-center justify-center h-screen bg-background">
                        <Button>FlowForge is ready</Button>
                    </div>
                }
            />
            <Route path="*" element={<div>404 - Not Found</div>} />
        </Routes>
    );
}

export default App;