// src/components/Page.jsx
import React from "react";

export const Page = ({ header, children }) => {
  return (
    <section className="min-h-screen bg-primary py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-white text-4xl md:text-6xl font-black uppercase tracking-wider mb-4">
            {header}
          </h1>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {children}
        </div>
      </div>
    </section>
  );
};
