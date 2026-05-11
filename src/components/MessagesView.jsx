import { useState, useRef, useEffect } from 'react'

const CONVERSATIONS = [
  {
    id: 1,
    name: 'Lilia Ourdani',
    initials: 'LO',
    bg: '#C6D9CE',
    tc: '#1C3A2F',
    time: '10:32 AM',
    unread: 2,
    messages: [
      { mine:false, text:"Hey! Are we still on for Wednesday?",         time:"10:28 AM" },
      { mine:true,  text:"Yes absolutely, 9:15 AM at my office",        time:"10:30 AM" },
      { mine:false, text:"Sounds good! See you Wednesday 👍",           time:"10:32 AM" },
    ],
  },
  {
    id: 2,
    name: 'Akram Amokrane',
    initials: 'AA',
    bg: '#E8D5C4',
    tc: '#7A4F2E',
    time: 'Hier',
    unread: 0,
    messages: [
      { mine:false, text:"Salut, on peut déplacer le meeting à 14h ?",  time:"Hier" },
      { mine:true,  text:"Je regarde mes disponibilités...",             time:"Hier" },
    ],
  },
  {
    id: 3,
    name: 'Mehdi Bensaid',
    initials: 'MB',
    bg: '#D4E8F5',
    tc: '#1A4A7A',
    time: 'Lun',
    unread: 0,
    messages: [
      { mine:false, text:"The booking is confirmed ✓",                  time:"Lun" },
    ],
  },
  {
    id: 4,
    name: 'Sara Khelil',
    initials: 'SK',
    bg: '#F5E4E8',
    tc: '#7A1C2E',
    time: 'Dim',
    unread: 1,
    messages: [
      { mine:false, text:"When are you available next week?",            time:"Dim" },
    ],
  },
]

function Avatar({ initials, bg, tc, size = 38 }) {
  return (
    <div style={{
      width: size, height: size,
      borderRadius: '50%',
      background: bg, color: tc,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size < 36 ? 10 : 12,
      fontWeight: 500,
      flexShrink: 0,
    }}>{initials}</div>
  )
}

