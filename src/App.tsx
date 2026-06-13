import React, { useMemo } from 'react';
import TopPlayer from './components/TopPlayer';
import TimeCounter from './components/TimeCounter';
import MessageCard from './components/MessageCard';
import Memories from './components/Memories';
import ListsAndPhotos from './components/ListsAndPhotos';
import { siteData } from './data';

function FloatingHearts() {
  const hearts = useMemo(() => {
    return Array.from({ length: 12 }).map(() => ({
      left: Math.random() * 90 + 5,
      fontSize: Math.random() * 10 + 12,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 8,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((props, i) => (
        <span
          key={i}
          className="absolute bottom-[-20px] text-[#9b59b6]"
          style={{
            left: `${props.left}%`,
            fontSize: `${props.fontSize}px`,
            animation: `floatUp ${props.duration}s ${props.delay}s infinite ease-in`,
          }}
        >
          💜
        </span>
      ))}
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-black flex justify-center text-[#e6e0f8] font-sans selection:bg-[#9b59b6] selection:text-white relative">
      <FloatingHearts />
      {/* Mobile Frame Constraint for Desktop */}
      <div className="w-full max-w-[420px] bg-[#0a060d] relative shadow-2xl overflow-hidden overflow-y-auto custom-scrollbar">
        
        {/* Top View: Player */}
        <TopPlayer />

        {/* Bottom View: Scrollable Content with a different background color */}
        <div className="bg-gradient-to-b from-[#1a1025] to-[#0a060d] rounded-t-3xl min-h-screen relative z-20 pb-20 -mt-10 px-5 pt-8 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] border-t border-[#c5a059]/30">
          {/* Header Dragger (visual hint) */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-[#c5a059]/30 rounded-full"></div>
          
          <h2 className="text-[#c5a059] font-bold text-xl mb-4 pl-1 font-serif italic">Sobre nós</h2>
          
          {/* Couple Headline */}
          <div className="mb-6 pl-1">
            <h1 className="text-3xl font-serif font-bold text-[#e6e0f8] mb-1">{siteData.coupleName}</h1>
            <p className="text-[#c5a059] text-sm italic">
              Juntos em trevas e luz desde {new Date(siteData.startDate).getFullYear()}
            </p>
          </div>

          {/* Time Counter Grid */}
          <TimeCounter startDate={siteData.startDate} />

          {/* Memories Section */}
          <Memories />

          {/* Blue Message Card */}
          <MessageCard />

          {/* Photo and Lists Section */}
          <ListsAndPhotos />
          
        </div>
      </div>
    </div>
  );
}
