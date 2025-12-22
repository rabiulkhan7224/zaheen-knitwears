import Image from "next/image";
import { Droplet, Scissors,  ClipboardCheck, Package } from 'lucide-react';

const steps = [
  {
    number: 1,
    icon: Droplet,
    title: 'Dyeing',
    description: 'Adding color to biodegradable materials',
  },
  {
    number: 2,
    icon: Scissors,
    title: 'Cutting',
    description: 'Eco-friendly clothing items for all shapes and sizes',
  },
  {
    number: 3,
    icon: Droplet,
    title: 'Sewing',
    description: 'Vouching for the ultimate sturdiness and durability of the fabric',
  },
  {
    number: 4,
    icon: Droplet,
    title: 'Snipping of thread',
    description: 'A neat edge, a soft and smooth finish',
  },
  {
    number: 5,
    icon: Droplet,
    title: 'Ironing',
    description: 'Ironing it before shipping',
  },
  {
    number: 6,
    icon: ClipboardCheck,
    title: 'Checking',
    description: 'Going through each clothing piece to ensure supreme quality standards are met',
  },
  {
    number: 7,
    icon: Package,
    title: 'Package',
    description: 'Folding and packing with the utmost care',
  },
];
const Process = () => {
  return (
    <div className="bg-cyan-300/75 pt-16">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:justify-between">
          
          {/* Text Section */}
          <div className="w-full lg:w-1/2">
            <div className="bg-[url('/process-bg.png')] bg-cover bg-center rounded-lg px-6 py-12">
              <h2 className="mb-6 text-2xl font-bold text-black md:text-3xl">
                Do You Want Custom Project With Textilery? Contact Us Now
              </h2>

              <p className="text-gray-600 leading-relaxed">
                At Zaheen Knitwear Ltd., we pride ourselves on being your reliable
                partner for apparel production. Our commitment to ethical
                manufacturing ensures that every garment is crafted with care
                and integrity.
              </p>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <Image
              src="/process2.png"
              alt="Process Image"
              width={500}
              height={500}
              className="h-auto w-full max-w-md object-contain"
            />
          </div>

        </div>
      </div>

      {/* card section */}
    <div className="container mx-auto ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto bg-white justify-items-center">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative -top-6 flex flex-col items-center text-left bg-white rounded-2xl shadow-lg p-8 transition-transform hover:scale-105"
              >
                {/* Step Number Circle */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black font-bold text-lg">
                    {step.number}
                  </div>
                </div>

                {/* Icon */}
                <div className="mb-4 mt-4 flex h-16 w-16 items-center justify-start">
                  <Icon className="h-16 w-16 text-orange-500" strokeWidth={1.5} />
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-semibold text-left text-gray-800 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 text-left leading-relaxed">{step.description}</p>

                {/* Connecting Line (hidden on last item and mobile) */}
                {/* {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-1/2 w-full h-0.5 bg-gray-300 -z-10" />
                )} */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Process;
