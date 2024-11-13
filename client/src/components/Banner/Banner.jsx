import bannerImage from "/banner_001.jpg";
import logo from "/pharma-logo.png";

const Banner = () => {
  return (
    <div className="relative h-[450px] w-fit p-8 mx-auto">
      <div className="w-fit h-full mx-auto">
        <img src={bannerImage} alt="banner" className="object-center" />
      </div>

      <div className="absolute top-8 left-8 h-full flex flex-col justify-center gap-8 p-16 w-[45%]">
        {/* logo */}
        <div>
          <div className="flex items-center gap-2">
            <div className="size-10">
              <img
                src={logo}
                alt="logo"
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="text-3xl font-semibold text-primary-teal">
              Pharma<span className="text-sec-mint-green">Mart</span>
            </div>
          </div>
        </div>

        {/* text */}
        <div className="text-sec-mint-green text-2xl font-semibold">
          Your one and only online pharmacy!
        </div>

        {/* buttons */}
        <div>
          <button className="px-7 py-2 rounded-md text-lg bg-primary-teal hover:opacity-75 text-zinc-50">
            About
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
