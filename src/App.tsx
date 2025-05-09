import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import ConfirmationDialog from "./components/ConfirmationDialog";
import Toast from "./components/Toast";
import { useAppSelector, useAppDispatch } from "./redux/hooks";
import { hideConfirmation } from "./redux/features/confirmation/confirmationSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { message, isOpen } = useAppSelector((state) => state.confirmation);
  const [onConfirmFn, setOnConfirmFn] = useState<() => void>(() => {});

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Cleanup timer
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <AuthProvider>
        <Navbar />
        <main className="min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary">
          <Toast />
          <Outlet context={{ setOnConfirmFn }} />
          <ConfirmationDialog
            isOpen={isOpen}
            message={message}
            onConfirm={() => {
              onConfirmFn();
              dispatch(hideConfirmation());
            }}
            onCancel={() => dispatch(hideConfirmation())}
          />
          
        </main>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
