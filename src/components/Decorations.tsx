export function PixelStar({ className }: { className?: string }) {
  const pixelMap = [
    "         #         ",
    "                   ",
    "      # ### #      ",
    "     ## ### ##     ",
    "    ### ### ###    ",
    "   #### ### ####   ",
    "  # ### ### ### #  ",
    " ##  ## ### ##  ## ",
    "  #   # ### #   #  ",
    "#       # #       #",
    "  #   # ### #   #  ",
    " ##  ## ### ##  ## ",
    "  # ### ### ### #  ",
    "   #### ### ####   ",
    "    ### ### ###    ",
    "     ## ### ##     ",
    "      # ### #      ",
    "                   ",
    "         #         ",
  ];

  return (
    <svg 
      viewBox="0 0 19 19" 
      className={className} 
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {pixelMap.map((row, y) =>
        row.split('').map((char, x) => (
          char === '#' ? (
            <rect key={`${x}-${y}`} x={x} y={y} width="1.05" height="1.05" />
          ) : null
        ))
      )}
    </svg>
  );
}

export function AsteriskLines({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={className} 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="square"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="7" y1="3.34" x2="17" y2="20.66" />
      <line x1="7" y1="20.66" x2="17" y2="3.34" />
    </svg>
  );
}

export function FlowerStar({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={className} 
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="12" cy="12" rx="2.5" ry="11" />
      <ellipse cx="12" cy="12" rx="2.5" ry="11" transform="rotate(45 12 12)" />
      <ellipse cx="12" cy="12" rx="2.5" ry="11" transform="rotate(90 12 12)" />
      <ellipse cx="12" cy="12" rx="2.5" ry="11" transform="rotate(135 12 12)" />
    </svg>
  );
}
