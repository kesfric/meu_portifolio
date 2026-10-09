import { ImageResponse } from "next/og";
import { hiOi } from "@/content/handwriting";

// The preview image shown when your link is shared (LinkedIn, iMessage, Slack).
export const alt = "hi! oi! Ester Borges Frickes Ricardo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const scale = 0.42;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "70px 90px",
          background: "#ffffff",
          backgroundImage: "radial-gradient(#dcdcd6 1.6px, transparent 1.8px)",
          backgroundSize: "30px 30px",
          color: "#1a1a1a",
        }}
      >
        <svg width={hiOi.width * scale} height={hiOi.height * scale} viewBox={`0 0 ${hiOi.width} ${hiOi.height}`}>
          <path d={hiOi.d} fill="#1a1a1a" />
        </svg>
        <div style={{ display: "flex", fontSize: 62, fontWeight: 700, marginTop: 36, letterSpacing: -1.5 }}>Ester Borges Frickes Ricardo</div>
        <div style={{ display: "flex", fontSize: 32, marginTop: 14, color: "#5c5c57" }}>
          Computer Science and Learning Sciences, Northwestern
        </div>
        <div style={{ display: "flex", marginTop: 30 }}>
          <div style={{ display: "flex", fontSize: 30, background: "#00ff88", padding: "6px 18px", borderRadius: 8 }}>
            Product, AI and software engineering
          </div>
        </div>
      </div>
    ),
    size,
  );
}