export default function MessagesView() {
  const [active,  setActive]  = useState(0)
  const [input,   setInput]   = useState('')
  const [allMsgs, setAllMsgs] = useState(CONVERSATIONS.map(c => c.messages))
  const bodyRef = useRef(null)

  // scroll vers le bas à chaque nouveau message
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [allMsgs, active])

  const send = () => {
    if (!input.trim()) return
    const now = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit', hour12: true,
    })
    setAllMsgs(allMsgs.map((m, i) =>
      i === active ? [...m, { mine: true, text: input.trim(), time: now }] : m
    ))
    setInput('')
  }

  const conv = CONVERSATIONS[active]

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '260px 1fr',
      height: '100%',
      overflow: 'hidden',
    }}>

      {/* ── Sidebar conversations ── */}
      <div style={{
        borderRight: '1px solid #E5DDD4',
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>

        {/* Barre de recherche */}
        <div style={{ padding:'12px 14px', borderBottom:'1px solid #E5DDD4', flexShrink:0 }}>
          <div style={{ position:'relative' }}>
            <span style={{
              position:'absolute', left:9, top:'50%',
              transform:'translateY(-50%)',
              color:'#B4B2A9', fontSize:13,
            }}>🔍</span>
            <input
              placeholder="Search messages..."
              style={{
                width:'100%',
                border:'1px solid #E5DDD4',
                borderRadius:8,
                padding:'7px 11px 7px 30px',
                fontSize:12,
                background:'#F9F6F2',
                fontFamily:'inherit',
                outline:'none',
                color:'#2C2C2A',
              }}
            />
          </div>
        </div>

        {/* Liste conversations */}
        <div style={{ overflowY:'auto', flex:1 }}>
          {CONVERSATIONS.map((c, i) => (
            <div
              key={c.id}
              onClick={() => setActive(i)}
              style={{
                display:'flex', alignItems:'flex-start', gap:10,
                padding:'12px 14px',
                cursor:'pointer',
                borderBottom:'1px solid #F5F0EB',
                background: active === i ? '#F0E8DC' : '#fff',
                transition:'background 0.12s',
              }}
            >
              <Avatar initials={c.initials} bg={c.bg} tc={c.tc} />

              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:13, fontWeight:500, color:'#2C2C2A' }}>{c.name}</div>
                <div style={{
                  fontSize:11, color:'#888780',
                  whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis',
                  marginTop:2,
                }}>
                  {allMsgs[i].length > 0
                    ? allMsgs[i][allMsgs[i].length - 1].text
                    : '...'}
                </div>
              </div>

              <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:4, flexShrink:0 }}>
                <span style={{ fontSize:9, color:'#B4B2A9' }}>{c.time}</span>
                {c.unread > 0 && (
                  <span style={{
                    width:16, height:16, borderRadius:'50%',
                    background:'#1C3A2F', color:'#fff',
                    fontSize:9, fontWeight:500,
                    display:'flex', alignItems:'center', justifyContent:'center',
                  }}>{c.unread}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Zone chat ── */}
      <div style={{ display:'flex', flexDirection:'column', overflow:'hidden' }}>

        {/* Header chat */}
        <div style={{
          display:'flex', alignItems:'center', gap:12,
          padding:'12px 20px',
          borderBottom:'1px solid #E5DDD4',
          background:'#fff', flexShrink:0,
        }}>
          <Avatar initials={conv.initials} bg={conv.bg} tc={conv.tc} size={40} />
          <div>
            <div style={{ fontSize:14, fontWeight:500 }}>{conv.name}</div>
            <div style={{ fontSize:10, color:'#52B788' }}>● Online</div>
          </div>

          {/* Boutons header */}
          <div style={{ marginLeft:'auto', display:'flex', gap:8 }}>
            <button className="btn-outline" style={{ fontSize:12, padding:'6px 12px' }}>
              📅 Schedule
            </button>
            <button className="btn-primary" style={{ fontSize:12, padding:'6px 12px' }}>
              📞 Call
            </button>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={bodyRef}
          style={{
            flex:1, padding:'16px 20px',
            overflowY:'auto',
            display:'flex', flexDirection:'column', gap:12,
          }}
        >
          {allMsgs[active].map((msg, i) => (
            <div
              key={i}
              style={{
                display:'flex', gap:8,
                alignItems:'flex-end',
                flexDirection: msg.mine ? 'row-reverse' : 'row',
              }}
            >
              {/* Avatar uniquement pour les messages reçus */}
              {!msg.mine && (
                <Avatar initials={conv.initials} bg={conv.bg} tc={conv.tc} size={28} />
              )}

              <div>
                <div style={{
                  padding:'9px 13px',
                  borderRadius: msg.mine ? '13px 13px 3px 13px' : '13px 13px 13px 3px',
                  fontSize:12, lineHeight:1.5,
                  maxWidth:320,
                  background: msg.mine ? '#1C3A2F' : '#fff',
                  color:       msg.mine ? '#fff'    : '#2C2C2A',
                  border:      msg.mine ? 'none'    : '1px solid #E5DDD4',
                }}>{msg.text}</div>

                <div style={{
                  fontSize:9, color:'#B4B2A9', marginTop:3,
                  textAlign: msg.mine ? 'right' : 'left',
                }}>{msg.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Input message */}
        <div style={{
          padding:'12px 20px',
          borderTop:'1px solid #E5DDD4',
          background:'#fff',
          display:'flex', alignItems:'center', gap:10,
          flexShrink:0,
        }}>
          {/* Bouton pièce jointe */}
          <button style={{
            width:34, height:34, borderRadius:'50%',
            border:'1px solid #E5DDD4',
            background:'#fff', cursor:'pointer',
            fontSize:15, color:'#888780',
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>📎</button>

          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Type a message..."
            style={{
              flex:1,
              border:'1px solid #E5DDD4',
              borderRadius:22,
              padding:'9px 16px',
              fontSize:12,
              background:'#F9F6F2',
              fontFamily:'inherit',
              outline:'none',
              color:'#2C2C2A',
            }}
          />

          {/* Bouton envoyer */}
          <button
            onClick={send}
            style={{
              width:36, height:36, borderRadius:'50%',
              background:'#1C3A2F', border:'none',
              cursor:'pointer', color:'#fff', fontSize:14,
              display:'flex', alignItems:'center', justifyContent:'center',
              flexShrink:0,
              transition:'background 0.15s',
            }}
          >➤</button>
        </div>
      </div>
    </div>
  )
}