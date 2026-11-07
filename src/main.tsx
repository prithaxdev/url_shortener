import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "@/components/ui/sonner";
import { resolveShortPath } from "@/features/urls";

const shortPath = resolveShortPath();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App shortPath={shortPath} />
    <Toaster />
  </StrictMode>,
);
