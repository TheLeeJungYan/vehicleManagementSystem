import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import Dashboard from "@/Dashboard.tsx";
import "@ant-design/v5-patch-for-react-19";
createRoot(document.getElementById("root")!).render(

    <StrictMode>
      <Dashboard />
    </StrictMode>
);
