export default function CRTChrome({ children }) {
  return (
    <div className="relative min-h-screen bg-black text-[#00ff88] font-mono overflow-hidden crt-flicker">

      {/* Scanline Shine Layer */}
      <div className="crt-scanshine"></div>

      {/* Content with Warm Boot */}
      <div className="crt-warmboot">
        {children}
      </div>
    </div>
  );
}
