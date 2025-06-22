import Image from "next/image";

const HomeBanner = () => {
  return (
    <div className="relative" style={{ background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)', height: '400px' }}>
      <div className="mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly h-full">
        <div className="mb-8 md:mb-0 text-center md:text-left flex-1 flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Fresh Groceries Delivered
          </h1>
          <p className="text-lg md:text-2xl text-white mb-4">
            Quality fruits and essentials delivered to your doorstep. Fast, fresh, and affordable!
          </p>
          <div className="mt-4">
            <span className="inline-block bg-white text-green-700 font-bold px-6 py-2 rounded shadow hover:bg-green-100 transition">
              Shop Now
            </span>
          </div>
        </div>
        <div className="w-1/3 relative aspect-video flex-1 flex items-center justify-center">
          <Image
            src="/316.png"
            fill
            alt="Fresh groceries display"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
