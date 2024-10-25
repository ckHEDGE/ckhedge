const Home = () => {
  return (
    <div className="flex justify-center w-full h-md:mt-[250px] h-sm:mt-[150px] mt-[100px]">
      <div className=" flex justify-center max-w-[1700px] w-full  items-center lg:gap-[200px] gap-10">
        <div className="text-center sm:text-start">
          <h1 className="md:text-5xl text-4xl font-bold">
            chain-key Hedging Platform
          </ h1>
          <div className="mt-5">
          <p className="">Revolutionizing crypto hedging with ICP's chain-key technology.</p>
          <p className="">
            Secure, efficient, and innovative financial instruments for managing crypto volatility.
          </p>
          </div>
          <div className="flex ts:flex-row flex-col gap-3 mt-10 justify-center sm:justify-start">
            <button className="bg-customPink text-white px-4 py-2 rounded-lg">Launch App</button>
            <button className="text-customPurple bg-white px-10 py-2 rounded-lg">Wallet</button>
          </div>
        </div>
        <div className="w-fullitems-center hidden sm:block">
          <img src="/hero_img.png" alt="ckhedge" className="w-full" />
        </div>


      </div>
    </div>
  )
}

export default Home