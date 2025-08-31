import {
  Button,
  getKeyValue,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  type SortDescriptor,
} from '@heroui/react'
import React, { useCallback, useMemo, useState } from 'react'
import useStore from '../store/store'
import type { Employee } from '../utils.ts/types'
import { employeeColumns } from '../utils.ts/utils'

export const SearchIcon = (props: any) => {
  return (
    <svg
      aria-hidden='true'
      fill='none'
      focusable='false'
      height='1em'
      role='presentation'
      viewBox='0 0 24 24'
      width='1em'
      {...props}
    >
      <path
        d='M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
      <path
        d='M22 22L20 20'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
    </svg>
  )
}

export default function EmployeeList() {
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [filterValue, setFilterValue] = useState('')
  const { employees } = useStore()
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: employeeColumns[0].key,
    direction: 'ascending',
  })

  const filteredItems = useMemo(() => {
    if (!filterValue) return employees

    return employees.filter(employee =>
      Object.values(employee).some(value =>
        value?.toString().toLowerCase().includes(filterValue.toLowerCase()),
      ),
    )
  }, [employees, filterValue])

  const sortedItems = React.useMemo(() => {
    return [...filteredItems].sort((a: Employee, b: Employee) => {
      const first = a[sortDescriptor.column as keyof Employee]
      const second = b[sortDescriptor.column as keyof Employee]
      const cmp = first < second ? -1 : first > second ? 1 : 0

      return sortDescriptor.direction === 'descending' ? -cmp : cmp
    })
  }, [sortDescriptor, filteredItems])

  const pages = Math.ceil(filteredItems.length / rowsPerPage)

  const employeeFiltered = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return sortedItems.slice(start, end)
  }, [page, sortedItems, rowsPerPage])

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1)
    }
  }, [page, pages])

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1)
    }
  }, [page])

  const onRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value))
    setPage(1)
  }, [])

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value)
      setPage(1)
    } else {
      setFilterValue('')
    }
  }, [])

  const onClear = useCallback(() => {
    setFilterValue('')
    setPage(1)
  }, [])

  const topContent = useMemo(() => {
    return (
      <div className='flex justify-between gap-3 items-end'>
        <Input
          isClearable
          className='w-full sm:max-w-[44%]'
          placeholder='Search'
          startContent={<SearchIcon />}
          value={filterValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
        <div className='flex justify-between items-center'>
          <span className='text-default-400 text-small'>Total {employeeFiltered.length} users</span>
          <label className='flex items-center text-default-400 text-small'>
            Rows per page:
            <select
              className='bg-transparent outline-solid outline-transparent text-default-400 text-small'
              onChange={onRowsPerPageChange}
            >
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='15'>15</option>
            </select>
          </label>
        </div>
      </div>
    )
  }, [filterValue, employeeFiltered, onSearchChange, employees.length, onRowsPerPageChange])

  const bottomContent = React.useMemo(() => {
    return (
      <div className='py-2 px-2 flex justify-between items-center'>
        <div></div>
        <Pagination
          isCompact
          showControls
          showShadow
          color='secondary'
          page={page}
          total={pages}
          onChange={page => setPage(page)}
        />
        <div className='hidden sm:flex w-[30%] justify-end gap-2'>
          <Button isDisabled={pages === 1} size='sm' variant='flat' onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={pages === 1} size='sm' variant='flat' onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    )
  }, [employeeFiltered.length, page, pages])

  return (
    <>
      <div className='flex flex-col items-center gap-4 mt-4'>
        <h1 className='text-2xl font-bold'>Current Employees</h1>
        <div className='bg-white border border-gray-300 rounded-lg shadow-md p-8 w-full'>
          <Table
            isStriped
            topContent={topContent}
            removeWrapper
            aria-label='Employee table with sorting'
            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor}
            bottomContent={bottomContent}
            classNames={{
              wrapper: 'min-h-[222px]',
            }}
          >
            <TableHeader columns={employeeColumns}>
              {column => (
                <TableColumn allowsSorting key={column.key}>
                  {column.label}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody emptyContent={'No rows to display.'} items={employeeFiltered}>
              {item => (
                <TableRow key={item.lastName + item.firstName}>
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
