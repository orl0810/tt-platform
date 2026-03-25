import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@tt-platform/shared";
import AppRoutes from "./routes";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
