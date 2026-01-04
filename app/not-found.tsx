import React from 'react';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 font-sans">
      <div className="max-w-md w-full text-center">
        
        <div className="relative mb-12 flex justify-center">
          <h1 className="text-9xl font-black text-indigo-600/20 tracking-tighter select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="bg-indigo-600 px-4 py-1 text-sm font-bold rounded-full rotate-12 text-white shadow-xl shadow-indigo-200">
               Data Missing
             </div>
          </div>
        </div>

        <div className="space-y-4 mb-10">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Lost in the dashboard?
          </h2>
          <p className="text-slate-500 leading-relaxed">
            The product data or page you're looking for doesn't exist. 
            Check the URL or return to the main inventory.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/products"
            className="flex items-center justify-center gap-2 px-6 py-3 border border-slate-200 bg-white rounded-xl text-slate-600 hover:bg-slate-50 transition-all duration-200 font-semibold shadow-sm"
          >
            <ArrowLeft size={18} />
            Back to Products
          </Link>
          
          <Link 
            href="/products"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 rounded-xl text-white hover:bg-indigo-700 transition-all duration-200 shadow-lg shadow-indigo-100 font-semibold"
          >
            <Home size={18} />
            Dashboard Home
          </Link>
        </div>

        <p className="mt-16 text-xs font-mono text-slate-400 uppercase tracking-widest">
          Error Log: 0x404_NULL_POINTER
        </p>
      </div>
    </div>
  );
}