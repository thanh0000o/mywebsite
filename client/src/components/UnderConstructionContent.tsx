export function UnderConstructionContent() {
  return (
    <div 
      className="w-full h-full flex flex-col overflow-hidden"
      style={{ 
        background: '#ffffff',
        fontFamily: 'var(--font-pixel)',
      }}
    >
      <div 
        className="flex-1 p-3 overflow-auto"
        style={{
          background: 'linear-gradient(to bottom, #ffffff 0%, #fffef5 100%)',
          filter: 'blur(0.5px)',
        }}
      >
        <pre 
          className="whitespace-pre-wrap text-[11px] leading-relaxed"
          style={{ 
            color: '#000',
            fontFamily: 'var(--font-pixel)',
          }}
        >
{`╔══════════════════════════════════════════╗
║                                          ║
║     ~*~ UNDER CONSTRUCTION ~*~           ║
║                                          ║
║        ___                               ║
║       /   \\   < hi! come back soon! >   ║
║      | o o |                             ║
║       \\ ~ /                              ║
║        |_|                               ║
║       /| |\\                              ║
║      (_| |_)                             ║
║                                          ║
╚══════════════════════════════════════════╝

~ STATUS ~
-----------
[ ] something cool coming here...
[ ] patience is a virtue
[ ] grab a cookie while u wait

~ ESTIMATED COMPLETION ~
------------------------
sometime between now and forever...
probably when the stars align
or when i finish my coffee

~ SECRET MESSAGE ~
------------------
if u can read this, u r awesome <3

last updated: who knows tbh
file size: smol
importance: maximum

        .  *  .   *   .  *  .
     *   thanh's corner   *
        .  *  .   *   .  *  .

[END OF FILE]`}
        </pre>
      </div>
      
      <div 
        className="flex items-center justify-between px-2 py-1 text-[9px] border-t"
        style={{
          background: '#c0c0c0',
          borderColor: '#808080',
          color: '#000',
          fontFamily: 'var(--font-pixel)',
        }}
      >
        <span>Ln 1, Col 1</span>
        <span>100%</span>
        <span>Windows (CRLF)</span>
        <span>UTF-8</span>
      </div>
    </div>
  );
}
