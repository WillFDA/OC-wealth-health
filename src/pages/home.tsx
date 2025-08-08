export default function Home() {
  return (
    <form action='#' className='flex flex-col gap-4 bg-white shadow-md p-8 rounded-lg'>
      <div className='grid grid-cols-2 gap-4'>
        <div className='flex flex-col gap-2 col-span-1'>
          <label htmlFor='first-name'>First Name</label>
          <input className='' type='text' id='first-name' />
        </div>
        <div className='flex flex-col gap-2 col-span-1'>
          <label htmlFor='last-name'>Last Name</label>
          <input type='text' id='last-name' />
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div className='flex flex-col gap-2 col-span-1'>
          <label htmlFor='date-of-birth'>Date of Birth</label>
          <input id='date-of-birth' type='text' />
        </div>
        <div className='flex flex-col gap-2 col-span-1'>
          <label htmlFor='start-date'>Start Date</label>
          <input id='start-date' type='text' />
        </div>
      </div>

      <fieldset className='border border-gray-300 rounded-md p-4'>
        <legend className='text-lg font-bold'>Address</legend>
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex flex-col gap-2 col-span-1'>
            <label htmlFor='street'>Street</label>
            <input id='street' type='text' />
          </div>

          <div className='flex flex-col gap-2 col-span-1'>
            <label htmlFor='city'>City</label>
            <input id='city' type='text' />
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4 mt-4'>
          <div className='flex flex-col gap-2 col-span-1'>
            <label htmlFor='state'>State</label>
            <select name='state' id='state'></select>
          </div>

          <div className='flex flex-col gap-2 col-span-1'>
            <label htmlFor='zip-code'>Zip Code</label>
            <input id='zip-code' type='number' />
          </div>
        </div>
      </fieldset>

      <label htmlFor='department'>Department</label>
      <select name='department' id='department'>
        <option>Sales</option>
        <option>Marketing</option>
        <option>Engineering</option>
        <option>Human Resources</option>
        <option>Legal</option>
      </select>

      <button type='submit' className='bg-blue-500 text-white p-2 rounded-md'>
        Create Employee
      </button>
    </form>
  )
}
