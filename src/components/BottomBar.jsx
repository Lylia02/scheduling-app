import { useState, useEffect } from 'react'

const WEATHER = [
  { d:'Mon', icon:'☀️',  temp:38, desc:'Sunny' },
  { d:'Tue', icon:'⛈️',  temp:27, desc:'Thunder Storm' },
  { d:'Wed', icon:'🌧️',  temp:15, desc:'Heavy Rain' },
  { d:'Thu', icon:'❄️',  temp:0,  desc:'Heavy Snow' },
  { d:'Fri', icon:'🌫️',  temp:10, desc:'Overcast' },
  { d:'Sat', icon:'⛅',  temp:20, desc:'Partly Cloudy' },
  { d:'Sun', icon:'🌤️',  temp:30, desc:'Cloudy' },
]

const FLAGS = {
  USA: (
    <svg viewBox="0 0 60 40" width="28" height="19" style={{borderRadius:3,border:'0.5px solid #ddd'}}>
      <rect width="60" height="40" fill="#B22234"/>
      <rect y="3"  width="60" height="3" fill="#fff"/>
      <rect y="9"  width="60" height="3" fill="#fff"/>
      <rect y="15" width="60" height="3" fill="#fff"/>
      <rect y="21" width="60" height="3" fill="#fff"/>
      <rect y="27" width="60" height="3" fill="#fff"/>
      <rect y="33" width="60" height="3" fill="#fff"/>
      <rect width="24" height="22" fill="#3C3B6E"/>
      {[...Array(5)].map((_, row) =>
        [...Array(row % 2 === 0 ? 6 : 5)].map((_, col) => (
          <text
            key={`${row}-${col}`}
            x={row % 2 === 0 ? 2 + col * 4 : 4 + col * 4}
            y={4 + row * 4}
            fontSize="3" fill="#fff" textAnchor="middle"
          >★</text>
        ))
      )}
    </svg>
  ),
  UK: (
    <svg viewBox="0 0 60 40" width="28" height="19" style={{borderRadius:3,border:'0.5px solid #ddd'}}>
      <rect width="60" height="40" fill="#012169"/>
      <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="8"/>
      <path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" strokeWidth="5"/>
      <path d="M30,0 V40 M0,20 H60" stroke="#fff" strokeWidth="13"/>
      <path d="M30,0 V40 M0,20 H60" stroke="#C8102E" strokeWidth="8"/>
    </svg>
  ),
  Japan: (
    <svg viewBox="0 0 60 40" width="28" height="19" style={{borderRadius:3,border:'0.5px solid #ddd'}}>
      <rect width="60" height="40" fill="#fff"/>
      <circle cx="30" cy="20" r="12" fill="#BC002D"/>
    </svg>
  ),
  Australia: (
    <svg viewBox="0 0 60 40" width="28" height="19" style={{borderRadius:3,border:'0.5px solid #ddd'}}>
      <rect width="60" height="40" fill="#00008B"/>
      <path d="M0,0 L30,20 M30,0 L0,20" stroke="#fff" strokeWidth="5"/>
      <path d="M0,0 L30,20 M30,0 L0,20" stroke="#C8102E" strokeWidth="3"/>
      <path d="M15,0 V20 M0,10 H30" stroke="#fff" strokeWidth="8"/>
      <path d="M15,0 V20 M0,10 H30" stroke="#C8102E" strokeWidth="5"/>
      <text x="45" y="13" fontSize="7" fill="#fff" textAnchor="middle">★</text>
      <text x="38" y="22" fontSize="5" fill="#fff" textAnchor="middle">★</text>
      <text x="52" y="22" fontSize="5" fill="#fff" textAnchor="middle">★</text>
      <text x="45" y="30" fontSize="5" fill="#fff" textAnchor="middle">★</text>
      <text x="55" y="17" fontSize="5" fill="#fff" textAnchor="middle">★</text>
    </svg>
  ),
  HongKong: (
    <svg viewBox="0 0 60 40" width="28" height="19" style={{borderRadius:3,border:'0.5px solid #ddd'}}>
      <rect width="60" height="40" fill="#DE2910"/>
      <circle cx="30" cy="20" r="10" fill="#DE2910" stroke="#fff" strokeWidth="0.5"/>
      <path d="M30,10 Q35,15 30,20 Q25,15 30,10Z" fill="#fff"/>
      <path d="M30,10 Q35,15 30,20 Q25,15 30,10Z" fill="#fff" transform="rotate(72,30,20)"/>
      <path d="M30,10 Q35,15 30,20 Q25,15 30,10Z" fill="#fff" transform="rotate(144,30,20)"/>
      <path d="M30,10 Q35,15 30,20 Q25,15 30,10Z" fill="#fff" transform="rotate(216,30,20)"/>
      <path d="M30,10 Q35,15 30,20 Q25,15 30,10Z" fill="#fff" transform="rotate(288,30,20)"/>
    </svg>
  ),
  Algeria: (
    <svg viewBox="0 0 60 40" width="28" height="19" style={{borderRadius:3,border:'0.5px solid #ddd'}}>
      <rect width="30" height="40" fill="#006233"/>
      <rect x="30" width="30" height="40" fill="#fff"/>
      <circle cx="32" cy="20" r="8" fill="#D21034"/>
      <circle cx="34" cy="20" r="8" fill="#fff"/>
      <text x="34" y="24" fontSize="10" fill="#D21034" textAnchor="middle">☪</text>
    </svg>
  ),
  France: (
    <svg viewBox="0 0 60 40" width="28" height="19" style={{borderRadius:3,border:'0.5px solid #ddd'}}>
      <rect width="20" height="40" fill="#002395"/>
      <rect x="20" width="20" height="40" fill="#fff"/>
      <rect x="40" width="20" height="40" fill="#ED2939"/>
    </svg>
  ),
  India: (
    <svg viewBox="0 0 60 40" width="28" height="19" style={{borderRadius:3,border:'0.5px solid #ddd'}}>
      <rect width="60" height="14" fill="#FF9933"/>
      <rect y="13" width="60" height="14" fill="#fff"/>
      <rect y="26" width="60" height="14" fill="#138808"/>
      <circle cx="30" cy="20" r="5" fill="none" stroke="#000080" strokeWidth="1"/>
      <text x="30" y="23" fontSize="7" fill="#000080" textAnchor="middle">⊙</text>
    </svg>
  ),
}

