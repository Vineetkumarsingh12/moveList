import React from 'react'

const List = ({list,handleClick=()=>{
  
}}) => {
  return (
               <li
              key={list._id}
              className="border-b border-gray-300 py-4 flex items-center justify-between bg-white hover:bg-gray-100 rounded-lg shadow-md mb-2 p-2  cursor-pointer  "     onClick={e => handleClick(e,list._id)}
            >
              <div>
                <span className="text-lg font-medium text-gray-800">{list.name}</span>
                <span className="ml-2 text-sm text-gray-500">({list.url.length} Items)</span>
              </div>
              <div className="flex items-center">
                <span className={`text-xs font-bold ml-2 ${list.privateflag ? 'text-red-500' : 'text-green-500'}`}>
                  {list.privateflag ? 'Private' : 'Public'}
                </span>
              </div>
            </li>
  )
}

export default List
