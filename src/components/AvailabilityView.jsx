import { useState } from 'react'

const DAYS = [
  { name:'Sunday',    on:true  },
  { name:'Monday',    on:true  },
  { name:'Tuesday',   on:false },
  { name:'Wednesday', on:false },
  { name:'Thursday',  on:false },
  { name:'Friday',    on:false },
  { name:'Saturday',  on:false },
]

export default function AvailabilityView() {
  const [active, setActive]   = useState(0)
  const [days,   setDays]     = useState(DAYS)

  const toggle = (i) => {
    setDays(days.map((d, j) => j === i ? { ...d, on: !d.on } : d))
  }

  return (
    <div style={{
      display:'grid',
      gridTemplateColumns:'220px 1fr',
      height:'100%',
      overflow:'hidden',
    }}>

      {/* Sidebar gauche */}
      <div style={{
        borderRight:'1px solid #E5DDD4',
        background:'#fff',
        display:'flex',
        flexDirection:'column',
        overflow:'hidden',
      }}>
        {/* Header */}
        <div style={{
          display:'flex', alignItems:'center', gap:8,
          padding:'14px 18px',
          borderBottom:'1px solid #E5DDD4',
        }}>
          <span style={{ fontSize:14, fontWeight:500 }}>Availability</span>
          <span style={{ marginLeft:'auto', color:'#888780', cursor:'pointer', fontSize:15 }}>✎</span>
        </div>

        {/* Liste */}
        {[
          { name:'Working Hours', tz:'Africa/Abidjan'  },
          { name:'Freelance',     tz:'Africa/Algiers'  },
        ].map((item, i) => (
          <div
            key={i}
            onClick={() => setActive(i)}
            style={{
              padding:'12px 18px',
              cursor:'pointer',
              borderBottom:'1px solid #F5F0EB',
              background: active === i ? '#F0E8DC' : '#fff',
              transition:'background 0.12s',
            }}
          >
            <div style={{ fontSize:13, fontWeight:500, color:'#2C2C2A' }}>{item.name}</div>
            <div style={{ fontSize:10, color:'#888780', marginTop:2 }}>🌐 {item.tz}</div>
          </div>
        ))}
      </div>

      {/* Contenu principal */}
      <div style={{ padding:'24px 28px', overflowY:'auto' }}>

        {/* Header */}
        <div style={{
          display:'flex', alignItems:'center',
          justifyContent:'space-between',
          marginBottom:24,
        }}>
          <h2 style={{ fontSize:19, fontWeight:500 }}>Working Hours</h2>
          <select style={{
            border:'1px solid #E5DDD4',
            borderRadius:8,
            padding:'6px 10px',
            fontSize:12,
            background:'#fff',
            color:'#888780',
            fontFamily:'inherit',
            cursor:'pointer',
            outline:'none',
          }}>
            <option>Select timezone...</option>
            <option>Africa/Algiers</option>
            <option>Europe/Paris</option>
            <option>America/New_York</option>
          </select>
        </div>

        {/* Liste des jours */}
        {days.map((d, i) => (
          <div
            key={i}
            style={{
              display:'flex', alignItems:'center', gap:14,
              padding:'12px 14px',
              border:'1px solid #E5DDD4',
              borderRadius:9,
              marginBottom:8,
              background:'#fff',
            }}
          >
            <button
              className={`toggle ${d.on ? 'on' : 'off'}`}
              onClick={() => toggle(i)}
              aria-label={`Toggle ${d.name}`}
            />

            <span style={{ fontSize:13, color:'#2C2C2A', flex:1 }}>{d.name}</span>

            {d.on && (
              <>
                <select style={{
                  border:'1px solid #E5DDD4', borderRadius:7,
                  padding:'6px 8px', fontSize:11,
                  background:'#F9F6F2', fontFamily:'inherit',
                  color:'#2C2C2A', outline:'none', cursor:'pointer',
                }}>
                  <option>09:00 AM</option>
                  <option>08:00 AM</option>
                  <option>10:00 AM</option>
                </select>

                <span style={{ color:'#C4BDB5', fontSize:12 }}>—</span>

                <select style={{
                  border:'1px solid #E5DDD4', borderRadius:7,
                  padding:'6px 8px', fontSize:11,
                  background:'#F9F6F2', fontFamily:'inherit',
                  color:'#2C2C2A', outline:'none', cursor:'pointer',
                }}>
                  <option>05:00 PM</option>
                  <option>04:00 PM</option>
                  <option>06:00 PM</option>
                </select>

                <button style={{
                  width:24, height:24,
                  borderRadius:5,
                  border:'1px solid #E5DDD4',
                  background:'#fff',
                  cursor:'pointer',
                  fontSize:13,
                  color:'#888780',
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>+</button>
              </>
            )}
          </div>
        ))}

        {/* Footer boutons */}
        <div style={{ display:'flex', justifyContent:'flex-end', gap:10, marginTop:24 }}>
          <button style={{
            background:'transparent',
            color:'#C9A882',
            border:'1.5px solid #C9A882',
            borderRadius:8,
            padding:'8px 18px',
            fontSize:13,
            fontWeight:500,
            cursor:'pointer',
            fontFamily:'inherit',
          }}>
            Set as default
          </button>
          <button className="btn-primary">
            Create
          </button>
        </div>

      </div>
    </div>
  )
}