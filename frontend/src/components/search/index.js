import React, { useState } from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import Button from 'react-bootstrap/Button';
function search({ setrecipe }) {
  // const [rec, setrec] = useState(null)
  // note: the id field is mandatory
  const items = [
    {
      name: 'pizza'
    },
    {
      name: 'baklava'
    },
    {
      name: 'waffles'
    },
    {
      name: 'chocolate cake'
    },
    {
      name: 'fried rice'
    }
  ]

  // const clickHandler = () => {
  //   console.log(rec);
  //   setrecipe(rec)
  // }
  const handleOnSearch = (string) => {
    setrecipe(string)
    // setrec(string)
  }
  const handleOnSelect = (item) => {
    setrecipe(item.name)
    // setrec(item.name)
  }
  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
      </>
    )
  }

  return (
    <div >
          <ReactSearchAutocomplete
            items={items}
            showIcon="false"
            autoFocus
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            placeholder='Search for recipies'
            formatResult={formatResult}
          />
        </div>
  )
}

export default search