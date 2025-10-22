import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "FastLegend - Free Typing Speed Test"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 128,
        background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#1db954",
        fontWeight: "bold",
        flexDirection: "column",
        gap: "40px",
        padding: "40px",
      }}
    >
      <div style={{ fontSize: "80px" }}>⚡</div>
      <div style={{ fontSize: "72px", fontWeight: "bold" }}>FastLegend</div>
      <div style={{ fontSize: "48px", color: "#b3b3b3" }}>Test Your Typing Speed</div>
      <div style={{ fontSize: "32px", color: "#1ed760", marginTop: "20px" }}>Measure WPM & Accuracy</div>
    </div>,
    {
      ...size,
    },
  )
}
