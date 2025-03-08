import MyRoutes from "./routes/routes";
import { useState } from "react";
import { Provider } from "react-redux";
import { ReduxStore } from "./store/redux/reduxStore";
import { AuthProvider } from '../src/auth/authProvieder'; // Correcting the typo here

function App() {
  const [token, setToken] = useState(null);
  return (
    <>
      <AuthProvider>
        <Provider store={ReduxStore}>
          <MyRoutes />
        </Provider>
      </AuthProvider>
    </>
  );
}

export default App;
