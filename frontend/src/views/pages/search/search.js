import React from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

function search({setrecipe}) {
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

  const handleOnSearch = (string) => {
    setrecipe(string)
  }
  const clearHandler=()=>{
    setrecipe('chicken')
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
      <div>
        <div style={{ width: 400 }}>
          <ReactSearchAutocomplete
            items={items}
            showIcon='false'
            onSearch={handleOnSearch}
            autoFocus
            onClear={clearHandler}
            placeholder='Search for recipies'
            formatResult={formatResult}
          />
        </div>
      </div>
    </div>
  )
}

export default search