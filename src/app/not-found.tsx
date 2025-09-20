"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/Components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mt-15 mb-7 min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative">
            {/* Large 404 Text */}
            <div className="text-9xl md:text-[12rem] font-bold text-gray-200 select-none">
              404
            </div>
            
            {/* Floating Elements */}
            <div className="absolute top-8 left-8 w-16 h-16 bg-emerald-500 rounded-full opacity-20 animate-bounce"></div>
            <div className="absolute top-16 right-12 w-12 h-12 bg-blue-500 rounded-full opacity-20 animate-bounce" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute bottom-8 left-16 w-8 h-8 bg-purple-500 rounded-full opacity-20 animate-bounce" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-12 right-8 w-10 h-10 bg-orange-500 rounded-full opacity-20 animate-bounce" style={{animationDelay: '1.5s'}}></div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Oops! Page Not Found
          </h1>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link href="/">
            <Button className="cursor-pointer w-full sm:w-auto h-12 px-8 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Button>
          </Link>
        </div>

        {/* Search Suggestion */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
          <div className="flex items-center justify-center mb-4">
            <Search className="w-6 h-6 text-emerald-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Looking for something specific?</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Try searching for products or browse our categories
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/products">
              <Button variant="outline" className="cursor-pointer w-full sm:w-auto border-emerald-300 hover:border-emerald-500 hover:bg-emerald-50 text-emerald-700">
                Browse Products
              </Button>
            </Link>
            <Link href="/categories">
              <Button variant="outline" className="cursor-pointer w-full sm:w-auto border-emerald-300 hover:border-emerald-500 hover:bg-emerald-50 text-emerald-700">
                View Categories
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
