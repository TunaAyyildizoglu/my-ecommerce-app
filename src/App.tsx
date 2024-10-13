import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Header from "../src/components/Header/Header";
import AppRoutes from "../src/AppRoutes";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Header />
          <AppRoutes />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
