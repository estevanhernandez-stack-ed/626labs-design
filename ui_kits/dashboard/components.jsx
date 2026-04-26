/* global React */
const { useState } = React;

// Minimal lucide-ish inline SVGs (1.75 stroke, round joins) — keeping bundle tiny
const Icon = ({ d, size = 18, stroke = 1.75, fill = 'none' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor"
       strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
);
const I = {
  Plus: <Icon d={<><path d="M12 5v14"/><path d="M5 12h14"/></>} />,
  Project: <Icon d={<><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18"/><path d="M9 4v6"/></>} />,
  Globe: <Icon d={<><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18"/></>} />,
  Decisions: <Icon d={<><path d="M9 18l-6-6 6-6"/><path d="M15 6l6 6-6 6"/></>} />,
  Flag: <Icon d={<><path d="M4 22V4"/><path d="M4 4h13l-2 4 2 4H4"/></>} />,
  Architect: <Icon d={<><path d="M12 2l3 3-3 3-3-3 3-3z"/><path d="M5 12l3 3-3 3-3-3 3-3z"/><path d="M19 12l3 3-3 3-3-3 3-3z"/><path d="M12 12l3 3-3 3-3-3 3-3z"/></>} />,
  Target: <Icon d={<><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></>} />,
  Chart: <Icon d={<><rect x="3" y="14" width="4" height="7"/><rect x="10" y="9" width="4" height="12"/><rect x="17" y="4" width="4" height="17"/></>} />,
  Flow: <Icon d={<><circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="M6 8v2a4 4 0 0 0 4 4h0"/><path d="M18 8v2a4 4 0 0 1-4 4h0"/></>} />,
  GitHub: <Icon d={<><path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-2c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.5-1.1-4.5-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9 9 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.5 5 .4.3.7.9.7 1.8v2.6c0 .3.2.6.7.5A10 10 0 0 0 12 2z"/></>} />,
  Terminal: <Icon d={<><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l3 3-3 3"/><path d="M13 15h4"/></>} />,
  Zap: <Icon d={<><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></>} />,
  Users: <Icon d={<><circle cx="9" cy="8" r="3"/><path d="M3 20v-1a6 6 0 0 1 12 0v1"/><circle cx="17" cy="9" r="2.5"/><path d="M21 20v-1a5 5 0 0 0-4-4.9"/></>} />,
  Bell: <Icon d={<><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 0 0 4 0"/></>} />,
  Search: <Icon d={<><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></>} />,
  Mic: <Icon d={<><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/></>} />,
  Camera: <Icon d={<><rect x="3" y="6" width="18" height="14" rx="2"/><circle cx="12" cy="13" r="4"/><path d="M8 6l2-2h4l2 2"/></>} />,
  Whiteboard: <Icon d={<><rect x="3" y="4" width="18" height="14" rx="1"/><path d="M8 22l4-4 4 4"/></>} />,
  Sparkle: <Icon d={<><path d="M12 3v4"/><path d="M12 17v4"/><path d="M3 12h4"/><path d="M17 12h4"/><path d="M6 6l2.5 2.5"/><path d="M15.5 15.5L18 18"/><path d="M6 18l2.5-2.5"/><path d="M15.5 8.5L18 6"/></>} />,
  Check: <Icon d={<><path d="M5 12l5 5L20 7"/></>} />,
  Chevron: <Icon d={<><path d="M6 9l6 6 6-6"/></>} size={16} />,
  ArrowRight: <Icon d={<><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></>} />,
  Export: <Icon d={<><path d="M12 3v12"/><path d="M7 8l5-5 5 5"/><path d="M4 17v3h16v-3"/></>} size={16} />,
  Filter: <Icon d={<><path d="M3 5h18l-7 9v6l-4-2v-4L3 5z"/></>} size={16} />,
  Dots: <Icon d={<><circle cx="12" cy="5" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/><circle cx="12" cy="19" r="1.2" fill="currentColor"/></>} size={16} />,
  Trash: <Icon d={<><path d="M4 7h16"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M6 7l1 13h10l1-13"/><path d="M9 7V4h6v3"/></>} size={16} />,
  Rocket: <Icon d={<><path d="M5 15c-1 1-2 4-2 6 2 0 5-1 6-2"/><path d="M15 9a3 3 0 1 0-3-3"/><path d="M10 14l7-7a6 6 0 0 1 4 4l-7 7-4-4z"/></>} />,
  Book: <Icon d={<><path d="M4 4h8a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4V4z"/><path d="M20 4h-4v12h4V4z"/></>} />,
  Doc: <Icon d={<><path d="M7 2h8l5 5v15H7z"/><path d="M14 2v6h6"/></>} />,
  HourGlass: <Icon d={<><path d="M6 2h12"/><path d="M6 22h12"/><path d="M6 2c0 4 6 6 6 10s-6 6-6 10"/><path d="M18 2c0 4-6 6-6 10s6 6 6 10"/></>} />,
};

// Sidebar
function Sidebar({ active, onSelect }) {
  const groups = [
    { label: 'Operation Center', items: [
      ['projects', 'Projects', I.Project],
      ['universe', 'Universe', I.Globe],
      ['decisions', 'Decisions', I.Decisions],
      ['initiatives', 'Initiatives', I.Flag],
      ['architect', 'The Architect', I.Architect],
      ['goals', 'Goals & OKRs', I.Target],
      ['analytics', 'Analytics', I.Chart],
    ]},
    { label: 'Build & Ship', items: [
      ['workflows', 'Workflows', I.Flow],
      ['github', 'GitHub', I.GitHub],
      ['ide', 'IDE Control', I.Terminal],
    ]},
    { label: 'Agent Ops', items: [
      ['actions', 'Actions', I.Zap],
      ['council', 'Council Debate', I.Users],
    ]},
  ];
  return (
    <aside className="dash-sidebar">
      <div className="dash-brand">
        <img src="../../assets/626Labs-logo.png" alt="626" className="dash-brand-mark" />
        <div className="dash-brand-text">
          <div className="dash-brand-title">The Lab <span>Dashboard</span></div>
          <div className="dash-brand-sub">PUBLIC</div>
        </div>
      </div>
      <div className="dash-focus">
        <span className="dash-focus-dot" />
        <div>
          <div className="dash-focus-label">GROUP FOCUS</div>
          <div className="dash-focus-val">Random Focus</div>
        </div>
      </div>
      {groups.map(g => (
        <div key={g.label} className="dash-navgroup">
          <div className="dash-navgroup-label">{g.label}</div>
          {g.items.map(([id, label, icon]) => (
            <button key={id} className={`dash-navitem ${active===id?'is-active':''}`} onClick={()=>onSelect(id)}>
              <span className="dash-navicon">{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      ))}
      <button className="dash-new-initiative">{I.Plus}<span>New Initiative</span></button>
    </aside>
  );
}

// Top bar
function TopBar() {
  return (
    <div className="dash-topbar">
      <button className="dash-btn dash-btn-primary"><span className="dash-ico">{I.Plus}</span>Project</button>
      <button className="dash-workspace">{I.Users}<span>Personal Workspace</span>{I.Chevron}</button>
      <button className="dash-iconbtn dash-notif">{I.Bell}<span className="dash-count">33</span></button>
      <div className="dash-topright">
        <button className="dash-pill"><span className="dash-pill-ico">{I.Camera}</span>Scanner</button>
        <button className="dash-pill"><span className="dash-pill-ico">{I.Mic}</span>Voice</button>
        <button className="dash-pill"><span className="dash-pill-ico">{I.Whiteboard}</span>Whiteboard</button>
        <button className="dash-pill is-accent"><span className="dash-pill-ico">{I.Architect}</span>The Architect</button>
        <button className="dash-pill is-sync"><span className="dash-dot-live" />SYNCED</button>
        <button className="dash-iconbtn">{I.Sparkle}</button>
        <button className="dash-iconbtn">{I.Filter}</button>
        <button className="dash-iconbtn">{I.Chart}</button>
        <button className="dash-iconbtn">{I.Terminal}</button>
      </div>
    </div>
  );
}

// Stat tile
function Stat({ eyebrow, icon, value, unit, sub, accent, children }) {
  return (
    <div className={`dash-stat ${accent || ''}`}>
      <div className="dash-stat-head"><span className="dash-stat-ico">{icon}</span><span className="dash-stat-eyebrow">{eyebrow}</span></div>
      <div className="dash-stat-value">{value}{unit && <span className="dash-stat-unit">{unit}</span>}</div>
      {sub && <div className="dash-stat-sub">{sub}</div>}
      {children}
    </div>
  );
}

// Progress ring (SVG)
function Ring({ pct = 68, size = 62 }) {
  const r = (size - 8) / 2, c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} className="dash-ring">
      <circle cx={size/2} cy={size/2} r={r} stroke="rgba(255,255,255,.1)" strokeWidth="4" fill="none"/>
      <circle cx={size/2} cy={size/2} r={r} stroke="url(#ringg)" strokeWidth="4" fill="none"
              strokeDasharray={c} strokeDashoffset={c - (c*pct/100)} strokeLinecap="round"
              transform={`rotate(-90 ${size/2} ${size/2})`} />
      <defs>
        <linearGradient id="ringg" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#17d4fa"/><stop offset="1" stopColor="#f22f89"/></linearGradient>
      </defs>
      <text x="50%" y="53%" textAnchor="middle" fill="#17d4fa" fontSize="14" fontFamily="JetBrains Mono" fontWeight="600">{pct}%</text>
    </svg>
  );
}

// Autopilot row
function AutoRow({ name, ago, ms, status }) {
  return (
    <div className="dash-auto-row">
      <div className="dash-auto-name">{name}</div>
      <div className="dash-auto-meta">
        <span className="dash-auto-time">🕒 {ago}</span>
        <span className="dash-auto-ms">{ms}</span>
        <span className="dash-auto-status"><span className="dash-dot-ok"/>OK</span>
      </div>
    </div>
  );
}

// Project card
function ProjectCard({ icon, title, tags, desc, progress, updated, accent }) {
  return (
    <div className={`dash-proj ${accent?'is-primary':''}`}>
      <div className="dash-proj-head">
        <div className="dash-proj-title-row">
          <span className="dash-proj-icon">{icon}</span>
          <h3 className="dash-proj-title">{title}</h3>
          <button className="dash-proj-arrow">{I.ArrowRight}</button>
        </div>
        <div className="dash-proj-tags">
          {tags.map(([t, v]) => <span key={t} className={`dash-tag dash-tag-${v||'n'}`}>{t}</span>)}
        </div>
      </div>
      <p className="dash-proj-desc">{desc}</p>
      <div className="dash-proj-progress">
        <div className="dash-proj-progress-head"><span>Progress</span><span>{progress}%</span></div>
        <div className="dash-proj-bar"><div className="dash-proj-bar-fill" style={{width:`${progress}%`}}/></div>
      </div>
      <div className="dash-proj-footer">
        <div className="dash-proj-people">{I.Users}</div>
        <div className="dash-proj-updated">Last updated: {updated}</div>
      </div>
      <div className="dash-proj-actions">
        <button className="dash-sq dash-sq-amber">{I.Sparkle}</button>
        <button className="dash-sq dash-sq-magenta">{I.Architect}</button>
        <button className="dash-sq dash-sq-cyan">{I.Flow}</button>
        <button className="dash-sq dash-sq-magenta">{I.Zap}</button>
        <div style={{flex:1}}/>
        <button className="dash-sq-ghost">{I.Dots}</button>
        <button className="dash-sq-ghost">{I.Trash}</button>
      </div>
    </div>
  );
}

window.Dashboard = { Sidebar, TopBar, Stat, Ring, AutoRow, ProjectCard, I };
