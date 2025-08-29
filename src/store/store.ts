import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import type { Employee } from '../utils.ts/types'

const useStore = create(
  combine(
    {
      employees: JSON.parse(localStorage.getItem('employees') || '[]') as Employee[],
      modalState: false,
    },
    set => ({
      openModal: () => set({ modalState: true }),
      closeModal: () => set({ modalState: false }),
      addEmployee: (employee: Employee) =>
        set((state: { employees: Employee[] }) => {
          const newEmployees = [...state.employees, employee]
          localStorage.setItem('employees', JSON.stringify(newEmployees))
          return {
            employees: newEmployees,
            modalState: true,
          }
        }),
    }),
  ),
)

export default useStore
