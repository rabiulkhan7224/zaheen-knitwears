'use client';
import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

const HomePage = () => {
 const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 h-full w-full object-cover"
        src="/herovideo.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark Overlay (optional but recommended) */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-start px-4">
        <div className="max-w-2xl text-left text-white">
          <p className="text-lg text-gray-500">elevate your Band With</p>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            High-Quality Garments.
            <br /> Ethically Made.
          </h1>

          <p className="mb-6 text-lg text-gray-500">
            Zaheen Knitwear Ltd., we pride ourselves on being your reliable
            partner for apparel production. Our commitment to ethical
            manufacturing ensures that every garment is crafted with care and
            integrity.
          </p>

          {/* contact and learn more buttons */}
          <div className="flex gap-4">
            <Button variant="default" size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button variant="ghost" className="border border-white" size="lg">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      {/* 
      video play and pause button can be added here
      */}
        <div>
<div className="absolute bottom-40 right-20 flex items-center gap-4 border-2 border-gray-500 p-4 rounded-full ">
          {/* Placeholder for video controls */}
           <Button variant="link" className="bg-white rounded-full" size="icon-lg" onClick={toggleVideo}>
            {videoRef.current && !videoRef.current.paused ? (
             <Pause className="text-red-500" />
            ) : (
               <Play className="text-red-500" />
              
            )}
            </Button>
           
            </div>
          </div>

      </div>
    </div>
  );
};

export default HomePage;
