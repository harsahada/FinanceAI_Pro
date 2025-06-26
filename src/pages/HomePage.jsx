import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = ({ onNavClick }) => (
  <nav className="navbar navbar-light bg-white shadow-sm sticky-top" style={{ zIndex: 100 }}>
    <div className="container-fluid px-4 d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <span style={{ fontSize: 32, marginRight: 12 }}>🏦</span>
        <div>
          <div className="fw-bold fs-4" style={{ color: '#222' }}>FinanceAI Pro</div>
          <div className="fs-6" style={{ color: '#6c757d', marginTop: -2 }}>Smart Financial Management & AI Analytics</div>
        </div>
      </div>
      <div className="d-flex align-items-center gap-3">
        <a href="#features" onClick={e => onNavClick && onNavClick('features', e)} className="nav-link fw-medium" style={{ color: '#444', cursor: 'pointer' }}>Features</a>
        <a href="#how-it-works" onClick={e => onNavClick && onNavClick('howItWorks', e)} className="nav-link fw-medium" style={{ color: '#444', cursor: 'pointer' }}>How It Works</a>
        <a href="#testimonials" onClick={e => onNavClick && onNavClick('testimonials', e)} className="nav-link fw-medium" style={{ color: '#444', cursor: 'pointer' }}>What Our Users Say</a>
        <select className="form-select w-auto ms-2">
          <option value="en">GB EN</option>
          <option value="hi">IN HI</option>
          <option value="mr">IN MR</option>
          <option value="ta">IN TA</option>
        </select>
        <button className="btn btn-light ms-2" title="Toggle theme">
          <span role="img" aria-label="theme">🌙</span>
        </button>
        <Link to="/auth/signin" className="nav-link fw-medium ms-2" style={{ color: '#444' }}>Login</Link>
        <Link to="/auth/signup" className="btn fw-bold text-white ms-2" style={{ background: 'linear-gradient(90deg, #3b82f6 0%, #a855f7 100%)', borderRadius: 10, padding: '8px 22px', boxShadow: '0 2px 8px rgba(59,130,246,0.08)' }}>Sign Up</Link>
      </div>
    </div>
  </nav>
);

const AnimatedCard = () => (
  <div className="shadow-lg bg-white rounded-4 p-4 position-relative" style={{ width: '100%', maxWidth: 380, animation: 'floatCard 3s ease-in-out infinite', transform: 'rotate(-3deg)' }}>
    <style>{`
      @keyframes floatCard {
        0% { transform: translateY(0px) rotate(-3deg); }
        50% { transform: translateY(-16px) rotate(-3deg); }
        100% { transform: translateY(0px) rotate(-3deg); }
      }
    `}</style>
    <div style={{ background: 'linear-gradient(90deg, #3b82f6 0%, #a855f7 100%)', color: '#fff', borderRadius: 12, padding: '12px 24px', fontWeight: 600, fontSize: 20, marginBottom: 18, boxShadow: '0 2px 8px rgba(59,130,246,0.08)' }}>
      AI Financial Analysis
      <div style={{ fontWeight: 400, fontSize: 14, opacity: 0.9 }}>Real-time insights</div>
    </div>
    <div className="d-flex justify-content-between mb-2 fs-6">
      <span>Spending this month</span>
      <span style={{ color: '#ef4444', fontWeight: 600 }}>₹38,000 <span style={{ fontSize: 13, color: '#ef4444', fontWeight: 400 }}>&#8595;31%</span></span>
    </div>
    <div className="d-flex justify-content-between mb-2 fs-6">
      <span>Savings potential</span>
      <span style={{ color: '#22c55e', fontWeight: 600 }}>₹7,400</span>
    </div>
    <div className="d-flex justify-content-between fs-6">
      <span>Credit Score</span>
      <span style={{ color: '#3b82f6', fontWeight: 600 }}>762 <span style={{ color: '#a855f7', fontWeight: 400, fontSize: 13 }}>↑14</span></span>
    </div>
  </div>
);

