import Image from "next/image";

const HomeBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-yellow-400 to-yellow-600 mb-8">
      <div className="mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
        <div className="mb-8 md:mb-0 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Brighten Your World
          </h1>
          <p className="text-lg md:text-xl text-white mb-2">
            Top-quality lighting solutions for every need
          </p>
          <p className="text-2xl md:text-5xl text-gray-900 font-bold">
            UP TO 40% OFF
          </p>
        </div>
        <div className="w-1/3 relative aspect-video">
          <Image
            src="/stage-lighting-equipment-AX1C2P.jpg"
            fill
            alt="Lighting equipment display"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
