import { useState, useEffect } from 'react'
import BottomBar from './BottomBar'

const TIMES = [
  '08:00','09:00','10:00','11:00','12:00',
  '13:00','14:00','15:00','16:00','17:00',
  '18:00','19:00','20:00','21:00','22:00','23:00'
]

const DAYS = [
  { n:'Mon', d:23, today:true },
  { n:'Tue', d:24 },
  { n:'Wed', d:25 },
  { n:'Thu', d:26 },
  { n:'Fri', d:27 },
  { n:'Sat', d:28 },
  { n:'Sun', d:29 },
]

const EVENTS = [
  { day:0, sh:9,  sm:15, eh:11, em:15, title:'Meeting with the patron', color:'#52B788' },
  { day:4, sh:13, sm:0,  eh:15, em:15, title:'Meeting with the patron', color:'#C9A882' },
]

const MONTH_DAYS = Array.from({ length: 31 }, (_, i) => i + 1)

function Tooltip({ ev, onClose }) {
  return (
    <div
      onClick={e => e.stopPropagation()}
      style={{
        position:'absolute', left:'105%', top:0,
        background:'#fff',
        border:'1px solid #E5DDD4',
        borderRadius:12,
        padding:'14px 16px',
        width:250,
        zIndex:200,
        boxShadow:'0 4px 20px rgba(0,0,0,0.09)',
        fontSize:12,
      }}
    >
      <button
        onClick={onClose}
        style={{
          position:'absolute', top:9, right:9,
          width:20, height:20, borderRadius:'50%',
          background:'#FAF7F2', border:'none',
          cursor:'pointer', fontSize:11, color:'#888780',
        }}
      >✕</button>

      <div style={{ fontSize:13, fontWeight:500, marginBottom:10, paddingRight:20, lineHeight:1.4 }}>
        1h meeting — Akram & Lilia
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
        <div style={{ display:'flex', gap:8, color:'#888780', fontSize:11 }}>
          <span>🕐</span>
          <span>Wed Dec 23 · {ev.sh}:{String(ev.sm).padStart(2,'0')} – {ev.eh}:{String(ev.em).padStart(2,'0')}</span>
        </div>
        <div style={{ display:'flex', gap:8, color:'#888780', fontSize:11 }}>
          <span>👤</span>
          <div>
            Akram <span className="badge badge-host">Host</span>
            <br/>
            Lilia <span className="badge badge-guest">Guest</span>
          </div>
        </div>
        <div style={{ display:'flex', gap:8, color:'#888780', fontSize:11 }}>
          <span>📍</span><span>Tichy, Algeria</span>
        </div>
        <div style={{ display:'flex', gap:8, color:'#888780', fontSize:11 }}>
          <span>💬</span><span>Discuss the apartment price</span>
        </div>
      </div>
    </div>
  )
}

