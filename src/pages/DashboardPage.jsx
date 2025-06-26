import React, { useState } from 'react';
import DashboardNav from './DashboardNav';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line, ResponsiveContainer as RC, XAxis as LXAxis, YAxis as LYAxis, CartesianGrid as LGrid, Tooltip as LTooltip } from 'recharts';
import { useNavigate } from 'react-router-dom';

const getUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    return user || { firstName: '', lastName: '' };
  } catch {
    return { firstName: '', lastName: '' };
  }
};

const barData = [
  { name: 'Jan', Income: 67000, Spending: 47000, Savings: 20000 },
  { name: 'Feb', Income: 67000, Spending: 54000, Savings: 13000 },
  { name: 'Mar', Income: 67000, Spending: 49000, Savings: 18000 },
  { name: 'Apr', Income: 67000, Spending: 41000, Savings: 26000 },
  { name: 'May', Income: 67000, Spending: 53000, Savings: 14000 },
  { name: 'Jun', Income: 67000, Spending: 39000, Savings: 28000 },
];

const pieData = [
  { name: 'Shopping', value: 15000, color: '#38bdf8' },
  { name: 'Food & Dining', value: 12000, color: '#f87171' },
  { name: 'Transportation', value: 8000, color: '#2dd4bf' },
  { name: 'Bills & Utilities', value: 9000, color: '#6ee7b7' },
  { name: 'Entertainment', value: 6000, color: '#fde68a' },
  { name: 'Healthcare', value: 4000, color: '#c4b5fd' },
];

const creditScoreData = [
  { name: 'Jan', score: 715 },
  { name: 'Feb', score: 735 },
  { name: 'Mar', score: 740 },
  { name: 'Apr', score: 755 },
  { name: 'May', score: 748 },
  { name: 'Jun', score: 770 },
];

