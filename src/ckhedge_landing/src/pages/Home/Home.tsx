const Home = () => {
  return (
    <div className="flex items-center gap-[200px]">
      <div className="justify-start">
        <h1 className="text-5xl font-bold">
          chain-key Hedging Platform
        </ h1>
        <p className="">Revolutionizing crypto hedging with ICP's chain-key technology.</p>
        <p className="">
          Secure, efficient, and innovative financial instruments for managing crypto volatility.
        </p>
        <div className="flex gap-3">
          <button className="bg-customPink text-white px-4 py-2 rounded-lg">Learn More</button>
          <button className="text-customPurple bg-white px-4 py-2 rounded-lg">Get Started</button>
        </div>
      </div>
      
      <div className="relative w-full bg-white flex items-center justify-center">

        <img src="image_15.svg" alt="icp-coin" className="absolute top-72 left-10 w-16 h-16 drop-shadow-lg" />


        <img src="image_18.svg" alt="large-icp-coin" className="absolute drop-shadow-lg" />


        <img src="ckETH_3D.svg" alt="ckETH-coin" className="absolute bottom-10 left-20 w-20 h-20 drop-shadow-lg" />


        <img src="ckBTC_3D.svg" alt="ckBTC-coin" className="absolute bottom-10 right-20 w-20 h-20 drop-shadow-lg" />
      </div>

    </div>
  )
}

export default Home