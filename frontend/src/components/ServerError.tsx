
export  function ServerError({errorContent} : {errorContent : string}) {
    return (
      <div className="px-4 md:px-6 py-6 w-full flex items-center justify-center flex-col gap-4">
        <div className="flex items-center gap-4 flex-col sm:flex-row sm:gap-8 text-center">
          <ServerIcon className="w-24 h-24" />
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">Internal Server Error</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {errorContent}
            </p>
          </div>
        </div>
      </div>
    )
  }
  
  interface ServerIconProps extends React.SVGProps<SVGSVGElement> {
    // Define any additional props specific to your ServerIcon component
   
  }

  function ServerIcon(props : ServerIconProps) {
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
        <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
        <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
        <line x1="6" x2="6.01" y1="6" y2="6" />
        <line x1="6" x2="6.01" y1="18" y2="18" />
      </svg>
    )
  }
  