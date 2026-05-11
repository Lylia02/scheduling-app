import { useState } from 'react'

const EVENTS_LIST = [
  'Quick Chat',
  '15 Min Meeting',
  'Secret Meeting',
  '30 Min Meeting',
  'Tennis Class',
  'Test 2',
  'test 1',
]

export default function EventsView() {
  const [active, setActive] = useState(0)
  const [toggles, setToggles] = useState({ hidden: true, confirm: false })
  const [duration, setDuration] = useState(15)

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
          display:'flex', alignItems:'center',
          justifyContent:'space-between',
          padding:'14px 18px',
          borderBottom:'1px solid #E5DDD4',
          flexShrink:0,
        }}>
          <span style={{ fontSize:14, fontWeight:500 }}>Events Management</span>
          <button style={{
            width:24, height:24, borderRadius:5,
            border:'1px solid #E5DDD4',
            background:'#fff', cursor:'pointer',
            fontSize:14, color:'#888780',
          }}>+</button>
        </div>

        {/* Liste événements */}
        <div style={{ overflowY:'auto', flex:1 }}>
          {EVENTS_LIST.map((e, i) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              style={{
                padding:'13px 18px',
                cursor:'pointer',
                borderBottom:'1px solid #F5F0EB',
                fontSize:13,
                color:'#2C2C2A',
                background: active === i ? '#F0E8DC' : '#fff',
                transition:'background 0.12s',
              }}
            >{e}</div>
          ))}
        </div>
      </div>

      {/* Formulaire */}
      <div style={{ padding:'24px 28px', overflowY:'auto' }}>

        {/* Title */}
        <div style={{
          background:'#fff', border:'1px solid #E5DDD4',
          borderRadius:11, padding:'18px', marginBottom:10,
        }}>
          <label style={{ fontSize:12, fontWeight:500, display:'block', marginBottom:8 }}>
            Title
          </label>
          <input className="form-input" defaultValue="Quick chat"/>
        </div>

        {/* Description */}
        <div style={{
          background:'#fff', border:'1px solid #E5DDD4',
          borderRadius:11, padding:'18px', marginBottom:10,
        }}>
          <label style={{ fontSize:12, fontWeight:500, display:'block', marginBottom:8 }}>
            Description
          </label>
          <textarea
            className="form-textarea"
            defaultValue="A quick video meeting about......"
          />
        </div>

        {/* URL */}
        <div style={{
          background:'#fff', border:'1px solid #E5DDD4',
          borderRadius:11, padding:'18px', marginBottom:10,
        }}>
          <label style={{ fontSize:12, fontWeight:500, display:'block', marginBottom:8 }}>
            URL
          </label>
          <div style={{ display:'flex' }}>
            <span style={{
              background:'#1C3A2F', color:'#fff',
              padding:'8px 12px',
              borderRadius:'7px 0 0 7px',
              fontSize:12, fontWeight:500,
            }}>username</span>
            <input
              style={{
                border:'1px solid #E5DDD4', borderLeft:'none',
                borderRadius:'0 7px 7px 0',
                padding:'8px 11px', fontSize:12,
                background:'#F9F6F2', fontFamily:'inherit',
                color:'#2C2C2A', outline:'none', flex:1,
              }}
              defaultValue="Quick chat"
            />
          </div>
        </div>

        {/* Duration */}
        <div style={{
          background:'#fff', border:'1px solid #E5DDD4',
          borderRadius:11, padding:'18px', marginBottom:10,
        }}>
          <label style={{ fontSize:12, fontWeight:500, display:'block', marginBottom:8 }}>
            Duration
          </label>
          <div style={{ display:'flex', alignItems:'center', gap:0 }}>
            <input
              type="number"
              value={duration}
              onChange={e => setDuration(e.target.value)}
              style={{
                border:'1px solid #E5DDD4',
                borderRadius:'7px 0 0 7px',
                padding:'8px 11px', fontSize:12,
                background:'#F9F6F2', fontFamily:'inherit',
                width:80, outline:'none',
              }}
            />
            <button style={{
              background:'#1C3A2F', color:'#fff',
              padding:'8px 14px',
              borderRadius:'0 7px 7px 0',
              fontSize:12, fontWeight:500,
              border:'none', cursor:'pointer',
            }}>minutes</button>
          </div>
        </div>

        {/* Hidden Event */}
        <div style={{
          background:'#fff', border:'1px solid #E5DDD4',
          borderRadius:11, padding:'18px', marginBottom:10,
        }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div>
              <div style={{ fontSize:13, fontWeight:500, color:'#2C2C2A' }}>Hidden Event</div>
              <div style={{ fontSize:10, color:'#888780', marginTop:3 }}>
                Hide event from the profile.
              </div>
            </div>
            <button
              className={`toggle ${toggles.hidden ? 'on' : 'off'}`}
              onClick={() => setToggles({ ...toggles, hidden: !toggles.hidden })}
              aria-label="Toggle hidden"
            />
          </div>
        </div>

        {/* Requires confirmation */}
        <div style={{
          background:'#fff', border:'1px solid #E5DDD4',
          borderRadius:11, padding:'18px', marginBottom:10,
        }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:16 }}>
            <div>
              <div style={{ fontSize:13, fontWeight:500, color:'#2C2C2A' }}>Requires confirmation</div>
              <div style={{ fontSize:10, color:'#888780', marginTop:3, lineHeight:1.5 }}>
                The booking needs to be manually confirmed before it is pushed to the integrations and a confirmation mail is sent.
              </div>
            </div>
            <button
              className={`toggle ${toggles.confirm ? 'on' : 'off'}`}
              onClick={() => setToggles({ ...toggles, confirm: !toggles.confirm })}
              aria-label="Toggle confirmation"
            />
          </div>
        </div>

        {/* Location */}
        <div style={{
          background:'#fff', border:'1px solid #E5DDD4',
          borderRadius:11, padding:'18px', marginBottom:10,
        }}>
          <label style={{ fontSize:12, fontWeight:500, display:'block', marginBottom:8 }}>
            Location
          </label>
          <input className="form-input" placeholder="Add a location..."/>
        </div>

        {/* Boutons footer */}
        <div style={{ display:'flex', justifyContent:'flex-end', gap:10, marginTop:16 }}>
          <button className="btn-ghost">Discard</button>
          <button className="btn-primary">Save event</button>
        </div>

      </div>
    </div>
  )
}