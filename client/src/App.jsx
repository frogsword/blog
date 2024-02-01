/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from "react"
import { Home } from "./pages/home/home"
import { Navbar } from "./components/navbar/Navbar"
import { Login } from './components/login/Login'
import { Register } from './components/register/Register'
import { Post } from "./pages/post/post"
import AuthProvider from './context/AuthProvider'
import './styles.scss'
import * as bootstrap from 'bootstrap'
function App() {
  return (
    <>
      <Router>
        <AuthProvider>
        <Navbar />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />}/>
              <Route path="/posts/:postid" element={<Post />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
