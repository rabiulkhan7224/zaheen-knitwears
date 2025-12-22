"use client";
import Apparels from "@/components/Apparels";
import LogoMarquee from "@/components/logoMarquee";
import Process from "@/components/process";
import { Button } from "@/components/ui/button";
import { ArrowBigRight, Mail, MapPin, Pause, Play } from "lucide-react";
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
    <div className="">
      {/* Background Video */}
      <div className="relative min-h-screen ">
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
            <h1 className="mb-4 text-3xl font-bold md:text-5xl">
              High-Quality Garments.
              <br /> Ethically Made.
            </h1>

            <p className="mb-6 md:text-lg text-gray-500">
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
            <div className="absolute bottom-10 md:bottom-40 right-10 md:right-20 flex items-center gap-4 border-2 border-gray-500 p-4 rounded-full ">
              {/* Placeholder for video controls */}
              <Button
                variant="link"
                className="bg-white rounded-full"
                size="icon-lg"
                onClick={toggleVideo}
              >
                {videoRef.current && !videoRef.current.paused ? (
                  <Pause className="text-red-500" />
                ) : (
                  <Play className="text-red-500" />
                )}
              </Button>
            </div>
          </div>

          {/* card */}
          <div className="hidden lg:grid absolute -bottom-30 right-20   grid-cols-1 md:grid-cols-2 gap-4 z-50 p-4 max-w-md ">
            <div className="bg-primary p-4 rounded-md text-white hidden lg:block ">
              <h1 className="text-2xl md:text-2xl font-bold">Quality Product</h1>
              <p className="">
                We are committed to delivering garments that meet the highest
              </p>
              <Button variant="default" className="mt-2 border-white" size="sm">
                <Link href="/"> Read more</Link> <ArrowBigRight className="ml-2" />
              </Button>
            </div>
            <div className="bg-secondary p-4 rounded-md text-white ">
              <h1 className="text-2xl md:text-2xl font-bold">Product overview</h1>
             <h2 className="">30 millions</h2>
              <Button variant="secondary" className="mt-2 border-white" size="sm">
                <Link href="/"> Read more</Link> <ArrowBigRight className="ml-2" />
              </Button>
            </div>

          </div>
        </div>
      </div>

      {/* location and email */}
      <div className="">
        <div className="container mx-auto flex justify-start  items-center py-4 px-4">
          <div className="flex items-center gap-2 text-gray-500">
            <MapPin className="text-secondary" />{" "}
            <div className="">
              <strong className="text-secondary">Location:</strong>
              <p>Kashimpur,Gazipur Sadar / Gazipur
</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <Mail className="text-secondary" />
            <p
              className="text-sm md:text-md">
              
              Email:{" "}
              <a href="mailto:compliance@danysknitwear.com">
               compliance@danysknitwear.com
              </a>
            </p>
          </div>
        </div>
      </div>
      {/* logo marquee */}
      <div className="">
      <LogoMarquee />
      <div className="">  
        <Process/>
      </div>
      <div className="">
        {/* Apparels */}
        <Apparels/>
      </div>

      </div>
    </div>
  );
};

export default HomePage;
