export function UnderConstructionContent() {
  return (
    <div 
      className="w-full h-full flex flex-col overflow-hidden"
      style={{ 
        background: '#c0c0c0',
        fontFamily: 'var(--font-pixel)',
      }}
    >
      {/* Notepad Menu Bar */}
      <div 
        className="flex items-center px-1 py-0.5 text-[10px] border-b"
        style={{
          background: '#c0c0c0',
          borderColor: '#808080',
          color: '#000',
        }}
      >
        <span className="px-2 hover:bg-[#000080] hover:text-white cursor-default">File</span>
        <span className="px-2 hover:bg-[#000080] hover:text-white cursor-default">Edit</span>
        <span className="px-2 hover:bg-[#000080] hover:text-white cursor-default">Format</span>
        <span className="px-2 hover:bg-[#000080] hover:text-white cursor-default">View</span>
        <span className="px-2 hover:bg-[#000080] hover:text-white cursor-default">Help</span>
      </div>

      {/* Text Content Area */}
      <div 
        className="flex-1 overflow-auto"
        style={{
          background: '#ffffff',
          border: '2px inset #808080',
          margin: '2px',
        }}
      >
        <pre 
          className="p-3 whitespace-pre-wrap text-[11px] leading-relaxed"
          style={{ 
            color: '#000',
            fontFamily: 'var(--font-pixel)',
          }}
        >
{`

         ~*~ UNDER CONSTRUCTION ~*~



              ___
             /   \\   < hi! come back
    soon! >  |   |      
             | o o |
              \\ ~ /
               |_|
              /| |\\
             (_| |_)



    [ ] something cool is coming...
    [ ] patience is a virtue
    [ ] grab a cookie while u wait



         estimated completion:
    sometime between now and forever



        .  *  .   *   .  *  .
         *  thanh's corner  *
        .  *  .   *   .  *  .

`}
        </pre>
      </div>
      
      {/* Status Bar */}
      <div 
        className="flex items-center justify-between px-2 py-0.5 text-[9px]"
        style={{
          background: '#c0c0c0',
          borderTop: '1px solid #808080',
          color: '#000',
          fontFamily: 'var(--font-pixel)',
        }}
      >
        <div className="flex gap-6">
          <span>Ln 1, Col 1</span>
          <span>100%</span>
        </div>
        <div className="flex gap-6">
          <span>Windows (CRLF)</span>
          <span>UTF-8</span>
        </div>
      </div>
    </div>
  );
}
