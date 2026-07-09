import React from "react";

interface ProgressRingProps {
  solvedCount: number;
  totalCount: number;
  easySolved: number;
  easyTotal: number;
  mediumSolved: number;
  mediumTotal: number;
  hardSolved: number;
  hardTotal: number;
}

export default function ProgressRing({
  solvedCount,
  totalCount,
  easySolved,
  easyTotal,
  mediumSolved,
  mediumTotal,
  hardSolved,
  hardTotal,
}: ProgressRingProps) {
  // Proportions of a 270-degree gauge (from 135 degrees to 405 degrees)
  const startAngle = 135;
  const totalAngle = 270;
  const endAngle = startAngle + totalAngle;

  const total = easyTotal + mediumTotal + hardTotal || 1;

  // Calculate segment angles based on total count of each difficulty
  const easyAngle = (easyTotal / total) * totalAngle;
  const mediumAngle = (mediumTotal / total) * totalAngle;
  const hardAngle = (hardTotal / total) * totalAngle;

  // Easy section angles
  const easySolvedAngle = easyTotal > 0 ? easyAngle * (easySolved / easyTotal) : 0;
  const easyUnsolvedAngle = easyAngle - easySolvedAngle;

  // Medium section angles
  const mediumSolvedAngle = mediumTotal > 0 ? mediumAngle * (mediumSolved / mediumTotal) : 0;
  const mediumUnsolvedAngle = mediumAngle - mediumSolvedAngle;

  // Hard section angles
  const hardSolvedAngle = hardTotal > 0 ? hardAngle * (hardSolved / hardTotal) : 0;
  const hardUnsolvedAngle = hardAngle - hardSolvedAngle;

  const cx = 60;
  const cy = 60;
  const r = 50;

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  const getArcPath = (start: number, end: number) => {
    if (start >= end) return "";
    const startPoint = polarToCartesian(cx, cy, r, start);
    const endPoint = polarToCartesian(cx, cy, r, end);
    const largeArc = end.valueOf() - start.valueOf() > 180 ? 1 : 0;
    return `M ${startPoint.x} ${startPoint.y} A ${r} ${r} 0 ${largeArc} 1 ${endPoint.x} ${endPoint.y}`;
  };

  // Easy segment bounds
  const eStart = startAngle;
  const eSolvedEnd = eStart + easySolvedAngle;
  const eEnd = eStart + easyAngle;

  // Medium segment bounds
  const mStart = eEnd;
  const mSolvedEnd = mStart + mediumSolvedAngle;
  const mEnd = mStart + mediumAngle;

  // Hard segment bounds
  const hStart = mEnd;
  const hSolvedEnd = hStart + hardSolvedAngle;
  const hEnd = hStart + hardAngle; // should be 405 (endAngle)

  // End dot position (always at the very end of the track: 405 degrees)
  const endDot = polarToCartesian(cx, cy, r, endAngle);

  // Solved colors
  const colorEasy = "#2cbb5d";
  const colorMedium = "#ffb800";
  const colorHard = "#ef4747";

  // Unsolved track colors (dark, muted)
  const trackEasy = "#203328";
  const trackMedium = "#3e2f11";
  const trackHard = "#3b1a1a";

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "24px",
    }}>
      {/* Legend & Stats */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {/* Easy */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", minWidth: "130px" }}>
          <span style={{ fontSize: "16px", color: "#2cbb5d", fontWeight: "bold", width: "45px" }}>Easy</span>
          <span style={{ fontSize: "16px", color: "#f8fafc", fontWeight: 500 }}>
            {easySolved}<span style={{ color: "#64748b", fontWeight: "normal" }}>/{easyTotal}</span>
          </span>
        </div>
        
        {/* Medium */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontSize: "16px", color: "#ffb800", fontWeight: "bold", width: "45px" }}>Med</span>
          <span style={{ fontSize: "16px", color: "#f8fafc", fontWeight: 500 }}>
            {mediumSolved}<span style={{ color: "#64748b", fontWeight: "normal" }}>/{mediumTotal}</span>
          </span>
        </div>

        {/* Hard */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontSize: "16px", color: "#ef4747", fontWeight: "bold", width: "45px" }}>Hard</span>
          <span style={{ fontSize: "16px", color: "#f8fafc", fontWeight: 500 }}>
            {hardSolved}<span style={{ color: "#64748b", fontWeight: "normal" }}>/{hardTotal}</span>
          </span>
        </div>
      </div>

      {/* Segmented Ring SVG */}
      <div style={{ position: "relative", width: "120px", height: "120px" }}>
        <svg width="120" height="120" viewBox="0 0 120 120">
          {/* Easy Segment */}
          {easySolvedAngle > 0 && (
            <path
              d={getArcPath(eStart, eSolvedEnd)}
              fill="none"
              stroke={colorEasy}
              strokeWidth="6"
              strokeLinecap={easySolved === easyTotal ? "round" : "round"} // round start
            />
          )}
          {easyUnsolvedAngle > 0 && (
            <path
              d={getArcPath(eSolvedEnd, eEnd)}
              fill="none"
              stroke={trackEasy}
              strokeWidth="6"
              strokeLinecap={easySolved === 0 ? "round" : "square"} // round start if no solved
            />
          )}

          {/* Medium Segment */}
          {mediumSolvedAngle > 0 && (
            <path
              d={getArcPath(mStart, mSolvedEnd)}
              fill="none"
              stroke={colorMedium}
              strokeWidth="6"
            />
          )}
          {mediumUnsolvedAngle > 0 && (
            <path
              d={getArcPath(mSolvedEnd, mEnd)}
              fill="none"
              stroke={trackMedium}
              strokeWidth="6"
            />
          )}

          {/* Hard Segment */}
          {hardSolvedAngle > 0 && (
            <path
              d={getArcPath(hStart, hSolvedEnd)}
              fill="none"
              stroke={colorHard}
              strokeWidth="6"
            />
          )}
          {hardUnsolvedAngle > 0 && (
            <path
              d={getArcPath(hSolvedEnd, hEnd)}
              fill="none"
              stroke={trackHard}
              strokeWidth="6"
            />
          )}

          {/* Cap Red Dot at the end of the Hard section */}
          <circle
            cx={endDot.x}
            cy={endDot.y}
            r="3"
            fill="#ef4747"
          />
        </svg>

        {/* Text inside the ring */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <span style={{ fontSize: "24px", fontWeight: "bold", color: "#ffffff", lineHeight: "1" }}>
            {solvedCount}
          </span>
          <span style={{ fontSize: "14px", color: "#64748b", marginTop: "4px" }}>
            /{totalCount}
          </span>
          <span style={{ fontSize: "11px", color: "#8892b0", marginTop: "2px", fontWeight: 500 }}>
            Solved
          </span>
        </div>
      </div>
    </div>
  );
}
