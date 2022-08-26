import React from "react"

const LoginForm = ({ handleLogin, username, password, handleUsernameChange, handlePasswordChange }) => (
  <form onSubmit={handleLogin} className="space-y-3 mt-3">
    <div>
      <label>Username</label>

      <input placeholder="Enter your Username" type='text' className="placeholder:text-sm border-2 rounded-md border-blue-500 px-2 mx-2" value={username} onChange={handleUsernameChange}/>
    </div>

    <div>
      <label>Password</label>

      <input placeholder="Enter your Password" type='password' className="placeholder:text-sm border-2 rounded-md border-blue-500 px-2 mx-2" value={password} onChange={handlePasswordChange}/>
    </div>

    <button className="px-4 py-1 bg-green-500 hover:bg-green-600 rounded-md text-white shadow-md hover:shadow-lg transition duration-75 delay-75 ease-linear">Login</button>
  </form>
)

export default LoginForm