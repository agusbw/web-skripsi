export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-full rounded-full bg-primary opacity-10"></div>
        <div className="border-t-4 border-b-4 rounded-full w-14 h-14 border-primary animate-spin"></div>
      </div>
    </div>
  );
}

export function SubmittingIndicator() {
  return (
    <svg
      className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke-width="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      ></path>
    </svg>
  );
}
