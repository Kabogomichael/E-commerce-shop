import React from 'react'
import { Input } from './ui/input'

function SearchInput() {
  return (
    <div>
        <Input type='text' placeholder='Search product' className='w-80  ' />
    </div>
  )
}

export default SearchInput