const testimonials = [
  {
    stars: 5,
    text: 'FinanceAI Pro helped me save ₹15,000 per month by identifying unnecessary subscriptions!',
    name: 'Priya Sharma',
    city: 'Mumbai',
    avatar: 'P',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)',
  },
  {
    stars: 5,
    text: 'The AI insights are spot on! My credit score improved by 40 points in just 2 months.',
    name: 'Rahul Verma',
    city: 'Delhi',
    avatar: 'R',
    gradient: 'linear-gradient(135deg, #22c55e 0%, #3b82f6 100%)',
  },
  {
    stars: 5,
    text: 'Love the multilingual support. My parents can use it easily in Marathi!',
    name: 'Sneha Patil',
    city: 'Pune',
    avatar: 'S',
    gradient: 'linear-gradient(135deg, #a855f7 0%, #ef4444 100%)',
  },
  {
    stars: 5,
    text: 'Secure, easy, and super helpful for tracking my spending habits.',
    name: 'Amit Kumar',
    city: 'Bangalore',
    avatar: 'A',
    gradient: 'linear-gradient(135deg, #f59e42 0%, #3b82f6 100%)',
  },
];

function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];
  return (
    <section style={{ background: 'linear-gradient(120deg, #f6faff 0%, #f8f6ff 100%)', padding: '64px 0 96px 0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <h2 style={{ textAlign: 'center', fontSize: 44, fontWeight: 800, color: '#181c2e', marginBottom: 48 }}>
          What Our Users Say
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 28, boxShadow: '0 8px 32px rgba(80,36,180,0.10)', padding: '48px 48px 32px 48px', maxWidth: 900, width: '100%', marginBottom: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 260, transition: 'all 0.3s' }}>
            {/* Stars */}
            <div style={{ fontSize: 32, color: '#facc15', marginBottom: 18 }}>
              {'★'.repeat(t.stars)}
            </div>
            {/* Testimonial */}
            <div style={{ fontSize: 26, color: '#222', fontStyle: 'italic', textAlign: 'center', marginBottom: 32, fontWeight: 400 }}>
              "<span style={{ fontWeight: 500 }}>FinanceAI Pro</span> {t.text.replace('FinanceAI Pro', '')}"
            </div>
            {/* User Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <div style={{ width: 54, height: 54, borderRadius: '50%', background: t.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 26 }}>
                {t.avatar}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span style={{ fontWeight: 700, fontSize: 20, color: '#181c2e' }}>{t.name}</span>
                <span style={{ color: '#6b7280', fontSize: 16 }}>{t.city}</span>
              </div>
            </div>
          </div>
          {/* Carousel Dots */}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 8 }}>
            {testimonials.map((_, idx) => (
              <span
                key={idx}
                onClick={() => setActive(idx)}
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: active === idx ? testimonials[idx].gradient : '#e5e7eb',
                  display: 'inline-block',
                  cursor: 'pointer',
                  border: active === idx ? '2px solid #fff' : 'none',
                  boxShadow: active === idx ? '0 0 6px #a855f7' : 'none',
                  transition: 'all 0.2s',
                }}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const HomePage = () => {
  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const testimonialsRef = useRef(null);

  const handleNavClick = (section, e) => {
    e.preventDefault();
    if (section === 'features' && featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'howItWorks' && howItWorksRef.current) {
      howItWorksRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'testimonials' && testimonialsRef.current) {
      testimonialsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #f6faff 0%, #f8f6ff 100%)' }}>
      <Navbar onNavClick={handleNavClick} />
      <section className="container py-5">
        <div className="row align-items-center g-5 flex-column-reverse flex-lg-row">
          <div className="col-lg-6 col-12 px-lg-5">
            <h1 className="display-3 fw-bold mb-0" style={{ lineHeight: 1.1, color: '#181c2e' }}>
              Your Intelligent<br />Financial Future<br />Starts Here
            </h1>
            <p className="fs-4 text-secondary my-4" style={{ maxWidth: 600 }}>
              Harness the power of AI to analyze spending patterns, detect fraud, and optimize your financial health with personalized insights.
            </p>
            <div className="d-flex flex-wrap gap-3 mb-3">
              <button className="btn fw-bold text-white" style={{ background: 'linear-gradient(90deg, #3b82f6 0%, #a855f7 100%)', borderRadius: 12, padding: '18px 38px', fontSize: 20, boxShadow: '0 2px 8px rgba(59,130,246,0.08)' }}>
                Get Started Free
              </button>
              <button className="btn btn-outline-secondary fw-bold" style={{ borderRadius: 12, padding: '18px 38px', fontSize: 20, boxShadow: '0 2px 8px rgba(59,130,246,0.04)' }}>
                Watch Demo
              </button>
            </div>
            <div className="d-flex align-items-center fs-5 text-secondary mt-2">
              <span style={{ color: '#22c55e', fontSize: 22, marginRight: 8 }}>✓</span>
              Trusted by 50,000+ users across India
            </div>
          </div>
          <div className="col-lg-6 col-12 d-flex justify-content-center align-items-center min-vh-30" style={{ minHeight: 420 }}>
            <AnimatedCard />
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section ref={featuresRef} id="features" style={{ background: '#fafbfc', padding: '64px 0 96px 0' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ textAlign: 'center', fontSize: 44, fontWeight: 800, color: '#181c2e', marginBottom: 8 }}>
            Powerful AI-Driven Features
          </h2>
          <div style={{ textAlign: 'center', fontSize: 22, color: '#6b7280', marginBottom: 48 }}>
            Everything you need to master your finances
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 36, justifyContent: 'center' }}>
            {/* Feature 1 */}
            <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(80,36,180,0.06)', padding: '36px 32px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minHeight: 220 }}>
              <span style={{ fontSize: 40, marginBottom: 18 }}>🧠</span>
              <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 8 }}>Smart Spending Analysis</div>
              <div style={{ color: '#374151', fontSize: 17 }}>
                AI analyzes your spending patterns and provides personalized insights to optimize your budget.
              </div>
            </div>
            {/* Feature 2 */}
            <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(80,36,180,0.06)', padding: '36px 32px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minHeight: 220 }}>
              <span style={{ fontSize: 40, marginBottom: 18 }}>🛡️</span>
              <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 8 }}>Real-time Fraud Detection</div>
              <div style={{ color: '#374151', fontSize: 17 }}>
                Advanced anomaly detection protects you from suspicious transactions instantly.
              </div>
            </div>
            {/* Feature 3 */}
            <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(80,36,180,0.06)', padding: '36px 32px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minHeight: 220 }}>
              <span style={{ fontSize: 40, marginBottom: 18 }}>🌍</span>
              <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 8 }}>Multilingual Support</div>
              <div style={{ color: '#374151', fontSize: 17 }}>
                Available in Hindi, Marathi, Tamil, and English for better accessibility.
              </div>
            </div>
            {/* Feature 4 */}
            <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(80,36,180,0.06)', padding: '36px 32px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minHeight: 220 }}>
              <span style={{ fontSize: 40, marginBottom: 18 }}>📊</span>
              <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 8 }}>Credit Health Scoring</div>
              <div style={{ color: '#374151', fontSize: 17 }}>
                Non-bureau based credit scoring using behavioral data and spending patterns.
              </div>
            </div>
            {/* Feature 5 */}
            <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(80,36,180,0.06)', padding: '36px 32px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minHeight: 220 }}>
              <span style={{ fontSize: 40, marginBottom: 18 }}>🔮</span>
              <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 8 }}>Predictive Analytics</div>
              <div style={{ color: '#374151', fontSize: 17 }}>
                AI-powered predictions help you plan for future financial goals.
              </div>
            </div>
            {/* Feature 6 */}
            <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(80,36,180,0.06)', padding: '36px 32px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minHeight: 220 }}>
              <span style={{ fontSize: 40, marginBottom: 18 }}>🔒</span>
              <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 8 }}>Secure & Encrypted</div>
              <div style={{ color: '#374151', fontSize: 17 }}>
                Bank-level security with end-to-end encryption for all your data.
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section ref={howItWorksRef} id="how-it-works" style={{ background: '#fff', padding: '64px 0 96px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ textAlign: 'center', fontSize: 44, fontWeight: 800, color: '#181c2e', marginBottom: 8 }}>
            How It Works
          </h2>
          <div style={{ textAlign: 'center', fontSize: 22, color: '#6b7280', marginBottom: 48 }}>
            {/* Optionally add a subtitle here */}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 80, flexWrap: 'wrap' }}>
            {/* Step 1 */}
            <div style={{ flex: 1, minWidth: 260, maxWidth: 340, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, color: '#fff', fontWeight: 700, marginBottom: 24 }}>
                1
              </div>
              <div style={{ fontWeight: 700, fontSize: 26, color: '#181c2e', marginBottom: 10, textAlign: 'center' }}>Upload Statements</div>
              <div style={{ color: '#4b5563', fontSize: 18, textAlign: 'center' }}>Securely upload your bank statements</div>
            </div>
            {/* Step 2 */}
            <div style={{ flex: 1, minWidth: 260, maxWidth: 340, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'linear-gradient(135deg, #22c55e 0%, #3b82f6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, color: '#fff', fontWeight: 700, marginBottom: 24 }}>
                2
              </div>
              <div style={{ fontWeight: 700, fontSize: 26, color: '#181c2e', marginBottom: 10, textAlign: 'center' }}>AI Analysis</div>
              <div style={{ color: '#4b5563', fontSize: 18, textAlign: 'center' }}>Our AI analyzes your financial patterns</div>
            </div>
            {/* Step 3 */}
            <div style={{ flex: 1, minWidth: 260, maxWidth: 340, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'linear-gradient(135deg, #a855f7 0%, #ef4444 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, color: '#fff', fontWeight: 700, marginBottom: 24 }}>
                3
              </div>
              <div style={{ fontWeight: 700, fontSize: 26, color: '#181c2e', marginBottom: 10, textAlign: 'center' }}>Get Insights</div>
              <div style={{ color: '#4b5563', fontSize: 18, textAlign: 'center' }}>Receive personalized recommendations</div>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <div ref={testimonialsRef} id="testimonials">
        <TestimonialsSection />
      </div>
      {/* CTA Section */}
      <section style={{ background: 'linear-gradient(90deg, #3b82f6 0%, #a855f7 100%)', padding: '80px 0 120px 0', textAlign: 'center' }}>
        <h2 style={{ color: '#fff', fontSize: 48, fontWeight: 800, marginBottom: 18 }}>
          Ready to Transform Your Financial Life?
        </h2>
        <div style={{ color: '#e0e7ef', fontSize: 24, marginBottom: 48 }}>
          Join thousands of users who are already benefiting from AI-powered financial insights.
        </div>
        <button style={{ background: '#fff', color: '#2563eb', fontWeight: 700, fontSize: 26, border: 'none', borderRadius: 14, padding: '22px 54px', boxShadow: '0 4px 24px rgba(59,130,246,0.10)', cursor: 'pointer', transition: 'all 0.2s', marginTop: 12 }}>
          Start Free Today
        </button>
      </section>
      {/* Footer Section */}
      <footer style={{ background: '#181c2e', color: '#e5e7eb', padding: '64px 0 0 0', marginTop: 0 }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 32px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 40 }}>
          {/* Logo and Description */}
          <div style={{ flex: 2, minWidth: 320, display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: 38 }}>🏦</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 26, color: '#fff' }}>FinanceAI Pro</div>
                <div style={{ fontSize: 16, color: '#cbd5e1', marginTop: 2 }}>Empowering Financial Decisions with AI</div>
              </div>
            </div>
            <div style={{ fontSize: 17, color: '#cbd5e1', maxWidth: 420 }}>
              Harness the power of AI to analyze spending patterns, detect fraud, and optimize your financial health with personalized insights.
            </div>
          </div>
          {/* Features Links */}
          <div style={{ flex: 1, minWidth: 180, marginTop: 18 }}>
            <div style={{ fontWeight: 700, fontSize: 20, color: '#fff', marginBottom: 18 }}>Features</div>
            <div style={{ color: '#cbd5e1', fontSize: 17, marginBottom: 10, cursor: 'pointer' }}>Spending Analysis</div>
            <div style={{ color: '#cbd5e1', fontSize: 17, marginBottom: 10, cursor: 'pointer' }}>Fraud Detection</div>
            <div style={{ color: '#cbd5e1', fontSize: 17, marginBottom: 10, cursor: 'pointer' }}>Credit Scoring</div>
            <div style={{ color: '#cbd5e1', fontSize: 17, marginBottom: 10, cursor: 'pointer' }}>AI Insights</div>
          </div>
          {/* Support Links */}
          <div style={{ flex: 1, minWidth: 180, marginTop: 18 }}>
            <div style={{ fontWeight: 700, fontSize: 20, color: '#fff', marginBottom: 18 }}>Support</div>
            <div style={{ color: '#cbd5e1', fontSize: 17, marginBottom: 10, cursor: 'pointer' }}>Help Center</div>
            <div style={{ color: '#cbd5e1', fontSize: 17, marginBottom: 10, cursor: 'pointer' }}>Privacy Policy</div>
            <div style={{ color: '#cbd5e1', fontSize: 17, marginBottom: 10, cursor: 'pointer' }}>Terms of Service</div>
            <div style={{ color: '#cbd5e1', fontSize: 17, marginBottom: 10, cursor: 'pointer' }}>Contact Us</div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #23263a', margin: '48px 0 0 0', padding: '24px 0 24px 0', textAlign: 'center', color: '#94a3b8', fontSize: 16 }}>
          © 2025 FinanceAI Pro. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomePage; 