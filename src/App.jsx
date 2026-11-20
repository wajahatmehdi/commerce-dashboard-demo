import React, { useEffect, useMemo, useRef, useState } from 'react';

const menu = [
  { name: 'Overview', icon: '◫' }, { name: 'Sales Analytics', icon: '▥' },
  { name: 'Orders', icon: '▤' }, { name: 'Customers', icon: '♙' },
  { name: 'Products', icon: '⬡' }, { name: 'Reports', icon: '▧' },
];
const periods = ['Last 7 days', 'Last 30 days', 'Last 90 days'];
const orders = [
  { id: '#ORD-1048', customer: 'Olivia Martinez', product: 'Wireless Headphones', date: 'Nov 18, 2026', amount: '$249.00', status: 'Delivered', region: 'West' },
  { id: '#ORD-1047', customer: 'Noah Williams', product: 'Running Shoes', date: 'Nov 18, 2026', amount: '$129.00', status: 'In Transit', region: 'North' },
  { id: '#ORD-1046', customer: 'Emma Johnson', product: 'Smart Watch', date: 'Nov 17, 2026', amount: '$319.00', status: 'Delivered', region: 'East' },
  { id: '#ORD-1045', customer: 'Liam Davis', product: 'Coffee Maker', date: 'Nov 17, 2026', amount: '$89.00', status: 'Pending', region: 'South' },
  { id: '#ORD-1044', customer: 'Sophia Brown', product: 'Desk Lamp', date: 'Nov 16, 2026', amount: '$64.00', status: 'Delivered', region: 'West' },
];
const trend = {
  'Last 7 days': [34, 42, 38, 59, 49, 68, 76],
  'Last 30 days': [24, 36, 29, 45, 40, 51, 45, 57, 53, 69, 64, 78],
  'Last 90 days': [18, 27, 33, 29, 41, 37, 53, 49, 59, 63, 70, 84],
};
const categories = [
  { name: 'Electronics', value: 42, color: '#4f6cf7', revenue: '$2.14M' },
  { name: 'Fashion', value: 27, color: '#8e78ed', revenue: '$1.35M' },
  { name: 'Home & Living', value: 19, color: '#43b8a2', revenue: '$980K' },
  { name: 'Beauty', value: 12, color: '#f4af62', revenue: '$640K' },
];
const canned = [
  { test: /revenue|sales|highest|category|electronics/i, reply: 'Electronics is your leading product category, contributing $2.14M (42%) of demo revenue. Overall sales are trending upward in this sample dataset.' },
  { test: /region|weak|south|east|delivery/i, reply: 'The South region shows the longest average delivery time in our sample data: 5.4 days. The West region performs best at 2.3 days.' },
  { test: /customer|rating|review|satisfaction/i, reply: 'Demo customer satisfaction is 4.8/5 overall. Delivery speed is the strongest opportunity to improve the customer experience.' },
  { test: /order|pending|transit/i, reply: 'The demo contains five recent orders: three delivered, one in transit, and one pending. Check the Recent Orders table for details.' },
];
function Icon({ name, size = 18 }) {
  const icons = {
    search: <><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 8-3 9h18c0-1-3-2-3-9"/><path d="M10 21h4"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    arrow: <path d="M5 12h14m-6-6 6 6-6 6"/>,
    up: <path d="m4 15 6-6 4 4 6-7"/>,
    close: <path d="M5 5l14 14M19 5 5 19"/>,
    send: <><path d="m21 3-8 18-3-8-8-3 19-7Z"/><path d="M10 13 21 3"/></>,
    sparkle: <><path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5Z"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18"/></>,
    filter: <path d="M4 5h16l-6.5 7v6l-3 2v-8L4 5Z"/>,
    download: <><path d="M12 3v12m-4-4 4 4 4-4M4 18v3h16v-3"/></>,
    chevron: <path d="m7 10 5 5 5-5"/>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[name]}</svg>;
}
function LineGraph({ data }) {
  const pts = data.map((v, i) => `${44 + i * (620 / (data.length - 1))},${200 - v * 1.7}`).join(' ');
  const area = `44,216 ${pts} 664,216`;
  return <svg className="graph" viewBox="0 0 700 256" role="img" aria-label="Illustrative revenue trend line">
    {[48, 90, 132, 174, 216].map((y) => <line key={y} x1="44" x2="670" y1={y} y2={y} stroke="#edf0f6" strokeDasharray="4 5" />)}
    {['$80k', '$60k', '$40k', '$20k', '$0'].map((v, i) => <text key={v} x="3" y={52 + i * 42} fill="#99a3b5" fontSize="12">{v}</text>)}
    <defs><linearGradient id="fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6177f5" stopOpacity=".2"/><stop offset="100%" stopColor="#6177f5" stopOpacity="0"/></linearGradient></defs>
    <polygon points={area} fill="url(#fade)"/><polyline points={pts} fill="none" stroke="#526cf4" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round"/>
    {data.map((v, i) => <circle key={i} cx={44 + i * (620 / (data.length - 1))} cy={200 - v * 1.7} r={i === data.length - 1 ? 6 : 3} fill="#526cf4" stroke="white" strokeWidth="2"/>)}
    {['Start', 'Week 1', 'Week 2', 'Week 3', 'Today'].map((v, i) => <text key={v} x={44 + i * 155} y="244" textAnchor="middle" fill="#98a2b3" fontSize="12">{v}</text>)}
  </svg>;
}
function App() {
  const [active, setActive] = useState('Overview');
  const [period, setPeriod] = useState('Last 30 days');
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('All regions');
  const [assistantOpen, setAssistantOpen] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([{ from: 'bot', text: "Hi! I'm your demo analytics assistant. Ask about sales, customers, orders or regions. My answers are simulated—no AI API is used." }]);
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
  const filteredOrders = useMemo(() => orders.filter((o) => (region === 'All regions' || o.region === region) && Object.values(o).join(' ').toLowerCase().includes(search.toLowerCase())), [region, search]);
  const send = (text) => {
    const q = (text || query).trim(); if (!q || thinking) return;
    const match = canned.find((c) => c.test.test(q));
    setMessages((m) => [...m, { from: 'user', text: q }, { from: 'bot', text: match?.reply || 'This is a fully offline demo assistant. Try asking about revenue, customer ratings, regions, or orders to see an example answer.' }]);
    setQuery('');
  };
  const exportCsv = () => {
    const csv = [['Order','Customer','Product','Date','Amount','Status','Region'], ...filteredOrders.map((o) => [o.id,o.customer,o.product,o.date,o.amount,o.status,o.region])].map((r) => r.map((x) => `"${String(x).replaceAll('"','""')}"`).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const a = document.createElement('a'); a.href = url; a.download = 'demo-orders.csv'; a.click(); URL.revokeObjectURL(url);
  };
  return <div className="shell">
    <aside className={`sidebar ${navOpen ? 'mobile-open' : ''}`}>
      <div className="brand"><div className="brand-mark">C</div><div><b>commerce<span>IQ</span></b><small>ANALYTICS PLATFORM</small></div></div>
      <div className="side-label">WORKSPACE</div>
      <nav>{menu.map(({ name, icon }) => <button key={name} className={`nav-button ${active === name ? 'selected' : ''}`} onClick={() => {setActive(name);setNavOpen(false);}}><span className="nav-symbol">{icon}</span>{name}{name === 'Reports' && <span className="soon">NEW</span>}</button>)}</nav>
      <div className="sidebar-bottom"><div className="demo-note"><div className="dot"/>Demo mode<div className="muted">No API · No tokens</div></div><div className="profile"><span className="avatar">JD</span><div><b>Jamie Demo</b><small>Demo workspace</small></div><span className="ellipsis">···</span></div></div>
    </aside>
    <div className="app-main">
      <header className="header"><div className="header-left"><button className="mobile-menu icon-btn" aria-label="Toggle menu" onClick={() => setNavOpen(!navOpen)}><Icon name="menu"/></button><span className="breadcrumb">Workspace</span><span className="slash">/</span><strong>{active}</strong></div><div className="header-right"><span className="live"><span/> Demo dataset</span><button className="icon-btn" aria-label="Notifications" title="No new notifications"><Icon name="bell"/></button><button className="assistant-toggle" onClick={() => setAssistantOpen(!assistantOpen)}><Icon name="sparkle" size={16}/>{assistantOpen ? 'Hide assistant' : 'Show assistant'}</button></div></header>
      <div className="main-body"><main className="content">
        <div className="page-top"><div><div className="eyebrow">COMMERCE PERFORMANCE</div><h1>{active === 'Overview' ? 'Dashboard Overview' : active}</h1><p>Welcome back. Here's what is happening in your demo store.</p></div><button className="period" onClick={() => setPeriod(periods[(periods.indexOf(period) + 1) % periods.length])}><Icon name="calendar" size={16}/>{period}<Icon name="chevron" size={15}/></button></div>
        {active !== 'Overview' && <div className="page-hint">You're viewing the <b>{active}</b> workspace. This demonstration uses the same sample performance data across tabs.</div>}
        <div className="stat-grid">
          {[{ label: 'Total Revenue', value: '$5.11M', change: '+14.2%', icon: '↗', sub: 'vs. previous period', tint: 'blue' },{ label: 'Total Orders', value: '12,846', change: '+8.6%', icon: '▤', sub: 'vs. previous period', tint: 'purple' },{ label: 'Active Customers', value: '8,294', change: '+12.8%', icon: '♙', sub: 'vs. previous period', tint: 'teal' },{ label: 'Satisfaction Score', value: '4.8/5', change: '+0.3', icon: '☆', sub: 'vs. previous period', tint: 'amber' }].map((s) => <section className="stat-card" key={s.label}><div className="stat-head"><span>{s.label}</span><div className={`stat-icon ${s.tint}`}>{s.icon}</div></div><div className="stat-value">{s.value}</div><div className="stat-foot"><span className="positive">↗ {s.change}</span><span>{s.sub}</span></div></section>)}
        </div>
        <div className="charts"><section className="panel trend-panel"><div className="panel-top"><div><h2>Revenue Analytics</h2><p>Sales performance over time</p></div><span className="legend"><i/> Revenue</span></div><div className="chart-total">$5,110,000 <span>↑ 14.2%</span></div><LineGraph data={trend[period]}/></section><section className="panel category-panel"><div className="panel-top"><div><h2>Sales by Category</h2><p>Revenue distribution</p></div><span className="dots">···</span></div><div className="donut-wrap"><div className="donut"><div><strong>$5.11M</strong><small>Total sales</small></div></div></div><div className="category-list">{categories.map((c) => <div className="category" key={c.name}><span><i style={{ background: c.color }}/>{c.name}</span><b>{c.value}%</b></div>)}</div></section></div>
        <section className="panel orders-panel"><div className="panel-top orders-title"><div><h2>Recent Orders</h2><p>Latest transactions from your demo store</p></div><div className="table-actions"><div className="search-box"><Icon name="search" size={16}/><input aria-label="Search orders" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search orders..."/></div><select aria-label="Filter by region" value={region} onChange={(e) => setRegion(e.target.value)}><option>All regions</option>{['West','North','East','South'].map((r) => <option key={r}>{r}</option>)}</select><button className="export" onClick={exportCsv}><Icon name="download" size={16}/>Export</button></div></div><div className="table-scroll"><table><thead><tr><th>ORDER ID</th><th>CUSTOMER</th><th>PRODUCT</th><th>DATE</th><th>AMOUNT</th><th>STATUS</th></tr></thead><tbody>{filteredOrders.map((o) => <tr key={o.id}><td className="order-id">{o.id}</td><td>{o.customer}</td><td>{o.product}</td><td>{o.date}</td><td className="amount">{o.amount}</td><td><span className={`status ${o.status.toLowerCase().replace(' ','-')}`}>{o.status}</span></td></tr>)}{filteredOrders.length === 0 && <tr><td colSpan="6" className="no-results">No orders match your search.</td></tr>}</tbody></table></div><div className="table-footer">Showing {filteredOrders.length} of {orders.length} demo orders <span>Sample data only</span></div></section>
        <footer className="footer">CommerceIQ Demo • Built with React + Vite • No API calls • No AI tokens</footer>
      </main>
      {assistantOpen && <aside className="assistant"><div className="assistant-top"><span className="assistant-badge"><Icon name="sparkle" size={17}/></span><div><h2>Analytics Assistant</h2><small><span className="online"/> Simulated · Offline</small></div><button className="icon-btn close" aria-label="Close assistant" onClick={() => setAssistantOpen(false)}><Icon name="close" size={18}/></button></div><div className="assistant-disclaimer">✦ This is a demo chatbot with predefined answers. It does not connect to Gemini or any other AI service.</div><div className="chat-messages">{messages.map((m, i) => <div key={i} className={`message ${m.from}`}><div className="message-meta">{m.from === 'bot' ? '✦ CommerceIQ Demo' : 'You'}</div><div className="bubble">{m.text}</div></div>)}<div ref={bottomRef}/></div><div className="assistant-bottom"><div className="prompt-title">TRY ASKING</div><div className="prompts">{['Which category has highest revenue?', 'How are customer ratings?', 'Show weak regions'].map((x) => <button key={x} onClick={() => send(x)}>{x} <span>→</span></button>)}</div><form onSubmit={(e) => {e.preventDefault();send();}} className="chat-form"><input aria-label="Ask the demo assistant" placeholder="Ask about your store..." value={query} onChange={(e) => setQuery(e.target.value)}/><button type="submit" aria-label="Send message"><Icon name="send" size={17}/></button></form><div className="assistant-foot">100% local browser simulation</div></div></aside>}
      </div>
    </div>
  </div>;
}
export default App;
