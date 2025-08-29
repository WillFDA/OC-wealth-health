import { HeroUIProvider } from '@heroui/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'
import Layout from './layout/layout'
import EmployeeList from './pages/employee-list'
import Home from './pages/home'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeroUIProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/employee-list' element={<EmployeeList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HeroUIProvider>
  </StrictMode>,
)
