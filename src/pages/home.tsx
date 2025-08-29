import { Autocomplete, AutocompleteItem, DatePicker, Input } from '@heroui/react'

import { Modal } from 'oc-modal-willfda'
import { useState } from 'react'
import useStore from '../store/store'
import type { Employee } from '../utils.ts/types'
import { states } from '../utils.ts/us-states'
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
    openModal()
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
      <Modal
        open={modalState}
        onClose={() => {
          closeModal()
        }}
      >
        <h1>Employee Created!</h1>
      </Modal>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-4 bg-white shadow-md p-8 rounded-lg border border-gray-300'
      >
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex flex-col gap-2 col-span-1'>
            <Input
              value={formData.firstName}
              onChange={e => setFormData({ ...formData, firstName: e.target.value })}
              type='text'
              label='First Name'
              labelPlacement='outside'
              placeholder='Enter first name'
              isRequired
              errorMessage='Enter a first name'
              variant='bordered'
              radius='sm'
            />
          </div>
          <div className='flex flex-col gap-2 col-span-1'>
            <Input
              value={formData.lastName}
              onChange={e => setFormData({ ...formData, lastName: e.target.value })}
              type='text'
              label='Last Name'
              labelPlacement='outside'
              placeholder='Enter last name'
              errorMessage='Enter a valid last name'
              isRequired
              variant='bordered'
              radius='sm'
            />
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex flex-col gap-2 col-span-1'>
            <DatePicker
              onChange={date => setFormData({ ...formData, dateOfBirth: date?.toString() || '' })}
              label='Date of Birth'
              className='max-w-[284px]'
              isRequired
              errorMessage='Select a valid date'
              variant='bordered'
              radius='sm'
            />
          </div>
          <div className='flex flex-col gap-2 col-span-1'>
            <DatePicker
              onChange={date => setFormData({ ...formData, startDate: date?.toString() || '' })}
              label='Start Date'
              className='max-w-[284px]'
              isRequired
              errorMessage='Select a valid date'
              variant='bordered'
              radius='sm'
            />
          </div>
        </div>

        <fieldset className='border border-gray-300 rounded-md p-4'>
          <legend className='text-lg font-bold'>Address</legend>
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col gap-2 col-span-1'>
              <Input
                value={formData.street}
                onChange={e => setFormData({ ...formData, street: e.target.value })}
                type='text'
                label='Street'
                labelPlacement='outside'
                placeholder='Enter street address'
                errorMessage='Enter a valid street address'
                variant='bordered'
                radius='sm'
              />
            </div>

            <div className='flex flex-col gap-2 col-span-1'>
              <Input
                isRequired
                value={formData.city}
                onChange={e => setFormData({ ...formData, city: e.target.value })}
                type='text'
                label='City'
                labelPlacement='outside'
                placeholder='Enter city'
                errorMessage='Enter a valid city'
                variant='bordered'
                radius='sm'
              />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4 mt-4'>
            <div className='flex flex-col gap-2 col-span-1'>
              <Autocomplete
                isRequired
                labelPlacement='outside'
                className='max-w-xs'
                label='State'
                selectedKey={formData.state}
                onSelectionChange={key => setFormData({ ...formData, state: key as string })}
                errorMessage='Select a valid state'
                variant='bordered'
                radius='sm'
              >
                {states.map(state => (
                  <AutocompleteItem key={state.abbreviation}>{state.name}</AutocompleteItem>
                ))}
              </Autocomplete>
            </div>

            <div className='flex flex-col gap-2 col-span-1'>
              <Input
                isRequired
                errorMessage='Please enter a valid zip code'
                label='Zip Code'
                labelPlacement='outside'
                name='Zip Code'
                placeholder='Enter your zip code'
                type='number'
                value={formData.zipCode}
                onChange={e => setFormData({ ...formData, zipCode: e.target.value })}
                variant='bordered'
                radius='sm'
              />
            </div>
          </div>
        </fieldset>
        <Autocomplete
          isRequired
          labelPlacement='outside'
          label='State'
          fullWidth
          selectedKey={formData.department}
          onSelectionChange={key => setFormData({ ...formData, department: key as string })}
          variant='bordered'
          radius='sm'
        >
          <AutocompleteItem key='Sales'>Sales</AutocompleteItem>
          <AutocompleteItem key='Marketing'>Marketing</AutocompleteItem>
          <AutocompleteItem key='Engineering'>Engineering</AutocompleteItem>
          <AutocompleteItem key='Human Resources'>Human Resources</AutocompleteItem>
          <AutocompleteItem key='Legal'>Legal</AutocompleteItem>
        </Autocomplete>

        <button type='submit' className='bg-blue-500 text-white p-2 rounded-md cursor-pointer'>
          Create Employee
        </button>
      </form>
    </>
  )
}
