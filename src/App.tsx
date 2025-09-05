import Login from "./pages/Login.tsx";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import type {ReactNode} from "react";
import AppContextProvider from "./context/AppContext.tsx";
import DashboardTabsMenu from "./pages/DashboardTabsMenu.tsx";

function App() {
    return (
        <AppContextProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login/> as ReactNode}/>
                    <Route path="/dashboard" element={<DashboardTabsMenu/> as ReactNode}/>
                    <Route path="*" element={<Login/> as ReactNode}/>
                </Routes>
            </Router>
        </AppContextProvider>
    )
}

export default App
