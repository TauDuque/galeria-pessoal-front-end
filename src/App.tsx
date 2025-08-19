import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { store } from "./store";
import { useAppDispatch, useAppSelector } from "./store";
import { getCurrentUser } from "./store/slices/authSlice";
import AppRoutes from "./routes/AppRoutes";
import "react-toastify/dist/ReactToastify.css";

function AppContent() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <div className="min-h-screen bg-background">
      <Router>
        <AppRoutes />
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        className="mt-16"
      />
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
