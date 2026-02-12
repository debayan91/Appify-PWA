import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initLauncher } from "./launcher";

createRoot(document.getElementById("root")!).render(<App />);

initLauncher();
