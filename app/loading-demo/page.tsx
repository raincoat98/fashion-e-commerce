import React from "react";
import LoadingExample from "@/components/examples/LoadingExample";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function LoadingDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <LoadingExample />
      <Footer />
    </div>
  );
}
