import React from 'react';
import { Wind, Info, Layers, RefreshCw } from 'lucide-react';
import { AqAirQlouds } from '@airqo/icons-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col h-screen bg-[#E4E3E0] text-[#141414] font-sans overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-[#141414] bg-white z-10">
        <div className="flex items-center gap-3">
          <div className="bg-[#141414] p-1.5">
            <AqAirQlouds size={20} color="white" />
          </div>
          <div>
            <h1 className="font-serif italic text-xl tracking-tighter uppercase leading-none">AqAirQlouds</h1>
            <p className="font-mono text-[10px] uppercase opacity-50 tracking-widest mt-1">Environmental Data Lab v1.0</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-8 font-mono text-[11px] uppercase tracking-wider">
          <div className="flex flex-col items-end">
            <span className="opacity-40">System Status</span>
            <span className="text-green-600 font-bold">● Operational</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="opacity-40">Data Providers</span>
            <div className="flex gap-2">
              <a href="https://openaq.org" target="_blank" rel="noopener" className="hover:underline">OpenAQ</a>
              <span className="opacity-20">&</span>
              <a href="https://airqo.net" target="_blank" rel="noopener" className="hover:underline text-blue-600">AirQo</a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Information Panel */}
        <aside className="w-80 border-r border-[#141414] bg-white hidden lg:flex flex-col p-6 overflow-y-auto">
          <section className="mb-10">
            <div className="mb-4 flex flex-col items-center justify-center p-4 bg-blue-50 border border-blue-100 rounded-sm">
              <AqAirQlouds size={48} color="#0A84FF" />
              <span className="font-mono text-[9px] uppercase mt-2 text-[#0A84FF] font-bold tracking-widest">Powered by AirQo</span>
            </div>
            <h2 className="font-serif italic text-lg mb-4 uppercase tracking-tighter border-b border-[#141414] pb-2">Overview</h2>
            <p className="text-sm leading-relaxed opacity-80">
              This interactive dashboard visualizes fine particulate matter (PM2.5) concentrations across the globe. 
              Data is aggregated from the <strong className="text-[#141414]">OpenAQ</strong> platform and <strong className="text-blue-600">AirQo</strong>, 
              providing high-resolution coverage particularly across the African continent.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif italic text-lg mb-4 uppercase tracking-tighter border-b border-[#141414] pb-2">Heatmap Legend</h2>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <div className="h-2 w-full bg-gradient-to-r from-blue-500 via-green-500 via-yellow-400 to-red-600 rounded-full" />
                <div className="flex justify-between font-mono text-[10px] opacity-60">
                  <span>0 µg/m³</span>
                  <span>100+ µg/m³</span>
                </div>
              </div>
              <p className="text-xs opacity-60 italic">
                Values are normalized to a 0-100 scale for visual clarity.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="font-serif italic text-lg mb-4 uppercase tracking-tighter border-b border-[#141414] pb-2">Inspiration</h2>
            <ul className="space-y-4">
              <li className="group">
                <h3 className="font-mono text-[10px] font-bold uppercase mb-1 flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#141414]" />
                  Pollution Heatmap
                </h3>
                <p className="text-[11px] opacity-70 leading-snug">
                  Visualize pollution density across Kampala using intensity gradients.
                </p>
              </li>
              <li className="group">
                <h3 className="font-mono text-[10px] font-bold uppercase mb-1 flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#141414]" />
                  Station Monitoring
                </h3>
                <p className="text-[11px] opacity-70 leading-snug">
                  Display active monitoring stations as markers with real-time value tooltips.
                </p>
              </li>
            </ul>
          </section>

          <section className="mb-10">
             <h2 className="font-mono text-[10px] font-bold uppercase mb-3 tracking-wider">Target Region</h2>
             <div className="bg-[#141414] text-white p-3 font-mono text-[10px]">
                <div className="flex justify-between border-b border-white/20 pb-1 mb-1">
                  <span>REGION:</span>
                  <span className="opacity-70">KAMPALA METRO</span>
                </div>
                <div className="flex justify-between border-b border-white/20 pb-1 mb-1">
                  <span>GRID ID:</span>
                  <span className="opacity-70 truncate max-w-[120px]">67c9681471c7...</span>
                </div>
                <div className="flex justify-between">
                  <span>STATUS:</span>
                  <span className="text-green-400">ACTIVE</span>
                </div>
             </div>
          </section>

          <section className="mb-10 bg-[#141414]/5 p-4 border border-dashed border-[#141414]/20">
            <h2 className="font-mono font-bold text-[10px] mb-3 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-[#141414] rounded-full" />
              Developer Insight
            </h2>
            <div className="font-mono text-[10px] space-y-3 opacity-80 overflow-hidden">
              <p>
                <span className="font-bold text-[#141414]"># Data Normalization</span><br />
                Raw PM2.5 values can exceed 500. We cap weights at 100 to prevent outliers from distorting the heatmap intensity.
              </p>
              <div className="bg-white p-2 border border-[#141414]/10 select-all">
                <code>val = Math.min(Math.max(raw, 0), 100)</code>
              </div>
              <p>
                <span className="font-bold text-[#141414]"># Hybrid Integration</span><br />
                We bridge React and the Google Maps API using refs and standard <code>setMap()</code> calls. This keeps the performance of vanilla JS while enjoying React's component lifecycles.
              </p>
            </div>
          </section>

          <section className="mt-auto pt-6 border-t border-[#141414]">
            <div className="flex items-start gap-3 bg-[#141414] text-white p-4">
              <Info className="w-10 h-10 shrink-0 opacity-50" />
              <div>
                <h3 className="font-mono text-[10px] uppercase mb-1 font-bold">Research Note</h3>
                <p className="text-[11px] leading-snug opacity-80">
                  PM2.5 can penetrate deeply into the lungs and enter the bloodstream, posing significant health risks.
                </p>
              </div>
            </div>
          </section>
        </aside>

        {/* Map View */}
        <section className="flex-1 relative bg-[#D4D3D0]">
          {children}
        </section>
      </main>

      {/* Footer / Status Bar */}
      <footer className="h-8 border-t border-[#141414] bg-white flex items-center px-6 justify-between font-mono text-[9px] uppercase tracking-widest">
        <div className="flex items-center gap-4">
          <span>Google Maps SDK v3.weekly</span>
          <span className="opacity-30">|</span>
          <span>Deck.gl Aggregation Layers</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <RefreshCw className="w-3 h-3 animate-spin duration-[5000ms]" />
            <span>Syncing Real-time Feed</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
