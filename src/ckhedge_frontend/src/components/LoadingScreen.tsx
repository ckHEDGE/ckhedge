import PuffLoader from "react-spinners/PuffLoader";

const LoadingScreen = () => {
  return (
    <div className="flex bg-black text-white justify-center items-center h-screen">
    <span>
      <PuffLoader color="#4FEF64" />
    </span>
  </div>
  )
}

export default LoadingScreen