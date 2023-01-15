export default function Container({ children }) {
  return (
    <>
      <div className="w-full px-4 mx-auto md:w-3/4 2xl:1/2 xl:w-3/4 text-white">
        {children}
      </div>
    </>
  );
}