function WeekView() {
  const [tip, setTip] = useState(null)
  const H = 52

  return (
    <div style={{ display:'flex', flexDirection:'column', flex:1, overflow:'hidden' }}>
      <div style={{
        display:'grid',
        gridTemplateColumns:'52px repeat(7, 1fr)',
        borderBottom:'1px solid #E5DDD4',
        background:'#fff',
        flexShrink:0,
      }}>
        <div/>
        {DAYS.map(d => (
          <div key={d.n} style={{ textAlign:'center', padding:'6px 2px 8px' }}>
            <div style={{ fontSize:10, color:'#888780' }}>{d.n}</div>
            {d.today ? (
              <div style={{
                width:28, height:28, borderRadius:'50%',
                background:'#1C3A2F', color:'#fff',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:13, margin:'2px auto 0',
              }}>{d.d}</div>
            ) : (
              <div style={{ fontSize:16, color:'#2C2C2A', marginTop:2, textAlign:'center' }}>{d.d}</div>
            )}
          </div>
        ))}
      </div>

      <div style={{
        display:'grid',
        gridTemplateColumns:'52px repeat(7, 1fr)',
        overflowY:'auto',
        flex:1,
      }}>
        <div>
          {TIMES.map(t => (
            <div key={t} style={{
              height:H,
              borderBottom:'1px solid #E5DDD4',
              display:'flex', alignItems:'flex-start',
              padding:'3px 6px 0',
              justifyContent:'flex-end',
              flexShrink:0,
            }}>
              <span style={{ fontSize:9, color:'#C4BDB5' }}>{t}</span>
            </div>
          ))}
        </div>

        {DAYS.map((d, di) => {
          const dayEvs = EVENTS.filter(e => e.day === di)
          return (
            <div key={d.n} style={{ borderLeft:'1px solid #E5DDD4', position:'relative' }}>
              {TIMES.map(t => (
                <div key={t} style={{ height:H, borderBottom:'1px solid #f0ece8' }}/>
              ))}
              {dayEvs.map((ev, ei) => {
                const startMin = (ev.sh - 8) * 60 + ev.sm
                const endMin   = (ev.eh - 8) * 60 + ev.em
                const top      = (startMin / 60) * H
                const height   = ((endMin - startMin) / 60) * H
                const key      = `${di}-${ei}`
                return (
                  <div
                    key={ei}
                    onClick={e => { e.stopPropagation(); setTip(tip === key ? null : key) }}
                    style={{
                      position:'absolute',
                      top, height,
                      left:3, right:3,
                      borderRadius:7,
                      padding:'5px 7px',
                      background:ev.color,
                      cursor:'pointer',
                    }}
                  >
                    <div style={{ fontSize:10, fontWeight:500, color:'#fff', overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis' }}>
                      {ev.title}
                    </div>
                    <div style={{ fontSize:9, color:'rgba(255,255,255,0.8)', marginTop:1 }}>
                      🕐 {ev.sh}:{String(ev.sm).padStart(2,'0')} – {ev.eh}:{String(ev.em).padStart(2,'0')}
                    </div>
                    {tip === key && <Tooltip ev={ev} onClose={() => setTip(null)}/>}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function DayView() {
  const H = 52
  return (
    <div style={{ display:'flex', flexDirection:'column', flex:1, overflow:'hidden' }}>
      <div style={{
        display:'grid', gridTemplateColumns:'52px 1fr',
        borderBottom:'1px solid #E5DDD4',
        background:'#fff', flexShrink:0,
      }}>
        <div/>
        <div style={{ textAlign:'center', padding:'6px 2px 8px' }}>
          <div style={{ fontSize:10, color:'#888780' }}>Mon</div>
          <div style={{
            width:28, height:28, borderRadius:'50%',
            background:'#1C3A2F', color:'#fff',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:13, margin:'2px auto 0',
          }}>23</div>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'52px 1fr', overflowY:'auto', flex:1 }}>
        <div>
          {TIMES.map(t => (
            <div key={t} style={{
              height:H, borderBottom:'1px solid #E5DDD4',
              display:'flex', alignItems:'flex-start',
              padding:'3px 6px 0', justifyContent:'flex-end',
            }}>
              <span style={{ fontSize:9, color:'#C4BDB5' }}>{t}</span>
            </div>
          ))}
        </div>
        <div style={{ borderLeft:'1px solid #E5DDD4', position:'relative' }}>
          {TIMES.map(t => <div key={t} style={{ height:H, borderBottom:'1px solid #f0ece8' }}/>)}
          <div style={{
            position:'absolute', top:1.25*H, height:2*H,
            left:3, right:3, borderRadius:7, padding:'5px 7px',
            background:'#52B788',
          }}>
            <div style={{ fontSize:10, fontWeight:500, color:'#fff' }}>Meeting with the patron</div>
            <div style={{ fontSize:9, color:'rgba(255,255,255,0.8)', marginTop:1 }}>🕐 09:15 AM – 11:15 AM</div>
          </div>
          <div style={{
            position:'absolute', top:9*H, height:H,
            left:3, right:3, borderRadius:7, padding:'5px 7px',
            background:'#C9A882',
          }}>
            <div style={{ fontSize:10, fontWeight:500, color:'#fff' }}>Meeting with the patron</div>
            <div style={{ fontSize:9, color:'rgba(255,255,255,0.8)', marginTop:1 }}>🕐 5:00 PM – 6:00 PM</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MonthView() {
  return (
    <div style={{ flex:1, overflowY:'auto' }}>
      <div style={{
        display:'grid', gridTemplateColumns:'repeat(7,1fr)',
        padding:'0 24px',
        borderBottom:'1px solid #E5DDD4',
        background:'#fff',
      }}>
        {['Sun.','Mon.','Tue.','Wed.','Thu.','Fri.','Sat.'].map(d => (
          <div key={d} style={{ textAlign:'center', padding:'8px 0', fontSize:11, color:'#888780' }}>{d}</div>
        ))}
      </div>

      <div style={{
        display:'grid', gridTemplateColumns:'repeat(7,1fr)',
        border:'1px solid #E5DDD4', borderRadius:10,
        margin:'12px 24px', overflow:'hidden', background:'#fff',
      }}>
        {MONTH_DAYS.map((d, i) => (
          <div key={i} style={{
            borderRight: i % 7 === 6 ? 'none' : '1px solid #f0ece8',
            borderBottom:'1px solid #f0ece8',
            minHeight:80, padding:'5px 7px',
            cursor:'pointer',
          }}>
            {d === 23 ? (
              <div style={{
                width:20, height:20, borderRadius:'50%',
                background:'#1C3A2F', color:'#fff',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:10, marginBottom:3,
              }}>{d}</div>
            ) : (
              <div style={{ fontSize:12, color:'#888780', marginBottom:3 }}>{d}</div>
            )}
            {d === 23 && (
              <div style={{ fontSize:9, padding:'2px 5px', borderRadius:3, background:'#EAF7F0', color:'#1C6B43', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                9:15 AM Meeting with the patron
              </div>
            )}
            {d === 26 && (
              <div style={{ fontSize:9, padding:'2px 5px', borderRadius:3, background:'#EAF7F0', color:'#1C6B43' }}>
                11:00 AM Meeting
              </div>
            )}
            {d === 1 && (
              <div style={{ fontSize:9, padding:'2px 6px', borderRadius:3, background:'#52B788', color:'#fff' }}>
                New Year 🎉
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function CalendarView() {
  const [view, setView]   = useState('week')
  const [mouse, setMouse] = useState({ x:0, y:0 })

  useEffect(() => {
    const handle = (e) => {
      const cx = window.innerWidth  / 2
      const cy = window.innerHeight / 2
      setMouse({
        x: (e.clientX - cx) / cx,
        y: (e.clientY - cy) / cy,
      })
    }
    window.addEventListener('mousemove', handle)
    return () => window.removeEventListener('mousemove', handle)
  }, [])

  return (
    <div style={{ display:'flex', flexDirection:'column', flex:1, overflow:'hidden' }}>

      <div style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'10px 24px',
        borderBottom:'1px solid #E5DDD4',
        background:'#fff', flexShrink:0,
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <button className="btn-ghost" style={{ padding:'5px 12px', fontSize:12 }}>Today</button>
          <button style={{ background:'none', border:'none', cursor:'pointer', fontSize:16, color:'#888780' }}>‹</button>
          <button style={{ background:'none', border:'none', cursor:'pointer', fontSize:16, color:'#888780' }}>›</button>
          <span style={{ fontSize:15, fontWeight:500 }}>December 2024</span>
        </div>

        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div className="seg-group">
            {['Day','Week','Month'].map(v => (
              <button
                key={v}
                className={`seg-btn${view === v.toLowerCase() ? ' active' : ''}`}
                onClick={() => setView(v.toLowerCase())}
              >{v}</button>
            ))}
          </div>
          <div style={{
            width:28, height:28,
            background:'#1C3A2F', borderRadius:6,
            display:'flex', alignItems:'center', justifyContent:'center',
            color:'#fff', fontSize:13, cursor:'pointer',
          }}>⊞</div>
        </div>
      </div>

      {view === 'week'  && <WeekView/>}
      {view === 'day'   && <DayView/>}
      {view === 'month' && <MonthView/>}

      <BottomBar mouse={mouse}/>
    </div>
  )
}