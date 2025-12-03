import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

import Admin from "./pages/Admin";
import AdminList from "./pages/Admin/AdminList";
import AdminCreate from "./pages/Admin/AdminCreate";
import AdminEdit from "./pages/Admin/AdminEdit";
import AdminTrash from "./pages/Admin/AdminTrash";

import ProtectedRoute from "./components/ProtectedRoute";
import UserProtectedRoute from "./components/UserProtectedRoute";
import Header from "./components/Header";

export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/produto/:id" element={<ProductDetails />} />
        <Route path="/carrinho" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

       
        <Route
          path="/perfil"
          element={
            <UserProtectedRoute>
              <Profile />
            </UserProtectedRoute>
          }
        />

       
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminList />} />
          <Route path="create" element={<AdminCreate />} />
          <Route path="edit/:id" element={<AdminEdit />} />
          <Route path="trash" element={<AdminTrash />} />
        </Route>

        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
