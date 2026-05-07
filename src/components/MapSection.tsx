export function MapSection() {
  return (
    <div className="w-full h-full relative">
      {/* 
          This ID is targeted by MapManager.init('map-canvas'). 
          The Google Maps instance will be injected here manually.
      */}
      <div id="map-canvas" className="w-full h-full bg-[#D4D3D0]" />
      
      {/* 
          Overlay UI can still live in React if needed, 
          or we can handle it with absolute positioning 
      */}
      <div className="absolute bottom-6 right-6 z-20 pointer-events-none">
        <div className="bg-[#141414] text-white p-4 font-mono text-[10px] uppercase tracking-widest bg-opacity-90">
          Source: AirQo Real-time Feed
        </div>
      </div>
    </div>
  );
}

