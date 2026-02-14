import { useState, useEffect } from "react";
import giftImg from "./assets/valentine_gift.png";
import one from "./assets/1.jpeg";
import two from "./assets/2.jpeg";
import three from "./assets/3.jpeg";
import four from "./assets/4.jpeg";
import five from "./assets/5.jpeg";
import six from "./assets/6.jpeg";
import seven from "./assets/7.jpeg";
import eight from "./assets/8.jpeg";
import nine from "./assets/9.jpeg";
import ten from "./assets/10.jpeg";
import eleven from "./assets/11.jpeg";
import twelve from "./assets/12.jpeg";
import thirteen from "./assets/13.jpeg";
import fourteen from "./assets/14.jpeg";
import fifteen from "./assets/15.jpeg";


// ╔══════════════════════════════════════════════════════════════════╗
// ║  STEP 1 — Background illustration                               ║
// ║  Place your image in /public and set the filename below:        ║
const ILLUSTRATION = giftImg// ← change this
// ╚══════════════════════════════════════════════════════════════════╝

// ╔══════════════════════════════════════════════════════════════════╗
// ║  STEP 2 — Your 15 photos + messages                             ║
const PHOTOS = [
  { src: one, caption: "Love this feeling",    message: "To have butterflies even for knowing you for such a long time, is something i love a lot, in moments like this i have a butterfly garden inside me thank youu✨" },
  { src: two, caption: "Mine Spine",  message: "You are my support , thank you for having my back everytime , and its you always has been you, i have your back too always everytime🫂" },
  { src: three, caption: "Your smile goes a mile", message: "You laugh and the whole world instantly gets brighter 😄" },
  { src: four, caption: "Dancing on your tunes",           message: "You are my favourite melody, favourite dance step , favourite lyrics. Aapke isharo par humesha nachunga🕺" },
  { src: five, caption: "Always the yellow dress",       message: "Can't take my eyes of you in general only, but yellow mai toh magnet ki tarah chipak jaati hai aankhien aap par 🌸" },
  { src: six, caption: "Fav photo",          message: "This is still my fav photo btw, nothing tops this🥰" },
  { src: seven, caption: "Cooked fr",         message: "Thank you meri baaton se na pakne ke liye, and i promise will always cook for you💝" },
  { src: eight, caption: "Destiny",        message: "It looks like we are looking to god, ki thank you godji iss insaan ko life mai laane ke liye, you wanted a person like me in your life , and i will always be.☀️" },
  { src: nine, caption: "Obsessed",        message: "Love you bangs, love your bangs , LOVE YOUR BANGS🌺" },
  { src: ten, caption: "Sexy Savitiri",            message: "Log Sati savitiri maangte hai , mujhe toh ek sexy savitiri milgayi, hotness with grace 🌙" },
  { src: eleven, caption: "Fool aur kaatien",           message: "Sorry is Fool mai bohot kaatien hai, thank you mujhe jhelne ke liye 🌷" },
  { src: twelve, caption: "Oh mere dil ke chain",              message: " Tum jo pakad lo hath mera , duniya badal sakta hu mai💌" },
  { src: thirteen, caption: "Morning Blues",              message: "Every morning thought , every thought actually. Love is endless like the blue sky, jab tak aasman rahega tabh tak yeh karwaan rahega , wow kya shayar hu mai 🌹" },
  { src: fourteen, caption: "Jhadga Tagda",           message: "For all the times i have hurt you with my silly little fights , i am sorry🤍" },
  { src: fifteen, caption: "Adventures Together",      message: "Every adventure is a thousand times better when you're beside me, har saffar ko special banane ke liye shukriya 🌍" },
];
// ╚══════════════════════════════════════════════════════════════════╝

