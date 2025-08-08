import { NavLink } from 'react-router'

export default function Header() {
  return (
    <header className='bg-white shadow-md'>
      <div className='flex justify-between items-center max-w-2xl mx-auto p-4'>
        <h1 className='text-2xl font-bold'>HRnet</h1>

        <nav className='flex gap-4'>
          <NavLink
            to='/'
            className={({ isActive }) =>
              'px-3 py-2 rounded ' +
              (isActive ? 'bg-blue-500 text-white' : 'text-blue-500 hover:bg-blue-100')
            }
          >
            Accueil
          </NavLink>

          <NavLink
            to='/employee-list'
            className={({ isActive }) =>
              'px-3 py-2 rounded ' +
              (isActive ? 'bg-blue-500 text-white' : 'text-blue-500 hover:bg-blue-100')
            }
          >
            Liste des employés
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
