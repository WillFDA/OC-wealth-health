import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react'
import { useAsyncList } from '@react-stately/data'
import useStore from '../store/store'
import { employeeColumns, transformEmployeeData } from '../utils.ts/utils'

export default function EmployeeList() {
  const { employees } = useStore()

  const list = useAsyncList({
    async load() {
      return { items: transformEmployeeData(employees) }
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          const first = a[sortDescriptor.column as keyof typeof a]
          const second = b[sortDescriptor.column as keyof typeof b]

          if (typeof first === 'string' && typeof second === 'string') {
            return sortDescriptor.direction === 'descending'
              ? second.localeCompare(first)
              : first.localeCompare(second)
          }

          const cmp = first < second ? -1 : 1
          return sortDescriptor.direction === 'descending' ? cmp * -1 : cmp
        }),
      }
    },
  })
  return (
    <>
      <div className='flex flex-col items-center gap-4 mt-4'>
        <h1 className='text-2xl font-bold'>Current Employees</h1>
        <div className='bg-white border border-gray-300 rounded-lg shadow-md p-8 w-full'>
          <Table
            isStriped
            removeWrapper
            aria-label='Employee table with sorting'
            sortDescriptor={list.sortDescriptor}
            onSortChange={list.sort}
          >
            <TableHeader columns={employeeColumns}>
              {column => (
                <TableColumn allowsSorting key={column.key}>
                  {column.label}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody emptyContent={'No rows to display.'} items={list.items}>
              {item => (
                <TableRow key={item.key}>
                  {columnKey => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}
