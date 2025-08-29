import { Outlet } from 'react-router'
import Header from '../components/header'

export default function Layout() {
  return (
    <main className='bg-gray-100 h-screen max-w-screen mx-auto overflow-x-hidden'>
      <Header />

      <div className='max-w-5xl mx-auto p-4'>
        <Outlet />
      </div>
    </main>
  )
}
