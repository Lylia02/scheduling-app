export default function Topbar({ page, navTab, goNav, setPage, setNavTab }) {
  const isSubPage = ['messages','availability','events'].includes(page)

  const back = () => { setPage('calendar'); setNavTab('calendar') }

  return (
    <div style={{
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'0 24px', height:52,
      background:'#fff', borderBottom:'1px solid var(--border)',
      flexShrink:0,
    }}>
      {/* Gauche */}
      {!isSubPage ? (
        <nav style={{ display:'flex', gap:20 }}>
          {['Priorities','Calendar','Insights'].map(t => (
            <button
              key={t}
              onClick={() => goNav(t.toLowerCase())}
              style={{
                padding:0, height:52,
                display:'flex', alignItems:'center',
                fontSize:13, cursor:'pointer',
                color: navTab === t.toLowerCase() ? 'var(--green-dark)' : 'var(--text-2)',
                border:'none', borderBottom: navTab === t.toLowerCase() ? '2px solid var(--green-dark)' : '2px solid transparent',
                background:'transparent',
                fontWeight: navTab === t.toLowerCase() ? 500 : 400,
                fontFamily:'inherit',
                transition:'all 0.15s',
              }}
            >{t}</button>
          ))}
        </nav>
      ) : (
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <button onClick={back} style={{
            background:'none', border:'none', cursor:'pointer',
            fontSize:18, color:'var(--text-2)',
          }}>‹</button>
          <span style={{ fontSize:14, fontWeight:500 }}>
            {page === 'messages'     && 'Messages'}
            {page === 'availability' && 'Availability'}
            {page === 'events'       && 'Events Management'}
          </span>
        </div>
      )}

      {/* Droite — toujours visible */}
      <div style={{ display:'flex', gap:8 }}>
        <button className="btn-outline" onClick={() => setPage('availability')}>
          🕐 Availability
        </button>
        <button className="btn-primary" onClick={() => setPage('events')}>
          ＋ Add event
        </button>
      </div>
    </div>
  )
}