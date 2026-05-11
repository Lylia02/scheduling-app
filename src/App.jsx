import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import CalendarView from './components/CalendarView'
import PrioritiesView from './components/PrioritiesView'
import AvailabilityView from './components/AvailabilityView'
import EventsView from './components/EventsView'
import MessagesView from './components/MessagesView'
import './index.css'

export default function App() {
  const [page, setPage]   = useState('calendar')
  const [navTab, setNavTab] = useState('calendar')

  const goNav = (tab) => {
    setNavTab(tab)
    setPage(tab)
  }

  return (
    <div style={{ display:'flex', height:'100vh', overflow:'hidden' }}>
      <Sidebar page={page} setPage={setPage} setNavTab={setNavTab} />
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', minWidth:0 }}>
        <Topbar
          page={page}
          navTab={navTab}
          goNav={goNav}
          setPage={setPage}
          setNavTab={setNavTab}
        />
        <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
          {page === 'calendar'     && <CalendarView />}
          {page === 'priorities'   && <PrioritiesView />}
          {page === 'availability' && <AvailabilityView />}
          {page === 'events'       && <EventsView />}
          {page === 'messages'     && <MessagesView />}
          {page === 'insights'     && (
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center',
                          height:'100%', flexDirection:'column', gap:12 }}>
              <div style={{ fontSize:48 }}>📊</div>
              <div style={{ fontSize:18, fontWeight:500 }}>Insights</div>
              <div style={{ fontSize:13, color:'var(--text-2)' }}>Coming soon</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}