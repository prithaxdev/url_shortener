import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "sileo";
import { resolveShortPath } from "@/features/urls";

const shortPath = resolveShortPath();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App shortPath={shortPath} />
    <Toaster position="top-center" theme="dark" />
  </StrictMode>,
);
