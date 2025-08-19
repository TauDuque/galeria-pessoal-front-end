import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { useAppDispatch, useAppSelector } from "./store";
import { getCurrentUser } from "./store/slices/authSlice";
import AppRoutes from "./routes/AppRoutes";
import ToastNotifications from "./components/common/ToastNotifications";

function AppContent() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Se tem token mas não tem usuário, buscar dados do usuário
    if (token && isAuthenticated) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, token, isAuthenticated]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Router>
        <AppRoutes />
      </Router>
      <ToastNotifications />
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