const DashboardPage = () => {
  const user = getUser();
  const fullName = user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : 'User';
  const initial = user.firstName ? user.firstName[0].toUpperCase() : 'U';
  const [showAlert, setShowAlert] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [fraudAlerts, setFraudAlerts] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/auth/signin');
  };

  return (
    <div className="container py-4 position-relative">
      {/* Fraud Alert Notification */}
      {showAlert && (
        <div className="alert alert-danger d-flex align-items-center position-absolute" style={{ top: 0, right: 0, zIndex: 1050, minWidth: 320, maxWidth: 400 }}>
          <span style={{ fontSize: 22, marginRight: 10 }}>🚨</span>
          <div className="flex-grow-1">
            <strong>Fraud Alert!</strong>
            <div>Suspicious transaction detected</div>
          </div>
          <button type="button" className="btn-close ms-2" aria-label="Close" onClick={() => setShowAlert(false)}></button>
        </div>
      )}
      {/* Dashboard Header */}
      <div className="bg-white rounded-4 shadow-sm p-4 d-flex align-items-center justify-content-between mb-4" style={{ border: '1px solid #eee' }}>
        <div>
          <div className="d-flex align-items-center mb-1">
            <span style={{ fontSize: 36, marginRight: 12, color: '#8b5cf6' }}>🏦</span>
            <span className="fw-bold fs-2" style={{ color: '#181c2e' }}>AI Financial Platform</span>
          </div>
          <div className="fs-5 text-secondary" style={{ marginLeft: 48 }}>Intelligent Financial Management & Analysis</div>
        </div>
        <div className="d-flex align-items-center gap-3">
          <div className="text-end me-2">
            <div className="text-secondary small">Welcome back,</div>
            <div className="fw-bold" style={{ fontSize: 18 }}>{fullName}</div>
          </div>
          <div style={{ width: 48, height: 48, background: '#ff8800', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 22 }}>
            {initial}
          </div>
          <button
            className="logout-btn ms-2 d-flex align-items-center gap-2"
            onClick={handleLogout}
          >
            <span style={{ fontSize: 18 }}>🚪</span>
            <span className="fw-semibold">Logout</span>
          </button>
        </div>
      </div>
      {/* Dashboard Navigation Tabs (now a component) */}
      <DashboardNav active={activeTab} onTabChange={setActiveTab} />
      {/* Alerts Section (visible when Alerts tab is active) */}
      {activeTab === 'alerts' && (
        <div className="mb-4">
          {/* Fraud Alert Detected */}
          <div style={{ background: '#fff4f4', borderRadius: 16, padding: 24, marginBottom: 16, borderLeft: '5px solid #ef4444' }}>
            <div className="fw-bold mb-2" style={{ color: '#d32f2f', fontSize: 20 }}>
              <span style={{ fontSize: 24, marginRight: 8 }}>🎉</span> Fraud Alert Detected!
            </div>
            <div className="mb-3" style={{ color: '#d32f2f', fontSize: 17 }}>
              Unusual transaction detected: ₹25,000 at unknown merchant in Delhi
            </div>
            <div className="d-flex gap-2">
              <button className="btn" style={{ background: '#ef4444', color: '#fff', fontWeight: 500 }}>Block Card</button>
              <button className="btn btn-secondary" style={{ fontWeight: 500 }}>Mark as Safe</button>
            </div>
          </div>
          {/* Recent Alerts List */}
          <div style={{ background: '#fff4f4', borderRadius: 16, padding: 20, marginBottom: 16, borderLeft: '5px solid #ef4444', position: 'relative' }}>
            <div className="fw-bold" style={{ fontSize: 18 }}>Unusual transaction of ₹25,000 detected</div>
            <div className="text-secondary small mb-1">2 min ago</div>
            <span style={{ position: 'absolute', top: 18, right: 18, background: '#ffe4e6', color: '#d32f2f', borderRadius: 8, padding: '2px 14px', fontWeight: 600, fontSize: 15 }}>HIGH</span>
          </div>
          <div style={{ background: '#fffde4', borderRadius: 16, padding: 20, marginBottom: 16, borderLeft: '5px solid #facc15', position: 'relative' }}>
            <div className="fw-bold" style={{ fontSize: 18 }}>Login from new device in Mumbai</div>
            <div className="text-secondary small mb-1">1 hour ago</div>
            <span style={{ position: 'absolute', top: 18, right: 18, background: '#fef9c3', color: '#b45309', borderRadius: 8, padding: '2px 14px', fontWeight: 600, fontSize: 15 }}>MEDIUM</span>
          </div>
          <div style={{ background: '#f4f8ff', borderRadius: 16, padding: 20, marginBottom: 16, borderLeft: '5px solid #3b82f6', position: 'relative' }}>
            <div className="fw-bold" style={{ fontSize: 18 }}>Multiple small transactions flagged</div>
            <div className="text-secondary small mb-1">3 hours ago</div>
            <span style={{ position: 'absolute', top: 18, right: 18, background: '#e0edff', color: '#2563eb', borderRadius: 8, padding: '2px 14px', fontWeight: 600, fontSize: 15 }}>LOW</span>
          </div>
        </div>
      )}
      {/* Only show dashboard content if dashboard tab is active */}
      {activeTab === 'dashboard' && <>
        {/* Dashboard Stats Cards */}
        <div className="row g-4 mb-4">
          <div className="col-12 col-md-6 col-lg-3">
            <div className="rounded-4 p-4 h-100" style={{ background: 'linear-gradient(90deg, #2563eb 0%, #3b82f6 100%)', color: '#fff' }}>
              <div className="fw-bold mb-1">Monthly Income</div>
              <div className="display-6 fw-bold">₹65,000</div>
              <div className="fs-6" style={{ opacity: 0.9 }}>+5% from last month</div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div className="rounded-4 p-4 h-100" style={{ background: 'linear-gradient(90deg, #ef4444 0%, #f87171 100%)', color: '#fff' }}>
              <div className="fw-bold mb-1">Monthly Spending</div>
              <div className="display-6 fw-bold">₹38,000</div>
              <div className="fs-6" style={{ opacity: 0.9 }}>-31% from last month</div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div className="rounded-4 p-4 h-100" style={{ background: 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)', color: '#fff' }}>
              <div className="fw-bold mb-1">Savings This Month</div>
              <div className="display-6 fw-bold">₹27,000</div>
              <div className="fs-6" style={{ opacity: 0.9 }}>+125% from last month</div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <div className="rounded-4 p-4 h-100" style={{ background: 'linear-gradient(90deg, #a855f7 0%, #8b5cf6 100%)', color: '#fff' }}>
              <div className="fw-bold mb-1">Credit Health Score</div>
              <div className="display-6 fw-bold">762</div>
              <div className="fs-6" style={{ opacity: 0.9 }}>+14 points this month</div>
            </div>
          </div>
        </div>
        {/* Animated Charts */}
        <div className="row g-4 mb-4">
          <div className="col-12 col-lg-6">
            <div className="bg-white rounded-4 shadow-sm p-4 h-100" style={{ minHeight: 400 }}>
              <h5 className="fw-bold mb-4">Spending Analysis</h5>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={barData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="Income" fill="#38bdf8" radius={[6, 6, 0, 0]} animationDuration={1200} />
                  <Bar dataKey="Spending" fill="#f87171" radius={[6, 6, 0, 0]} animationDuration={1200} />
                  <Bar dataKey="Savings" fill="#34d399" radius={[6, 6, 0, 0]} animationDuration={1200} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="bg-white rounded-4 shadow-sm p-4 h-100" style={{ minHeight: 400 }}>
              <h5 className="fw-bold mb-4">Spending by Category</h5>
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={110}
                    label={({ name, value }) => `${name}: ₹${value}`}
                    isAnimationActive={true}
                    animationDuration={1200}
                  >
                    {pieData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        {/* Credit Score Trend Chart */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="bg-white rounded-4 shadow-sm p-4" style={{ minHeight: 340 }}>
              <div className="fw-bold mb-3" style={{ fontSize: 22 }}>
                <span style={{ background: '#3b82f6', color: '#fff', borderRadius: 4, padding: '2px 12px', fontWeight: 700, fontSize: 18, marginRight: 8 }}>Credit Score Trend</span>
              </div>
              <RC width="100%" height={260}>
                <LineChart data={creditScoreData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <LGrid strokeDasharray="3 3" />
                  <LXAxis dataKey="name" />
                  <LYAxis domain={[710, 772]} />
                  <LTooltip content={({ active, payload, label }) =>
                    active && payload && payload.length ? (
                      <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: 8, padding: 12, fontSize: 16 }}>
                        <div className="fw-bold mb-1">{label}</div>
                        <div style={{ color: '#8b5cf6' }}>score : {payload[0].value}</div>
                      </div>
                    ) : null
                  } />
                  <Line type="monotone" dataKey="score" stroke="#a855f7" strokeWidth={3} dot={{ r: 5, stroke: '#fff', strokeWidth: 2 }} activeDot={{ r: 7 }} isAnimationActive={true} animationDuration={1200} />
                </LineChart>
              </RC>
            </div>
          </div>
        </div>
        {/* AI Recommendations */}
        <div className="bg-white rounded-4 shadow-sm p-4 mb-4" style={{ border: '1px solid #eee' }}>
          <div className="fw-bold mb-3" style={{ fontSize: 22 }}>
            <span style={{ fontSize: 22, marginRight: 8 }}>🤖</span> AI Recommendations
          </div>
          <div className="d-flex flex-column gap-2">
            <div className="rounded-3 px-3 py-2" style={{ background: '#f1f6fd', color: '#222', fontSize: 17, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: '#2563eb', fontSize: 20 }}>🧾</span> Your spending has decreased by 31% this month - great job!
            </div>
            <div className="rounded-3 px-3 py-2" style={{ background: '#f1f6fd', color: '#222', fontSize: 17, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: '#a855f7', fontSize: 20 }}>🎯</span> You're on track to exceed your savings goal by ₹5,000
            </div>
            <div className="rounded-3 px-3 py-2" style={{ background: '#f1f6fd', color: '#222', fontSize: 17, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: '#f59e42', fontSize: 20 }}>⚠️</span> Unusual spending detected in 'Shopping' category
            </div>
            <div className="rounded-3 px-3 py-2" style={{ background: '#f1f6fd', color: '#222', fontSize: 17, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: '#fbbf24', fontSize: 20 }}>💡</span> Consider moving ₹10,000 to high-yield savings account
            </div>
            <div className="rounded-3 px-3 py-2" style={{ background: '#f1f6fd', color: '#222', fontSize: 17, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ color: '#2563eb', fontSize: 20 }}>🧾</span> Set up automatic investments to reach your goals faster
            </div>
          </div>
        </div>
        {/* Features Bar */}
        <div className="bg-white rounded-4 shadow-sm p-4 mb-4 d-flex flex-wrap justify-content-between align-items-center gap-4" style={{ border: '1px solid #eee' }}>
          <div className="text-center flex-fill">
            <div className="fw-bold mb-1" style={{ color: '#e879f9', fontSize: 20 }}><span style={{ fontSize: 22 }}>🧠</span> ML-Powered</div>
            <div className="text-secondary">Advanced pattern recognition</div>
          </div>
          <div className="text-center flex-fill">
            <div className="fw-bold mb-1" style={{ color: '#22c55e', fontSize: 20 }}><span style={{ fontSize: 22 }}>🛡️</span> Fraud Detection</div>
            <div className="text-secondary">Real-time anomaly detection</div>
          </div>
          <div className="text-center flex-fill">
            <div className="fw-bold mb-1" style={{ color: '#8b5cf6', fontSize: 20 }}><span style={{ fontSize: 22 }}>🧑‍💼</span> Multilingual</div>
            <div className="text-secondary">Support for Indian languages</div>
          </div>
          <div className="text-center flex-fill">
            <div className="fw-bold mb-1" style={{ color: '#fb923c', fontSize: 20 }}><span style={{ fontSize: 22 }}>📈</span> Predictive Insights</div>
            <div className="text-secondary">Future financial planning</div>
          </div>
        </div>
      </>}
      {/* Profile Section (visible when Profile tab is active) */}
      {activeTab === 'profile' && (
        <div className="mb-4">
          {/* Upload Bank Statements */}
          <div className="bg-white rounded-4 shadow-sm p-4 mb-4" style={{ border: '1px solid #eee', minHeight: 320 }}>
            <div className="fw-bold fs-4 mb-3">Upload Bank Statements</div>
            <div
              style={{
                border: '2px dashed #d1d5db',
                borderRadius: 16,
                minHeight: 220,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 32,
                background: '#fcfcfd',
              }}
            >
              <div style={{ fontSize: 48, color: '#bdb6d8', marginBottom: 12 }}>
                <svg width="48" height="48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="8" fill="#ede9fe"/><path d="M16 34V14a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v20a2 2 0 0 1-2 2H18a2 2 0 0 1-2-2Z" fill="#a78bfa"/><rect x="20" y="18" width="8" height="2" rx="1" fill="#fff"/><rect x="20" y="22" width="8" height="2" rx="1" fill="#fff"/><rect x="20" y="26" width="8" height="2" rx="1" fill="#fff"/></svg>
              </div>
              <div className="mb-1" style={{ fontSize: 18, color: '#444' }}>Drag and drop your bank statements here</div>
              <div className="mb-3 text-secondary">Supports PDF, Excel, CSV files</div>
              <label htmlFor="file-upload" style={{ display: 'inline-block' }}>
                <input id="file-upload" type="file" multiple style={{ display: 'none' }} />
                <span className="btn btn-primary px-4 py-2" style={{ fontSize: 18 }}>Choose Files</span>
              </label>
            </div>
          </div>
          {/* AI Analysis Results */}
          <div className="bg-white rounded-4 shadow-sm p-4 mb-4" style={{ border: '1px solid #eee' }}>
            <div className="fw-bold fs-4 mb-3">AI Analysis Results</div>
            <div className="row g-4">
              <div className="col-md-6">
                <div style={{
                  background: '#f1fcf5',
                  borderRadius: 16,
                  padding: 24,
                  height: '100%',
                }}>
                  <div className="fw-bold mb-2" style={{ color: '#14532d', fontSize: 18 }}>Spending Patterns Detected</div>
                  <ul className="mb-0" style={{ color: '#14532d', fontSize: 16 }}>
                    <li>High weekend spending tendency</li>
                    <li>Consistent subscription payments</li>
                    <li>Seasonal shopping spikes</li>
                  </ul>
                </div>
              </div>
              <div className="col-md-6">
                <div style={{
                  background: '#f1f7fe',
                  borderRadius: 16,
                  padding: 24,
                  height: '100%',
                }}>
                  <div className="fw-bold mb-2" style={{ color: '#1d4ed8', fontSize: 18 }}>Savings Opportunities</div>
                  <ul className="mb-0" style={{ color: '#1d4ed8', fontSize: 16 }}>
                    <li>₹2,400/month in unused subscriptions</li>
                    <li>₹1,800/month in dining optimization</li>
                    <li>₹3,200/month in cashback potential</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* Security Settings */}
          <div className="bg-white rounded-4 shadow-sm p-4 mb-4" style={{ border: '1px solid #eee' }}>
            <div className="fw-bold fs-4 mb-3">Security Settings</div>
            <div className="mb-3 d-flex align-items-center justify-content-between px-3 py-3" style={{ background: '#fafbfc', borderRadius: 12 }}>
              <span style={{ fontSize: 18 }}>Real-time Fraud Alerts</span>
              <span style={{ display: 'inline-block', width: 48 }}>
                <label style={{ position: 'relative', display: 'inline-block', width: 40, height: 22 }}>
                  <input type="checkbox" checked={fraudAlerts} onChange={() => setFraudAlerts(v => !v)} style={{ opacity: 0, width: 0, height: 0 }} />
                  <span style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: fraudAlerts ? '#2563eb' : '#e5e7eb',
                    borderRadius: 22,
                    transition: 'background 0.2s',
                    display: 'block',
                  }}></span>
                  <span style={{
                    position: 'absolute',
                    left: fraudAlerts ? 20 : 2,
                    top: 2,
                    width: 18,
                    height: 18,
                    background: '#fff',
                    borderRadius: '50%',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                    transition: 'left 0.2s',
                    display: 'block',
                  }}></span>
                </label>
              </span>
            </div>
            <div className="mb-3 d-flex align-items-center justify-content-between px-3 py-3" style={{ background: '#fafbfc', borderRadius: 12 }}>
              <span style={{ fontSize: 18 }}>SMS Notifications</span>
              <span style={{ display: 'inline-block', width: 48 }}>
                <label style={{ position: 'relative', display: 'inline-block', width: 40, height: 22 }}>
                  <input type="checkbox" checked={smsNotifications} onChange={() => setSmsNotifications(v => !v)} style={{ opacity: 0, width: 0, height: 0 }} />
                  <span style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: smsNotifications ? '#2563eb' : '#e5e7eb',
                    borderRadius: 22,
                    transition: 'background 0.2s',
                    display: 'block',
                  }}></span>
                  <span style={{
                    position: 'absolute',
                    left: smsNotifications ? 20 : 2,
                    top: 2,
                    width: 18,
                    height: 18,
                    background: '#fff',
                    borderRadius: '50%',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                    transition: 'left 0.2s',
                    display: 'block',
                  }}></span>
                </label>
              </span>
            </div>
            <div className="d-flex align-items-center justify-content-between px-3 py-3" style={{ background: '#fafbfc', borderRadius: 12 }}>
              <span style={{ fontSize: 18 }}>WhatsApp Alerts</span>
              <span style={{ display: 'inline-block', width: 48 }}>
                <label style={{ position: 'relative', display: 'inline-block', width: 40, height: 22 }}>
                  <input type="checkbox" checked={whatsappAlerts} onChange={() => setWhatsappAlerts(v => !v)} style={{ opacity: 0, width: 0, height: 0 }} />
                  <span style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: whatsappAlerts ? '#2563eb' : '#e5e7eb',
                    borderRadius: 22,
                    transition: 'background 0.2s',
                    display: 'block',
                  }}></span>
                  <span style={{
                    position: 'absolute',
                    left: whatsappAlerts ? 20 : 2,
                    top: 2,
                    width: 18,
                    height: 18,
                    background: '#fff',
                    borderRadius: '50%',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                    transition: 'left 0.2s',
                    display: 'block',
                  }}></span>
                </label>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage; 