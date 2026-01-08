export function UnderConstructionContent() {
  return (
    <div 
      className="w-full h-full flex flex-col overflow-hidden select-none"
      style={{ 
        background: '#c0c0c0',
      }}
    >
      {/* Classic Win95 Menu Bar */}
      <div 
        className="flex items-center h-6 text-[11px] shrink-0"
        style={{
          background: '#c0c0c0',
          borderBottom: '1px solid #808080',
          color: '#000',
          fontFamily: '"MS Sans Serif", "Segoe UI", sans-serif',
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
        className="flex-1 m-1 overflow-hidden"
        style={{
          borderTop: '2px solid #808080',
          borderLeft: '2px solid #808080',
          borderBottom: '2px solid #dfdfdf',
          borderRight: '2px solid #dfdfdf',
        }}
      >
        <div 
          className="w-full h-full overflow-auto"
          style={{
            background: '#ffffff',
            borderTop: '1px solid #404040',
            borderLeft: '1px solid #404040',
            borderBottom: '1px solid #ffffff',
            borderRight: '1px solid #ffffff',
          }}
        >
          <pre 
            className="p-4 whitespace-pre text-[13px] leading-[1.5]"
            style={{ 
              color: '#000',
              fontFamily: '"Courier New", Courier, monospace',
              minHeight: '100%',
            }}
          >
{`

        ================================
        |   UNDER CONSTRUCTION   |
        ================================


                  .---.
                 /     \\
                | () () |
                 \\  ^  /
                  |||||
                  |||||


          hi! come back soon :)


        --------------------------------


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
        className="flex items-center h-6 px-1 gap-1 shrink-0"
        style={{
          background: '#c0c0c0',
          borderTop: '1px solid #dfdfdf',
        }}
      >
        <div 
          className="px-2 py-0.5 text-[10px]"
          style={{
            borderTop: '1px solid #808080',
            borderLeft: '1px solid #808080',
            borderBottom: '1px solid #ffffff',
            borderRight: '1px solid #ffffff',
            color: '#000',
            fontFamily: '"MS Sans Serif", sans-serif',
          }}
        >
          Ln 1, Col 1
        </div>
        <div 
          className="px-2 py-0.5 text-[10px]"
          style={{
            borderTop: '1px solid #808080',
            borderLeft: '1px solid #808080',
            borderBottom: '1px solid #ffffff',
            borderRight: '1px solid #ffffff',
            color: '#000',
            fontFamily: '"MS Sans Serif", sans-serif',
          }}
        >
          100%
        </div>
        <div 
          className="px-2 py-0.5 text-[10px]"
          style={{
            borderTop: '1px solid #808080',
            borderLeft: '1px solid #808080',
            borderBottom: '1px solid #ffffff',
            borderRight: '1px solid #ffffff',
            color: '#000',
            fontFamily: '"MS Sans Serif", sans-serif',
          }}
        >
          UTF-8
        </div>
      </div>
    </div>
  );
}
