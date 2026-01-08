export function UnderConstructionContent() {
  return (
    <div 
      className="w-full h-full flex flex-col overflow-hidden select-none"
      style={{ 
        background: '#c0c0c0',
        fontFamily: 'var(--font-pixel)',
      }}
    >
      {/* Classic Win95 Menu Bar */}
      <div 
        className="flex items-center h-5 text-[11px]"
        style={{
          background: '#c0c0c0',
          borderBottom: '1px solid #808080',
          color: '#000',
        }}
      >
        <span className="px-3 py-0.5 hover:bg-[#000080] hover:text-white cursor-default" style={{ textDecoration: 'underline', textDecorationColor: '#000', textUnderlineOffset: '1px' }}>F<span style={{ textDecoration: 'none' }}>ile</span></span>
        <span className="px-3 py-0.5 hover:bg-[#000080] hover:text-white cursor-default"><span style={{ textDecoration: 'underline' }}>E</span>dit</span>
        <span className="px-3 py-0.5 hover:bg-[#000080] hover:text-white cursor-default">F<span style={{ textDecoration: 'underline' }}>o</span>rmat</span>
        <span className="px-3 py-0.5 hover:bg-[#000080] hover:text-white cursor-default"><span style={{ textDecoration: 'underline' }}>V</span>iew</span>
        <span className="px-3 py-0.5 hover:bg-[#000080] hover:text-white cursor-default"><span style={{ textDecoration: 'underline' }}>H</span>elp</span>
      </div>

      {/* Text Content Area with proper Win95 inset border */}
      <div 
        className="flex-1 m-1 overflow-hidden"
        style={{
          borderTop: '2px solid #808080',
          borderLeft: '2px solid #808080',
          borderBottom: '2px solid #ffffff',
          borderRight: '2px solid #ffffff',
        }}
      >
        <div 
          className="w-full h-full overflow-auto"
          style={{
            background: '#ffffff',
            borderTop: '1px solid #404040',
            borderLeft: '1px solid #404040',
            borderBottom: '1px solid #dfdfdf',
            borderRight: '1px solid #dfdfdf',
          }}
        >
          <pre 
            className="p-4 whitespace-pre text-[12px] leading-[1.4]"
            style={{ 
              color: '#000',
              fontFamily: '"Fixedsys", "Courier New", monospace',
              minHeight: '100%',
            }}
          >
{`
    ========================================
    |                                      |
    |    ~*~ UNDER CONSTRUCTION ~*~        |
    |                                      |
    ========================================


                    ___
                   /   \\
                  |     |    < hi there!
                  | o o |      come back soon :)
                   \\ - /
                    |_|
                   /| |\\
                  (_| |_)


    ----------------------------------------


       last updated: soon(tm)
       progress: |||||||........ 42%


            *  .  *  .  *  .  *
               thanh's corner
            .  *  .  *  .  *  .

`}
          </pre>
          <div className="flex justify-center gap-4 pb-6 pt-2">
            <img 
              src="https://web.archive.org/web/20091027065803im_/http://geocities.com/SiliconValley/Park/5344/dancingbaby.gif" 
              alt="dancing baby"
              className="h-12"
              style={{ imageRendering: 'pixelated' }}
            />
            <img 
              src="https://web.archive.org/web/20091027022038im_/http://www.geocities.com/Hollywood/Lot/4680/flmskuld.gif" 
              alt="flame skull"
              className="h-12"
              style={{ imageRendering: 'pixelated' }}
            />
            <img 
              src="https://web.archive.org/web/20091026234846im_/http://geocities.com/Heartland/Plains/8498/anim-hamster.gif" 
              alt="hamster"
              className="h-12"
              style={{ imageRendering: 'pixelated' }}
            />
            <img 
              src="https://web.archive.org/web/20091027065803im_/http://geocities.com/SiliconValley/Park/5344/dancingbaby.gif" 
              alt="dancing baby 2"
              className="h-12"
              style={{ imageRendering: 'pixelated', transform: 'scaleX(-1)' }}
            />
          </div>
        </div>
      </div>
      
      {/* Win95 Status Bar */}
      <div 
        className="flex items-center px-1 py-1 gap-1 text-[9px] shrink-0"
        style={{
          background: '#c0c0c0',
          borderTop: '1px solid #ffffff',
          color: '#000',
          fontFamily: 'var(--font-pixel)',
        }}
      >
        <div 
          className="px-2 py-0.5 whitespace-nowrap"
          style={{
            borderTop: '1px solid #808080',
            borderLeft: '1px solid #808080',
            borderBottom: '1px solid #ffffff',
            borderRight: '1px solid #ffffff',
          }}
        >
          Ln 1, Col 1
        </div>
        <div 
          className="px-2 py-0.5 whitespace-nowrap"
          style={{
            borderTop: '1px solid #808080',
            borderLeft: '1px solid #808080',
            borderBottom: '1px solid #ffffff',
            borderRight: '1px solid #ffffff',
          }}
        >
          100%
        </div>
        <div 
          className="px-2 py-0.5 whitespace-nowrap"
          style={{
            borderTop: '1px solid #808080',
            borderLeft: '1px solid #808080',
            borderBottom: '1px solid #ffffff',
            borderRight: '1px solid #ffffff',
          }}
        >
          CRLF
        </div>
        <div 
          className="px-2 py-0.5 whitespace-nowrap"
          style={{
            borderTop: '1px solid #808080',
            borderLeft: '1px solid #808080',
            borderBottom: '1px solid #ffffff',
            borderRight: '1px solid #ffffff',
          }}
        >
          UTF-8
        </div>
      </div>
    </div>
  );
}
