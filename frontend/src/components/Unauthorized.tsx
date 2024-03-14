import { Link } from "react-router-dom"


export function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-center">
      <div className="space-y-2">
        <LockIcon className="w-20 h-20 mx-auto text-gray-500 dark:text-gray-400 animate-pulse" />
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Unauthorized Access</h1>
          <p className="text-gray-500 dark:text-gray-400">You don't have access to this page.</p>
          <p className="text-gray-500 dark:text-gray-400">Please Signup/signin to continue.</p>
        </div>
      </div>
      <Link to={'/'}>
      <div className="inline-flex h-10 items-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
>

        Go back to the homepage
        </div>
      </Link>
    </div>
  )
}

interface ServerIconProps extends React.SVGProps<SVGSVGElement> {
    // Define any additional props specific to your ServerIcon component
   
  }

function LockIcon(props : ServerIconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}
