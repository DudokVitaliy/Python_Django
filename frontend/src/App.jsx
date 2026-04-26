import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CategoryCreatePage from "./pages/CategoryCreatePage";

function App() {
  return (
    <GoogleOAuthProvider clientId="411404831002-a12d56udg3d05clhmu9utufav3hks1b9.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path={"categories"}>
            <Route path="create" element={<CategoryCreatePage />} />
            <Route path="edit/:id" element={<CategoryEditPage />} />
            <Route path="delete/:id" element={<CategoryDeletePage />} />
            <Route path="categories" element={<CategoryListPage />} />        
          </Route>
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;