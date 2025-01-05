import React from "react";
import "animate.css";

const ExtraSection = () => (
   <div>
     {/* Section Title */}
     <div className="text-center dark:bg-gray-900 dark:text-white bg-white  py-6 text-black ">
            <h1 className="text-2xl md:text-4xl font-bold">
                Explore Your Journey
            </h1>
            <p className="mt-2 text-sm md:text-base">
                Dive into productivity with a seamless experience
            </p>
        </div>
     <div className="relative w-full max-w-5xl mx-auto mt-20 bg-base-300 rounded-lg shadow-xl overflow-hidden animate__animated animate__fadeInUp">
       

       {/* Browser Actions */}
       <div className="flex dark:bg-gray-800 items-center gap-2 p-4 bg-gray-200">
           <div className="w-3 h-3 bg-red-500 rounded-full"></div>
           <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
           <div className="w-3 h-3 bg-green-500 rounded-full"></div>
       </div>

       {/* Background Video */}
       <video
           className="w-full"
           autoPlay
           loop
           muted
           playsInline
       >
           <source
               src="/solo-vibe-background.webm"
               type="video/webm" />
           Your browser does not support the video tag.
       </video>
   </div>
   </div>
);

export default ExtraSection;
