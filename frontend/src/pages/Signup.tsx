
export function Signup() {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create an account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?
            <a className="font-medium text-indigo-600 hover:text-indigo-500" href="#">
              Login
            </a>
          </p>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form action="#" className="space-y-6" method="POST">
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="username">
                  Username
                </label>
                <div className="mt-1">
                  <input
                    autoComplete="username"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    required
                    type="text"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    autoComplete="email"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    id="email"
                    name="email"
                    placeholder="m@example.com"
                    required
                    type="email"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    autoComplete="current-password"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    id="password"
                    name="password"
                    required
                    type="password"
                  />
                </div>
              </div>
              <div>
                <button
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-12 sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <blockquote className="text-center">
              <p className="text-lg font-medium text-gray-900">
                “The customer service I received was exceptional. The support team went above and beyond to address my
                concerns.”
              </p>
              <footer className="mt-4">
                <p className="text-base font-semibold text-gray-700">Jules Winnfield</p>
                <p className="text-sm text-gray-500">CEO, Acme Inc</p>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    )
  }
  
  
  



