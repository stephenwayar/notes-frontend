import React, { useState } from 'react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  return (
    <div>
      <div style={hideWhenVisible}>
        <button className="px-4 py-1 bg-purple-500 hover:bg-orange-600 mt-4 rounded-md text-white shadow-md hover:shadow-lg transition duration-75 delay-75 ease-linear" onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>

      <div style={showWhenVisible}>
        {props.children}

        <button className="px-4 py-1 bg-red-500 hover:bg-red-600 mt-4 rounded-md text-white shadow-md hover:shadow-lg transition duration-75 delay-75 ease-linear" onClick={toggleVisibility}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default Togglable