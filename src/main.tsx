import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'
import EmployeeList from './pages/employee-list'
import Home from './pages/home'
import Layout from './layout/layout'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/employee-list' element={<EmployeeList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
