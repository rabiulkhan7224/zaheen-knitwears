'use client';

import { MapPin, Mail, Phone, Facebook, Twitter, Instagram } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-50 py-12 border-t border-gray-200">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & Contact Info */}
          <div className="space-y-6">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Image
                src="/logo.png"
                alt="ZK Logo"
                width={120}
                height={60}
                className="object-contain"
              />
            </div>

            {/* Address, Email, Phone */}
            <div className="space-y-4 text-gray-600 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                <p>29 SE 2nd Ave, Miami Florida 33131, United States</p>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <a href="mailto:info@zaheen.com" className="hover:text-orange-500 transition">
                  info@zaheen.com
                </a>
              </div>

              <div className="flex items-center gap-3 text-lg font-semibold text-gray-800">
                <Phone className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <span>(+92) 3942 7879</span>
              </div>
            </div>
          </div>

          {/* Pages */}
          <div className="lg:justify-self-center">
            <h3 className="font-bold text-gray-800 mb-5 uppercase tracking-wider">Pages</h3>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li><a href="#" className="hover:text-orange-500 transition">About Us</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Our Services</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Our Products</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Contact Us</a></li>
            </ul>
          </div>

          {/* Information */}
          <div className="lg:justify-self-center">
            <h3 className="font-bold text-gray-800 mb-5 uppercase tracking-wider">Information</h3>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li><a href="#" className="hover:text-orange-500 transition">My Account</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Corporate Enquires</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">FAQs</a></li>
            </ul>
          </div>

          {/* Payment Channels */}
          <div>
            <h3 className="font-bold text-gray-800 mb-5 uppercase tracking-wider">Payment Channels</h3>
            <div className="flex flex-wrap gap-4">
              {/* Replace these with your actual payment logo images in /public/payment/ */}
              <Image src="/payment/visa.png" alt="Visa" width={60} height={40} className="rounded bg-white p-2 shadow" />
              <Image src="/payment/mastercard.png" alt="Mastercard" width={60} height={40} className="rounded bg-white p-2 shadow" />
              <Image src="/payment/bkash.png" alt="bKash" width={60} height={40} className="rounded bg-white p-2 shadow" />
              <Image src="/payment/nagad.png" alt="Nagad" width={60} height={40} className="rounded bg-white p-2 shadow" />
              <Image src="/payment/rocket.png" alt="Rocket" width={60} height={40} className="rounded bg-white p-2 shadow" />
              <Image src="/payment/upay.png" alt="Upay" width={60} height={40} className="rounded bg-white p-2 shadow" />
              <Image src="/payment/tap.png" alt="Tap" width={60} height={40} className="rounded bg-white p-2 shadow" />
              <Image src="/payment/citybank.png" alt="City Bank" width={60} height={40} className="rounded bg-white p-2 shadow" />
              <Image src="/payment/brac.png" alt="BRAC Bank" width={60} height={40} className="rounded bg-white p-2 shadow" />
              <Image src="/payment/uco.png" alt="UCO" width={60} height={40} className="rounded bg-white p-2 shadow" />
              {/* Add more as needed */}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-300">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-600">
            <p>Copyright © 360D Soul Limited 2025. All rights reserved.</p>

            <div className="flex items-center gap-8">
              {/* Social Icons */}
              <div className="flex gap-5">
                <a href="#" className="hover:text-orange-500 transition"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="hover:text-orange-500 transition"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="hover:text-orange-500 transition"><Instagram className="w-5 h-5" /></a>
              </div>

              {/* Policy Links */}
              <div className="flex gap-6">
                <a href="#" className="hover:text-orange-500 transition">Terms & Condition</a>
                <a href="#" className="hover:text-orange-500 transition">Privacy & Policy</a>
                <a href="#" className="hover:text-orange-500 transition">Refund Policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}