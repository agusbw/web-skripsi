export default function Loading() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-full rounded-full bg-primary opacity-10"></div>
        <div className="border-t-4 border-b-4 rounded-full w-14 h-14 border-primary animate-spin"></div>
      </div>
    </div>
  );
}
