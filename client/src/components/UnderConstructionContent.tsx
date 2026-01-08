export function UnderConstructionContent() {
  return (
    <div 
      className="w-full h-full flex flex-col overflow-hidden select-none relative"
      style={{ 
        background: '#c0c0c0',
      }}
    >
      {/* Pixelated noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='1' height='1' fill='%23999' /%3E%3Crect x='2' y='1' width='1' height='1' fill='%23bbb' /%3E%3Crect x='1' y='2' width='1' height='1' fill='%23888' /%3E%3Crect x='3' y='3' width='1' height='1' fill='%23aaa' /%3E%3C/svg%3E")`,
          backgroundSize: "4px 4px",
          imageRendering: "pixelated" as const,
          opacity: 0.4,
          zIndex: 0,
        }}
      />

      {/* Classic Win95 Menu Bar */}
      <div 
        className="flex items-center h-6 text-[12px] shrink-0 relative z-10"
        style={{
          background: '#c0c0c0',
          borderBottom: '1px solid #808080',
          color: '#000',
          fontFamily: 'var(--font-pixel)',
        }}
      >
        <span className="px-3 py-1 hover:bg-[#000080] hover:text-white cursor-default"><u>F</u>ile</span>
        <span className="px-3 py-1 hover:bg-[#000080] hover:text-white cursor-default"><u>E</u>dit</span>
        <span className="px-3 py-1 hover:bg-[#000080] hover:text-white cursor-default">F<u>o</u>rmat</span>
        <span className="px-3 py-1 hover:bg-[#000080] hover:text-white cursor-default"><u>V</u>iew</span>
        <span className="px-3 py-1 hover:bg-[#000080] hover:text-white cursor-default"><u>H</u>elp</span>
      </div>

      {/* Text Content Area with Win95 inset border */}
      <div 
        className="flex-1 m-1 overflow-hidden relative z-10"
        style={{
          borderTop: '2px solid #808080',
          borderLeft: '2px solid #808080',
          borderBottom: '2px solid #fff',
          borderRight: '2px solid #fff',
        }}
      >
        <div 
          className="w-full h-full overflow-auto flex justify-center"
          style={{
            background: '#ffffff',
            borderTop: '1px solid #404040',
            borderLeft: '1px solid #404040',
            borderBottom: '1px solid #dfdfdf',
            borderRight: '1px solid #dfdfdf',
          }}
        >
          <pre 
            className="p-4 whitespace-pre text-[12px] leading-[1.6]"
            style={{ 
              color: '#000',
              fontFamily: 'var(--font-pixel)',
              display: 'inline-block',
            }}
          >
{`
     ==============================
     |   UNDER CONSTRUCTION   |
     ==============================


               .---.
              /     \\
             | () () |
              \\  ^  /
               |||||
               |||||


        hi! come back soon :)


     ------------------------------


          last updated: soon
          status: working on it


               *  *  *
           thanh's corner
               *  *  *

`}
          </pre>
        </div>
      </div>
      
      {/* Win95 Status Bar */}
      <div 
        className="flex items-center h-6 px-1 gap-1 shrink-0 relative z-10"
        style={{
          background: '#c0c0c0',
          borderTop: '1px solid #fff',
        }}
      >
        <div 
          className="px-2 py-0.5 text-[10px]"
          style={{
            borderTop: '1px solid #808080',
            borderLeft: '1px solid #808080',
            borderBottom: '1px solid #fff',
            borderRight: '1px solid #fff',
            color: '#000',
            fontFamily: 'var(--font-pixel)',
          }}
        >
          Ln 1, Col 1
        </div>
        <div 
          className="px-2 py-0.5 text-[10px]"
          style={{
            borderTop: '1px solid #808080',
            borderLeft: '1px solid #808080',
            borderBottom: '1px solid #fff',
            borderRight: '1px solid #fff',
            color: '#000',
            fontFamily: 'var(--font-pixel)',
          }}
        >
          100%
        </div>
        <div 
          className="px-2 py-0.5 text-[10px]"
          style={{
            borderTop: '1px solid #808080',
            borderLeft: '1px solid #808080',
            borderBottom: '1px solid #fff',
            borderRight: '1px solid #fff',
            color: '#000',
            fontFamily: 'var(--font-pixel)',
          }}
        >
          UTF-8
        </div>
      </div>
    </div>
  );
}
