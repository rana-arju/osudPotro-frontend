"use client";

import React from "react";

export default function MedicineLoader() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-12 h-12 animate-bounce">
        {/* Pill Capsule Shape */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <div className="w-12 h-6 bg-blue-500 rounded-t-full"></div>
          <div className="w-12 h-6 bg-red-500 rounded-b-full"></div>
        </div>
      </div>
      <span className="text-sm font-medium text-gray-600">
        Loading Medicine...
      </span>
    </div>
  );
}
