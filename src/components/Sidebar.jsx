import { Mail, Send, Calendar, Phone } from 'lucide-react'

export default function Sidebar({ page, setPage, setNavTab }) {

  const icons = [
    { id:'messages', icon:<Mail size={18}/>,      label:'Messages' },
    { id:'send',     icon:<Send size={18}/>,      label:'Send' },
    { id:'calendar', icon:<Calendar size={18}/>,  label:'Calendar' },
    { id:'phone',    icon:<Phone size={18}/>,     label:'Phone' },
  ]

  return (
    <div style={{
      width: 54,
      background: '#fff',
      borderRight: '1px solid #E5DDD4',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '14px 0',
      gap: 4,
      flexShrink: 0,
    }}>

      {/* Logo O */}
      <div style={{
        width: 34,
        height: 34,
        background: '#1C3A2F',
        borderRadius: 9,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontWeight: 500,
        fontSize: 15,
        marginBottom: 14,
        cursor: 'pointer',
      }}>O</div>

      {/* Icônes */}
      {icons.map(item => (
        <button
          key={item.id}
          aria-label={item.label}
          onClick={() => {
            if (item.id === 'messages') setPage('messages')
            if (item.id === 'calendar') { setPage('calendar'); setNavTab('calendar') }
          }}
          style={{
            width: 36,
            height: 36,
            borderRadius: 9,
            border: 'none',
            background: page === item.id ? '#C6D9CE' : 'transparent',
            color:       page === item.id ? '#1C3A2F' : '#B4B2A9',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => {
            if (page !== item.id) {
              e.currentTarget.style.background = '#FAF7F2'
              e.currentTarget.style.color      = '#1C3A2F'
            }
          }}
          onMouseLeave={e => {
            if (page !== item.id) {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color      = '#B4B2A9'
            }
          }}
        >
          {item.icon}
        </button>
      ))}

      {/* Avatar */}
      <div style={{ marginTop: 'auto' }}>
        <div style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: '#C6D9CE',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 11,
          fontWeight: 500,
          color: '#1C3A2F',
          cursor: 'pointer',
        }}>AK</div>
      </div>

    </div>
  )
}