// ── 11×9 heart shape grid — 1 = filled cell, 0 = empty ──────────────────────
const GRID = [
  [0,0,1,1,0,0,0,1,1,0,0],
  [0,1,1,1,1,0,1,1,1,1,0],
  [1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1],
  [0,1,1,1,1,1,1,1,1,1,0],
  [0,0,1,1,1,1,1,1,1,0,0],
  [0,0,0,1,1,1,1,1,0,0,0],
  [0,0,0,0,1,1,1,0,0,0,0],
  [0,0,0,0,0,1,0,0,0,0,0],
];

// Pre-compute the ordered list of filled cells so we can assign photo indices
const CELLS = []; // { r, c, photoIdx }
let cellCount = 0;
GRID.forEach((row, r) => {
  row.forEach((val, c) => {
    if (val === 1) {
      CELLS.push({ r, c, photoIdx: cellCount % PHOTOS.length });
      cellCount++;
    }
  });
});
// Total filled cells: 59  →  photos cycle through 15 with modulo (59 = 3×15 + 14)

// ── FLOATING HEARTS ──────────────────────────────────────────────────────────
function FloatingHearts() {
  return (
    <div style={{ position:"fixed", inset:0, pointerEvents:"none", overflow:"hidden", zIndex:0 }}>
      {Array.from({ length: 18 }, (_, i) => (
        <div key={i} style={{
          position:"absolute", bottom:"-30px",
          left:`${(i * 5.5) % 94}%`,
          fontSize:`${11 + (i * 3) % 16}px`,
          color:"#fb7185",
          opacity: 0.2 + (i * 0.03) % 0.4,
          animation:`fheart ${5 + (i*0.4)%5}s ${(i*0.35)%5}s linear infinite`,
        }}>♥</div>
      ))}
    </div>
  );
}

