import React from 'react'

const Qty = ({ stockLevel }) => {

  let content

  if (stockLevel === 'empty') {
    content = (
      <div className='text-xs font-medium text-slate-600'>
        Пусто
      </div>
    )
  } else if (stockLevel === 'low') {
    content = (
      <div className='text-xs font-medium text-red-600'>
        Мало
      </div>
    )
  } else if (stockLevel === 'full') {
    content = (
      <div className='text-xs font-medium text-emerald-600'>
        Достаточно
      </div>
    )
  }

  return content
}

export default Qty