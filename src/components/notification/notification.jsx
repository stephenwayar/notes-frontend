const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="py-2 px-4 w-full bg-red-300 text-gray-700">
      {message}
    </div>
  )
}

export default Notification