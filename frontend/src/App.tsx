import { ThemeProvider } from "@mui/system";

import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import { UserProvider } from "./context/UserContext";

import AppRouter from "./routes";
import { theme } from "./shared/theme";

function App() {
    return (
        <div className="App">
            <Router>
                {/* TODO this might not be the best place to put userprovider */}
                <UserProvider>
                    <ThemeProvider theme={theme}>
                        <AppRouter />
                    </ThemeProvider>
                </UserProvider>
            </Router>
        </div>
    );
}

export default App;
