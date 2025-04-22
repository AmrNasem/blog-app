function InfoSideSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={`${className} bg-gray-50 min-w-[300px] px-5 pt-15 space-y-8 min-h-dvh animate-pulse`}
    >
      <div className="max-w-48 mx-auto">
        <div className="relative block w-25 h-25 rounded-full overflow-hidden mx-auto border-3 border-gray-200 bg-gray-200"></div>
        <div className="h-5 w-32 bg-gray-200 mx-auto rounded my-4"></div>
        <div className="h-3 w-48 bg-gray-200 mx-auto rounded mt-3"></div>
        <div className="h-3 w-48 bg-gray-200 mx-auto rounded mt-1"></div>
      </div>
      <div className="flex justify-between items-center p-1 mt-10">
        <div className="text-center flex-grow-1 border-e px-2 py-1">
          <div className="h-6 w-12 bg-gray-200 mx-auto rounded"></div>
          <div className="h-4 w-16 bg-gray-200 mx-auto rounded mt-1"></div>
        </div>
        <div className="text-center flex-grow-1 border-e px-2 py-1">
          <div className="h-6 w-12 bg-gray-200 mx-auto rounded"></div>
          <div className="h-4 w-16 bg-gray-200 mx-auto rounded mt-1"></div>
        </div>
        <div className="text-center flex-grow-1 px-2 py-1">
          <div className="h-6 w-12 bg-gray-200 mx-auto rounded"></div>
          <div className="h-4 w-16 bg-gray-200 mx-auto rounded mt-1"></div>
        </div>
      </div>
      <div>
        <div className="h-5 w-24 bg-gray-200 rounded mb-3"></div>
        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="h-4 w-5/6 bg-gray-200 rounded mt-1"></div>
        <div className="h-4 w-4/6 bg-gray-200 rounded mt-1"></div>
      </div>
    </div>
  );
}
export default InfoSideSkeleton;
