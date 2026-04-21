import React, { useState } from 'react'
import { Input } from './ui/input'

function SearchInput() {
  const [search, setSearch] = useState("")
  return (
    <div>
        <Input type='text' value={search} placeholder='Search product' onChange={(e)=> setSearch(e.target.value)} className='w-80  ' />
       
    </div>
  )
}

export default SearchInput