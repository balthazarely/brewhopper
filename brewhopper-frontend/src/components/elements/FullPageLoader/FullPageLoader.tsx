export function FullPageLoader({ classes }: { classes?: string }) {
  return (
    <div
      className={`flex justify-center items-center w-full flex-grow ${classes}`}
    >
      <span className="loading loading-spinner ml-1 loading-lg "></span>
    </div>
  );
}
