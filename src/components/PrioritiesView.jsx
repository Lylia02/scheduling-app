import { useState, useEffect, useRef } from 'react'
import BottomBar from './BottomBar'

const ALL_EVENTS = [
  { time:'8:30 AM – 8:50 AM',   title:'Meeting with the patron', desc:'About hiring a new developer...' },
  { time:'9:00 AM – 9:45 AM',   title:'Design review',           desc:'Review the new UI components...' },
  { time:'10:15 AM – 11:00 AM', title:'Call with client',        desc:'Discuss project timeline...' },
  { time:'2:00 PM – 2:30 PM',   title:'Team standup',            desc:'Weekly sync with the team...' },
  { time:'3:30 PM – 4:15 PM',   title:'Code review',             desc:'Review code for the new feature...' },
]

const TOTAL_W  = 1800
const VB_H     = 500
const TOP_Y    = 60
const BOT_Y    = 420
const MID_Y    = VB_H / 2

const POINTS = ALL_EVENTS.map((_, i) => ({
  x: 200 + i * 380,
  y: i % 2 === 0 ? BOT_Y : TOP_Y,
}))

function buildPath() {
  let d = `M 0 ${MID_Y}`
  POINTS.forEach((p, i) => {
    const prev = i === 0 ? { x: 0, y: MID_Y } : POINTS[i - 1]
    const cpx  = (prev.x + p.x) / 2
    d += ` C ${cpx} ${prev.y} ${cpx} ${p.y} ${p.x} ${p.y}`
  })
  const last = POINTS[POINTS.length - 1]
  d += ` C ${TOTAL_W - 100} ${last.y} ${TOTAL_W} ${MID_Y} ${TOTAL_W} ${MID_Y}`
  return d
}

export default function PrioritiesView() {
  const [offsetX, setOffsetX] = useState(0)
  const containerRef          = useRef(null)

  useEffect(() => {
    const handle = (e) => {
      if (!containerRef.current) return
      const rect  = containerRef.current.getBoundingClientRect()
      const cx    = rect.left + rect.width / 2
      const delta = (e.clientX - cx) / rect.width
      setOffsetX(delta * -400)
    }
    window.addEventListener('mousemove', handle)
    return () => window.removeEventListener('mousemove', handle)
  }, [])

  return (
    <div style={{ display:'flex', flexDirection:'column', flex:1, overflow:'hidden' }}>
      <div
        ref={containerRef}
        style={{ flex:1, overflow:'hidden', position:'relative', background:'#FAF7F2' }}
      >
        <div style={{
          position:'absolute',
          top: 0, left: 0,
          width: TOTAL_W,
          height: '100%',
          transform: `translateX(calc(-50% + 50vw + ${offsetX}px))`,
          transition: 'transform 0.2s ease-out',
        }}>

          {/* Courbe SVG */}
          <svg
            style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%' }}
            viewBox={`0 0 ${TOTAL_W} ${VB_H}`}
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              d={buildPath()}
              fill="none"
              stroke="#C9A882"
              strokeWidth="3"
            />
          </svg>

          {/* Events */}
          {ALL_EVENTS.map((ev, i) => {
            const p      = POINTS[i]
            const isBot  = p.y === BOT_Y

            // convertion viewbox → % hauteur conteneur
            const pct = (val) => `${(val / VB_H) * 100}%`

            const dotTop  = pct(p.y)
            const lineTop = isBot ? pct(p.y - 80)  : pct(p.y + 5)
            const timeTop = isBot ? pct(p.y - 105) : pct(p.y + 88)
            const cardTop = isBot ? pct(p.y - 240) : pct(p.y + 108)

            return (
              <div key={i}>

                {/* Point */}
                <div style={{
                  position:'absolute',
                  left: p.x,
                  top: dotTop,
                  transform: 'translate(-50%, -50%)',
                  width:12, height:12,
                  borderRadius:'50%',
                  background:'#C9A882',
                  border:'2.5px solid #fff',
                  boxShadow:'0 0 0 1.5px #C9A882',
                  zIndex:2,
                }}/>

                {/* Ligne verticale */}
                <div style={{
                  position:'absolute',
                  left: p.x,
                  top: lineTop,
                  transform: 'translateX(-50%)',
                  width: 1.5,
                  height: 75,
                  background: '#D5CEC7',
                }}/>

                {/* Heure */}
                <div style={{
                  position:'absolute',
                  left: p.x,
                  top: timeTop,
                  transform: 'translateX(-50%)',
                  fontSize:12,
                  fontWeight:500,
                  color:'#888780',
                  whiteSpace:'nowrap',
                }}>
                  {ev.time.split(' – ')[0]}
                </div>

                {/* Carte */}
                <div style={{
                  position:'absolute',
                  left: p.x,
                  top: cardTop,
                  transform: 'translateX(-50%)',
                  background:'#fff',
                  border:'1px solid #E5DDD4',
                  borderRadius:12,
                  padding:'11px 14px',
                  width:185,
                  boxShadow:'0 2px 12px rgba(0,0,0,0.07)',
                  cursor:'pointer',
                  zIndex:3,
                }}>
                  <div style={{
                    fontSize:9, color:'#B4B2A9',
                    marginBottom:5,
                    display:'flex', alignItems:'center', gap:4,
                  }}>
                    🕐 {ev.time}
                  </div>
                  <div style={{ fontWeight:500, color:'#2C2C2A', fontSize:13, lineHeight:1.4 }}>
                    {ev.title}
                  </div>
                  <div style={{ color:'#888780', fontSize:10, marginTop:3 }}>
                    {ev.desc}
                  </div>
                </div>

              </div>
            )
          })}
        </div>
      </div>

      <BottomBar/>
    </div>
  )
}