// ── PHOTO MODAL ──────────────────────────────────────────────────────────────
function PhotoModal({ photoIdx, onClose, onPrev, onNext }) {
  const [vis, setVis] = useState(false);
  const photo = PHOTOS[photoIdx];

  useEffect(() => {
    // tiny delay so the enter animation fires
    const id = setTimeout(() => setVis(true), 10);
    return () => clearTimeout(id);
  }, []);

  const handleClose = () => {
    setVis(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      onClick={handleClose}
      style={{
        position:"fixed", inset:0, zIndex:999,
        display:"flex", alignItems:"center", justifyContent:"center", padding:"16px",
        background:"rgba(10,2,6,0.78)", backdropFilter:"blur(10px)",
        opacity: vis ? 1 : 0,
        transition:"opacity 0.3s ease",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width:"100%", maxWidth:"340px",
          borderRadius:"24px", overflow:"hidden",
          background:"linear-gradient(150deg,#fff8fa,#fff)",
          border:"1.5px solid #fbbdcf",
          boxShadow:"0 24px 60px rgba(244,63,94,0.25)",
          transform: vis ? "scale(1) translateY(0)" : "scale(0.84) translateY(36px)",
          transition:"transform 0.35s cubic-bezier(.175,.885,.32,1.275)",
        }}
      >
        {/* photo */}
        <div style={{ position:"relative", height:"240px" }}>
          <img src={photo.src} alt={photo.caption}
            style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
          <div style={{
            position:"absolute", inset:0,
            background:"linear-gradient(to top, rgba(10,2,6,0.6) 0%, transparent 55%)",
          }}/>
          <div style={{
            position:"absolute", top:12, right:12,
            background:"#f43f5e", color:"#fff",
            fontSize:"0.72rem", fontWeight:700,
            padding:"2px 10px", borderRadius:"999px",
            fontFamily:"Lato, sans-serif",
          }}>{photoIdx + 1} / {PHOTOS.length}</div>
          <p style={{
            position:"absolute", bottom:12, left:16, right:16,
            color:"#fff", fontWeight:600, fontSize:"0.9rem", margin:0,
            fontFamily:"'Playfair Display', Georgia, serif",
            textShadow:"0 1px 6px rgba(0,0,0,0.6)",
          }}>{photo.caption}</p>
        </div>

        {/* message */}
        <div style={{ padding:"20px 24px 8px", textAlign:"center" }}>
          <div style={{ fontSize:"1.4rem", marginBottom:10,
            animation:"hbeat 1.4s ease-in-out infinite" }}>♥</div>
          <p style={{
            color:"#9f1239", lineHeight:1.65, margin:0,
            fontFamily:"'Playfair Display', Georgia, serif",
            fontSize:"0.97rem", fontStyle:"italic",
          }}>"{photo.message}"</p>
        </div>

        {/* buttons */}
        <div style={{ display:"flex", gap:8, padding:"16px 20px 20px" }}>
          <button onClick={onPrev} style={{
            flex:1, padding:"9px 0", borderRadius:"12px",
            border:"1.5px solid #fbbdcf", background:"transparent",
            color:"#f43f5e", fontSize:"0.85rem", fontWeight:600,
            cursor:"pointer", fontFamily:"Lato, sans-serif",
          }}>← Prev</button>
          <button onClick={handleClose} style={{
            flex:1, padding:"9px 0", borderRadius:"12px", border:"none",
            background:"linear-gradient(135deg,#f43f5e,#fb7185)",
            color:"#fff", fontSize:"0.85rem", fontWeight:600,
            cursor:"pointer", fontFamily:"Lato, sans-serif",
            boxShadow:"0 3px 14px rgba(244,63,94,0.4)",
          }}>Close ✕</button>
          <button onClick={onNext} style={{
            flex:1, padding:"9px 0", borderRadius:"12px",
            border:"1.5px solid #fbbdcf", background:"transparent",
            color:"#f43f5e", fontSize:"0.85rem", fontWeight:600,
            cursor:"pointer", fontFamily:"Lato, sans-serif",
          }}>Next →</button>
        </div>
      </div>
    </div>
  );
}

// ── HEART COLLAGE ─────────────────────────────────────────────────────────────
function HeartCollage() {
  // openIdx: null = closed, 0–14 = which PHOTO is open
  const [openIdx, setOpenIdx] = useState(null);
  const [revealedCount, setRevealedCount] = useState(0);

  useEffect(() => {
    let n = 0;
    const iv = setInterval(() => {
      n += 1;
      setRevealedCount(n);
      if (n >= CELLS.length) clearInterval(iv);
    }, 55);
    return () => clearInterval(iv);
  }, []);

  const handleOpen = (photoIdx) => setOpenIdx(photoIdx);
  const handleClose = () => setOpenIdx(null);
  const handlePrev = () => setOpenIdx(i => (i - 1 + PHOTOS.length) % PHOTOS.length);
  const handleNext = () => setOpenIdx(i => (i + 1) % PHOTOS.length);

  const COLS = 11;
  const ROWS = 9;
  const CELL = "min(8.8vw, 64px)";
  const GAP  = 3;

  return (
    <div style={{
      minHeight:"100vh",
      background:"linear-gradient(155deg,#fff4f7,#fde8ef 50%,#fbc7d4)",
      display:"flex", flexDirection:"column", alignItems:"center",
      padding:"32px 8px 32px", position:"relative",
    }}>
      <FloatingHearts />

      {/* header */}
      <div style={{ textAlign:"center", marginBottom:24, position:"relative", zIndex:1,
        animation:"slideD 0.8s ease both" }}>
        <p style={{
          color:"#fb7185", fontSize:"0.7rem", fontWeight:600,
          letterSpacing:"0.32em", textTransform:"uppercase",
          marginBottom:4, fontFamily:"Lato, sans-serif",
        }}>a gift made with love</p>
        <h2 style={{
          color:"#be123c", margin:0, fontWeight:700,
          fontFamily:"'Playfair Display', Georgia, serif",
          fontSize:"clamp(1.5rem,4.5vw,2.5rem)",
          textShadow:"0 2px 14px rgba(190,18,60,0.18)",
        }}>Our Story in Photos 🌹</h2>
      </div>

      {/* heart grid */}
      <div style={{
        position:"relative", zIndex:1,
        display:"grid",
        gridTemplateColumns:`repeat(${COLS}, ${CELL})`,
        gridTemplateRows:`repeat(${ROWS}, ${CELL})`,
        gap:`${GAP}px`,
        animation:"slideU 0.9s ease 0.2s both",
      }}>
        {GRID.flatMap((row, r) =>
          row.map((val, c) => {
            if (val === 0) {
              // empty cell — invisible placeholder to keep grid positions
              return (
                <div key={`${r}-${c}`} style={{
                  gridColumn: c + 1,
                  gridRow: r + 1,
                  visibility:"hidden",
                }} />
              );
            }

            // find this cell's data
            const cell = CELLS.find(cl => cl.r === r && cl.c === c);
            const photo = PHOTOS[cell.photoIdx];
            const cellIndex = CELLS.indexOf(cell);
            const visible = cellIndex < revealedCount;

            return (
              <div
                key={`${r}-${c}`}
                onClick={() => visible && handleOpen(cell.photoIdx)}
                style={{
                  gridColumn: c + 1,
                  gridRow: r + 1,
                  position:"relative",
                  overflow:"hidden",
                  borderRadius:"4px",
                  cursor:"pointer",
                  border:"1.5px solid rgba(244,63,94,0.2)",
                  boxShadow:"0 2px 6px rgba(244,63,94,0.12)",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "scale(1) rotate(0deg)" : "scale(0.2) rotate(15deg)",
                  transition:`opacity 0.4s ease ${cellIndex * 20}ms, transform 0.45s cubic-bezier(.175,.885,.32,1.275) ${cellIndex * 20}ms`,
                }}
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  style={{ width:"100%", height:"100%", objectFit:"cover", display:"block",
                    transition:"transform 0.3s ease" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.12)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
                />
                {/* heart on hover */}
                <div style={{
                  position:"absolute", inset:0,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  background:"rgba(244,63,94,0.5)",
                  fontSize:"0.95rem", color:"#fff",
                  opacity:0, transition:"opacity 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = "1"; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = "0"; }}
                >♥</div>
              </div>
            );
          })
        )}
      </div>

      <p style={{
        marginTop:24, color:"#fb7185", fontSize:"0.88rem",
        fontFamily:"'Playfair Display', Georgia, serif", fontStyle:"italic",
        textAlign:"center", position:"relative", zIndex:1,
        animation:"slideU 0.8s ease 0.5s both",
      }}>Tap any photo to read a message just for you 💌</p>

      {openIdx !== null && (
        <PhotoModal
          photoIdx={openIdx}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}

      <style>{globalCSS}</style>
    </div>
  );
}

// ── ENVELOPE SCENE ────────────────────────────────────────────────────────────
function EnvelopeScene({ onOpen }) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hint,    setHint]    = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHint(true), 1800);
    return () => clearTimeout(t);
  }, []);

  const handleClick = () => {
    if (clicked) return;
    setClicked(true);
    setTimeout(onOpen, 900);
  };

  return (
    <div style={{ position:"relative", width:"100%", minHeight:"100vh",
      display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>

      <img src={ILLUSTRATION} alt="Valentine" style={{
        position:"absolute", inset:0, width:"100%", height:"100%",
        objectFit:"cover", zIndex:0,
      }}/>

      <div style={{ position:"absolute", inset:0, zIndex:1,
        background:"radial-gradient(ellipse at 58% 68%, transparent 28%, rgba(150,15,35,0.18) 100%)" }}/>

      <FloatingHearts />

      {/* envelope hotspot */}
      <div style={{
        position:"absolute", zIndex:10,
        left:"52%", top:"73%",
        transform:"translate(-50%,-50%) rotate(-8deg)",
      }}>
        <div
          onClick={handleClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            position:"relative", cursor:"pointer", userSelect:"none",
            width:  "clamp(70px, 12vw, 130px)",
           height: "clamp(44px,  8vw,  82px)",
            animation: clicked ? "envExit 0.9s ease forwards" : "floatBob 2.8s ease-in-out infinite",
          }}
        >
          {/* glow */}
          <div style={{
            position:"absolute", inset:0, borderRadius:10, pointerEvents:"none",
            boxShadow: hovered
              ? "0 0 0 3px rgba(244,63,94,0.95), 0 0 32px 12px rgba(244,63,94,0.65)"
              : "0 0 0 2px rgba(244,63,94,0.65), 0 0 20px 6px rgba(244,63,94,0.38)",
            transition:"box-shadow 0.3s ease",
          }}/>
          {/* pulse ring */}
          {!clicked && (
            <div style={{
              position:"absolute", inset:0, borderRadius:10, pointerEvents:"none",
              border:"2px solid rgba(244,63,94,0.7)",
              animation:"pulseR 2s ease-out infinite",
            }}/>
          )}
          {/* label */}
          <div style={{
            position:"absolute", inset:0, pointerEvents:"none",
            display:"flex", alignItems:"center", justifyContent:"center",
          }}>
            <span style={{
              transform:"rotate(8deg)",
              background:"rgba(244,63,94,0.85)",
              color:"#fff", fontWeight:600,
              padding:"4px 12px", borderRadius:999,
              fontFamily:"'Playfair Display', Georgia, serif",
              fontSize:"clamp(0.55rem,1.1vw,0.78rem)",
              letterSpacing:"0.13em",
              boxShadow:"0 2px 12px rgba(244,63,94,0.45)",
              whiteSpace:"nowrap",
              opacity: hint && !clicked ? 1 : 0,
              transition:"opacity 0.7s ease",
            }}>✦ tap to open ✦</span>
          </div>
        </div>
      </div>

      <style>{globalCSS}</style>
    </div>
  );
}

// ── SHARED KEYFRAMES ─────────────────────────────────────────────────────────
const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;600&display=swap');
  @keyframes fheart  { 0%{transform:translateY(0) rotate(0);opacity:1} 100%{transform:translateY(-115vh) rotate(20deg);opacity:0} }
  @keyframes hbeat   { 0%,100%{transform:scale(1)} 14%{transform:scale(1.35)} 42%{transform:scale(1.2)} }
  @keyframes slideD  { from{opacity:0;transform:translateY(-20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes slideU  { from{opacity:0;transform:translateY(20px)}  to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
  @keyframes flashIn { 0%{opacity:0} 35%{opacity:1} 100%{opacity:0} }
  @keyframes heartPop{ 0%{transform:scale(0) rotate(-20deg)} 70%{transform:scale(1.25) rotate(6deg)} 100%{transform:scale(1)} }
  @keyframes floatBob{ 0%,100%{transform:translateY(0)} 50%{transform:translateY(-11px)} }
  @keyframes envExit { 0%{opacity:1;transform:scale(1)} 55%{opacity:1;transform:scale(1.2) translateY(-18px)} 100%{opacity:0;transform:scale(0.2) translateY(-70px)} }
  @keyframes pulseR  { 0%{transform:scale(1);opacity:0.85} 100%{transform:scale(1.65);opacity:0} }
`;

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function ValentineGift() {
  const [scene, setScene] = useState("envelope");

  return (
    <div style={{ position:"relative", width:"100%", minHeight:"100vh", overflowX:"hidden" }}>

      {scene === "envelope" && (
        <EnvelopeScene onOpen={() => {
          setScene("transition");
          setTimeout(() => setScene("collage"), 650);
        }} />
      )}

      {scene === "transition" && (
        <div style={{
          position:"fixed", inset:0, zIndex:999,
          background:"#f43f5e",
          display:"flex", alignItems:"center", justifyContent:"center",
          animation:"flashIn 0.65s ease forwards",
        }}>
          <span style={{ fontSize:88, animation:"heartPop 0.55s ease" }}>💌</span>
          <style>{globalCSS}</style>
        </div>
      )}

      {scene === "collage" && (
        <div style={{ animation:"fadeIn 0.7s ease both" }}>
          <HeartCollage />
        </div>
      )}

    </div>
  );
}