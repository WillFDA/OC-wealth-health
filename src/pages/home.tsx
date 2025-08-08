import { useState } from 'react'
import Modal from '../components/modal'
import useStore from '../store/store'
import type { Employee } from '../utils.ts/types'

export default function Home() {
  const modalState = useStore(state => state.modalState)
  const openModal = useStore(state => state.openModal)
  const closeModal = useStore(state => state.closeModal)
  const [formData, setFormData] = useState<Employee>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    startDate: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    department: '',
  })

  const addEmployee = useStore(state => state.addEmployee)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addEmployee(formData)
    setFormData({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      startDate: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      department: '',
    })
  }

  return (
    <>
      <button
        className='bg-blue-500 text-white p-2 rounded-md cursor-pointer my-6'
        onClick={() => openModal()}
      >
        Open Modal
      </button>
      <Modal
        open={modalState}
        onClose={() => {
          closeModal()
          console.log('Je ferme la modal')
        }}
      >
        <h1>Hello</h1>
      </Modal>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-4 bg-white shadow-md p-8 rounded-lg border border-gray-300'
      >
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex flex-col gap-2 col-span-1'>
            <label htmlFor='first-name'>First Name</label>
            <input
              value={formData.firstName}
              onChange={e => setFormData({ ...formData, firstName: e.target.value })}
              className=''
              type='text'
              id='first-name'
            />
          </div>
          <div className='flex flex-col gap-2 col-span-1'>
            <label htmlFor='last-name'>Last Name</label>
            <input
              value={formData.lastName}
              onChange={e => setFormData({ ...formData, lastName: e.target.value })}
              type='text'
              id='last-name'
            />
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex flex-col gap-2 col-span-1'>
            <label htmlFor='date-of-birth'>Date of Birth</label>
            <input
              value={formData.dateOfBirth}
              onChange={e => setFormData({ ...formData, dateOfBirth: e.target.value })}
              id='date-of-birth'
              type='text'
            />
          </div>
          <div className='flex flex-col gap-2 col-span-1'>
            <label htmlFor='start-date'>Start Date</label>
            <input
              value={formData.startDate}
              onChange={e => setFormData({ ...formData, startDate: e.target.value })}
              id='start-date'
              type='text'
            />
          </div>
        </div>

        <fieldset className='border border-gray-300 rounded-md p-4'>
          <legend className='text-lg font-bold'>Address</legend>
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col gap-2 col-span-1'>
              <label htmlFor='street'>Street</label>
              <input
                value={formData.street}
                onChange={e => setFormData({ ...formData, street: e.target.value })}
                id='street'
                type='text'
              />
            </div>

            <div className='flex flex-col gap-2 col-span-1'>
              <label htmlFor='city'>City</label>
              <input
                value={formData.city}
                onChange={e => setFormData({ ...formData, city: e.target.value })}
                id='city'
                type='text'
              />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4 mt-4'>
            <div className='flex flex-col gap-2 col-span-1'>
              <label htmlFor='state'>State</label>
              <select
                value={formData.state}
                onChange={e => setFormData({ ...formData, state: e.target.value })}
                name='state'
                id='state'
              >
                <option value='Alabama'>Alabama</option>
                <option value='Alaska'>Alaska</option>
                <option value='Arizona'>Arizona</option>
                <option value='Arkansas'>Arkansas</option>
                <option value='California'>California</option>
              </select>
            </div>

            <div className='flex flex-col gap-2 col-span-1'>
              <label htmlFor='zip-code'>Zip Code</label>
              <input
                value={formData.zipCode}
                onChange={e => setFormData({ ...formData, zipCode: e.target.value })}
                id='zip-code'
                type='number'
              />
            </div>
          </div>
        </fieldset>

        <label htmlFor='department'>Department</label>
        <select
          value={formData.department}
          onChange={e => setFormData({ ...formData, department: e.target.value })}
          name='department'
          id='department'
        >
          <option>Sales</option>
          <option>Marketing</option>
          <option>Engineering</option>
          <option>Human Resources</option>
          <option>Legal</option>
        </select>

        <button type='submit' className='bg-blue-500 text-white p-2 rounded-md cursor-pointer'>
          Create Employee
        </button>
      </form>
    </>
  )
}
