import HydrogenIcon from '../components/HydrogenIcon.client';

export default function Hero() {
  return (
    <section className="mb-8 md:grid md:grid-cols-2">
      <div className="bg-red-500 h-96 md:h-[600px] flex flex-col justify-center items-center pb-12">
        <HydrogenIcon />
        <div className="mx-auto text-white">
          <h1 className=" font-bold text-3xl lg:text-6xl text-center mb-1">
            Testing Grounds
          </h1>
          <p className="font-bold font-mono lg:text-xl text-center tracking-[.75rem] uppercase">
            Great Java
          </p>
        </div>
      </div>
      <div className="w-full h-96 md:h-[600px] p-12 relative flex flex-col items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src="https://cdn.shopify.com/s/files/1/0579/8336/9376/files/firza-pratama-1BEAIg-79H0-unsplash.jpg?v=1636686686"
            alt="coffee shop"
          />
        </div>
        <div className="absolute inset-0 opacity-75 bg-gray-900"></div>
        <div className="text-white font-bold z-10">
          <h2 className="font-semibold text-4xl tracking-wider uppercase mb-2">
            This is a heading!
          </h2>
          <p className="text-gray-300 font-light font-mono">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
            illo molestiae saepe.
          </p>
        </div>
      </div>
    </section>
  );
}