const CLOCKS = [
  { city:'USA',       flagKey:'USA',       offset:-5   },
  { city:'UK',        flagKey:'UK',        offset:0    },
  { city:'Japan',     flagKey:'Japan',     offset:9    },
  { city:'Australia', flagKey:'Australia', offset:11   },
  { city:'Hong Kong', flagKey:'HongKong',  offset:8    },
  { city:'Algeria',   flagKey:'Algeria',   offset:1    },
  { city:'France',    flagKey:'France',    offset:1    },
  { city:'India',     flagKey:'India',     offset:5.5  },
]

function Clock({ city, flagKey, offset }) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const utc    = time.getTime() + time.getTimezoneOffset() * 60000
  const local  = new Date(utc + offset * 3600000)
  const h      = local.getHours()
  const m      = local.getMinutes()
  const s      = local.getSeconds()
  const hDeg   = (h % 12 + m / 60) * 30
  const mDeg   = (m + s / 60) * 6
  const isDark = h >= 20 || h < 7

  const timeStr = local.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', hour12: true,
  })

  return (
    <div style={{
      display:'flex', flexDirection:'column',
      alignItems:'center', gap:4,
      minWidth:82, flex:1,
    }}>
      {/* Horloge analogique */}
      <div style={{
        width:42, height:42, borderRadius:'50%',
        background: isDark ? '#1C3A2F' : '#fff',
        border: isDark ? 'none' : '1.5px solid #E5DDD4',
        position:'relative', flexShrink:0,
      }}>
        {/* Aiguille heures */}
        <div style={{
          position:'absolute',
          bottom:'50%', left:'calc(50% - 0.75px)',
          width:1.5, height:10,
          background: isDark ? '#fff' : '#2C2C2A',
          borderRadius:2,
          transformOrigin:'bottom center',
          transform:`rotate(${hDeg}deg)`,
        }}/>
        {/* Aiguille minutes */}
        <div style={{
          position:'absolute',
          bottom:'50%', left:'calc(50% - 0.5px)',
          width:1, height:14,
          background: isDark ? '#fff' : '#2C2C2A',
          borderRadius:2,
          transformOrigin:'bottom center',
          transform:`rotate(${mDeg}deg)`,
        }}/>
        {/* Point central */}
        <div style={{
          position:'absolute',
          width:3, height:3, borderRadius:'50%',
          background: isDark ? '#fff' : '#2C2C2A',
          top:'50%', left:'50%',
          transform:'translate(-50%,-50%)',
        }}/>
      </div>

      {/* Drapeau */}
      {FLAGS[flagKey]}

      <span style={{ fontSize:10, fontWeight:500, color:'#2C2C2A', textAlign:'center' }}>
        {city}
      </span>
      <span style={{ fontSize:9, color:'#888780' }}>{timeStr}</span>
    </div>
  )
}

export default function BottomBar() {
  const [mode, setMode] = useState('timezone')

  return (
    <div style={{
      borderTop:'1px solid #E5DDD4',
      background:'#fff',
      padding:'8px 24px',
      flexShrink:0,
    }}>
      {/* Toggle Weather / Timezone */}
      <div style={{ display:'flex', gap:8, justifyContent:'center', marginBottom:10 }}>
        <button
          className={`chip${mode === 'weather' ? ' active' : ''}`}
          onClick={() => setMode('weather')}
        >☀️ Weather</button>
        <button
          className={`chip${mode === 'timezone' ? ' active' : ''}`}
          onClick={() => setMode('timezone')}
        >🕐 Timezone</button>
      </div>

      {/* Timezone */}
      {mode === 'timezone' && (
        <div style={{ display:'flex', overflowX:'auto', gap:4 }}>
          {CLOCKS.map(c => (
            <Clock key={c.city} {...c} />
          ))}
        </div>
      )}

      {/* Weather */}
      {mode === 'weather' && (
        <div style={{ display:'flex', justifyContent:'space-around' }}>
          {WEATHER.map(w => (
            <div key={w.d} style={{
              display:'flex', flexDirection:'column',
              alignItems:'center', gap:3, flex:1,
            }}>
              <span style={{ fontSize:22 }}>{w.icon}</span>
              <span style={{ fontSize:11, fontWeight:500 }}>{w.d}</span>
              <span style={{ fontSize:14, fontWeight:500 }}>{w.temp}°</span>
              <span style={{ fontSize:9, color:'#888780' }}>{w.desc}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}