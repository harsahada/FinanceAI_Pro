import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api';

const AuthPage = () => {
  const { tab } = useParams();
  const navigate = useNavigate();
  const [tabState, setTabState] = useState(tab === 'signup' ? 'signup' : 'signin');
  const [showPassword, setShowPassword] = useState(false);
  // Sign In state
  const [signinEmail, setSigninEmail] = useState('');
  const [signinPassword, setSigninPassword] = useState('');
  // Sign Up state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [language, setLanguage] = useState('English');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);
  // Alerts
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    setTabState(tab === 'signup' ? 'signup' : 'signin');
  }, [tab]);

  const handleTabChange = (newTab) => {
    setTabState(newTab);
    setAlert(null);
    navigate(`/auth/${newTab}`);
  };

  // Sign Up handler
  const handleSignup = async (e) => {
    e.preventDefault();
    setAlert(null);
    if (!firstName || !lastName || !email || !phone || !language || !password || !confirmPassword) {
      setAlert({ type: 'danger', msg: 'Please fill in all fields.' });
      return;
    }
    if (password !== confirmPassword) {
      setAlert({ type: 'danger', msg: 'Passwords do not match.' });
      return;
    }
    if (!agree) {
      setAlert({ type: 'danger', msg: 'You must agree to the terms.' });
      return;
    }
    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, phone, language, password })
      });
      const data = await res.json();
      if (data.error) {
        setAlert({ type: 'danger', msg: data.error });
      } else {
        setAlert({ type: 'success', msg: 'Account created! Please sign in.' });
        setTabState('signin');
        navigate('/auth/signin');
      }
    } catch (err) {
      setAlert({ type: 'danger', msg: 'Server error.' });
    }
  };

  // Sign In handler
  const handleSignin = async (e) => {
    e.preventDefault();
    setAlert(null);
    if (!signinEmail || !signinPassword) {
      setAlert({ type: 'danger', msg: 'Please enter email and password.' });
      return;
    }
    try {
      const res = await fetch(`${API_URL}/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: signinEmail, password: signinPassword })
      });
      const data = await res.json();
      if (data.error) {
        setAlert({ type: 'danger', msg: data.error });
      } else {
        setAlert({ type: 'success', msg: 'Signed in successfully!' });
        localStorage.setItem('token', data.token);
        // Redirect to dashboard
        setTimeout(() => navigate('/dashboard'), 1000);
      }
    } catch (err) {
      setAlert({ type: 'danger', msg: 'Server error.' });
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column align-items-center justify-content-start bg-light position-relative" style={{ background: 'linear-gradient(120deg, #f6faff 0%, #f8f6ff 100%)', paddingTop: 48 }}>
      {/* Go Back Button */}
      <button onClick={() => navigate('/')} className="btn btn-outline-primary position-absolute" style={{ left: 32, top: 32, zIndex: 10 }}>
        <span className="me-2">&larr;</span> Go Back
      </button>
      <div className="text-center mb-4">
        <div className="d-flex flex-column align-items-center gap-2">
          <span style={{ fontSize: 54, background: 'linear-gradient(90deg, #3b82f6 0%, #a855f7 100%)', borderRadius: '50%', padding: 10, color: '#fff', marginBottom: 8 }}>🏦</span>
          <h1 className="fw-bold display-6 mb-0" style={{ color: '#181c2e' }}>Welcome to FinanceAI Pro</h1>
          <div className="text-secondary fs-5 mb-0">Smart Financial Management & AI Analytics</div>
        </div>
        <div className="d-flex align-items-center justify-content-center gap-2 mt-3">
          <select className="form-select w-auto">
            <option value="en">🇬🇧 English</option>
            <option value="hi">🇮🇳 Hindi</option>
            <option value="mr">🇮🇳 Marathi</option>
            <option value="ta">🇮🇳 Tamil</option>
          </select>
          <button className="btn btn-light ms-2" title="Toggle theme">
            <span role="img" aria-label="theme">🌙</span>
          </button>
        </div>
      </div>
      <div className="bg-white rounded-4 shadow-lg w-100" style={{ maxWidth: 440, padding: '32px 32px 24px 32px', marginBottom: 32 }}>
        <div className="d-flex rounded-3 overflow-hidden mb-4 border-bottom border-1" style={{ boxShadow: '0 1px 0 #e5e7eb' }}>
          <button onClick={() => handleTabChange('signin')} className={`flex-fill btn ${tabState === 'signin' ? 'btn-light border-bottom border-primary fw-bold text-primary' : 'btn-link text-secondary'}`} style={{ fontSize: 18, borderRadius: 0, borderWidth: 3, borderStyle: tabState === 'signin' ? 'solid' : 'none', borderColor: tabState === 'signin' ? '#3b82f6' : 'transparent' }}>Sign In</button>
          <button onClick={() => handleTabChange('signup')} className={`flex-fill btn ${tabState === 'signup' ? 'btn-light border-bottom border-primary fw-bold text-primary' : 'btn-link text-secondary'}`} style={{ fontSize: 18, borderRadius: 0, borderWidth: 3, borderStyle: tabState === 'signup' ? 'solid' : 'none', borderColor: tabState === 'signup' ? '#3b82f7' : 'transparent' }}>Sign Up</button>
        </div>
        {alert && (
          <div className={`alert alert-${alert.type} py-2`}>{alert.msg}</div>
        )}
        {tabState === 'signin' ? (
          <form onSubmit={handleSignin}>
            <div className="mb-3 text-start">
              <label className="form-label fw-semibold">Email Address</label>
              <input type="email" className="form-control" placeholder="harshada@example.com" value={signinEmail} onChange={e => setSigninEmail(e.target.value)} />
            </div>
            <div className="mb-2 text-start">
              <label className="form-label fw-semibold">Password</label>
              <div className="position-relative">
                <input type={showPassword ? 'text' : 'password'} className="form-control" placeholder="••••••••" value={signinPassword} onChange={e => setSigninPassword(e.target.value)} />
                <span onClick={() => setShowPassword(s => !s)} className="position-absolute top-50 end-0 translate-middle-y pe-3" style={{ cursor: 'pointer', color: '#6b7280', fontSize: 20 }} title="Show/Hide Password">👁️</span>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <label className="form-check-label">
                <input type="checkbox" className="form-check-input me-2" /> Remember me
              </label>
              <a href="#" className="text-primary fw-semibold text-decoration-none">Forgot Password?</a>
            </div>
            <button type="submit" className="btn w-100 fw-bold text-white mb-3" style={{ background: 'linear-gradient(90deg, #3b82f6 0%, #a855f7 100%)', fontSize: 20 }}>Sign In</button>
            <div className="text-center text-secondary fs-6 my-3 position-relative">
              <span className="bg-white px-2 position-relative z-1">Or continue with</span>
              <div className="position-absolute start-0 end-0 top-50 border-bottom" style={{ zIndex: 0 }}></div>
            </div>
            <button type="button" className="btn btn-outline-secondary w-100 mb-2 d-flex align-items-center justify-content-center gap-2">
              <span style={{ fontSize: 20 }}>🟢</span> Sign in with Google
            </button>
            <div className="text-center text-secondary fs-6 mt-3">
              Don't have an account? <a href="#" onClick={e => { e.preventDefault(); handleTabChange('signup'); }} className="fw-bold text-decoration-none" style={{ color: '#a855f7' }}>Sign Up</a>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignup}>
            <div className="row mb-3">
              <div className="col">
                <label className="form-label fw-semibold">First Name</label>
                <input type="text" className="form-control" placeholder="Harshada" value={firstName} onChange={e => setFirstName(e.target.value)} />
              </div>
              <div className="col">
                <label className="form-label fw-semibold">Last Name</label>
                <input type="text" className="form-control" placeholder="Hanchate" value={lastName} onChange={e => setLastName(e.target.value)} />
              </div>
            </div>
            <div className="mb-3 text-start">
              <label className="form-label fw-semibold">Email Address</label>
              <input type="email" className="form-control" placeholder="harshada@example.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="mb-3 text-start">
              <label className="form-label fw-semibold">Phone Number</label>
              <input type="tel" className="form-control" placeholder="+91 98765 43210" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
            <div className="mb-3 text-start">
              <label className="form-label fw-semibold">Preferred Language</label>
              <select className="form-select" value={language} onChange={e => setLanguage(e.target.value)}>
                <option>English</option>
                <option>Hindi</option>
                <option>Marathi</option>
                <option>Tamil</option>
              </select>
            </div>
            <div className="mb-3 text-start">
              <label className="form-label fw-semibold">Password</label>
              <div className="position-relative">
                <input type={showPassword ? 'text' : 'password'} className="form-control" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
                <span onClick={() => setShowPassword(s => !s)} className="position-absolute top-50 end-0 translate-middle-y pe-3" style={{ cursor: 'pointer', color: '#6b7280', fontSize: 20 }} title="Show/Hide Password">👁️</span>
              </div>
            </div>
            <div className="mb-3 text-start">
              <label className="form-label fw-semibold">Confirm Password</label>
              <input type={showPassword ? 'text' : 'password'} className="form-control" placeholder="••••••••" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            </div>
            <div className="mb-4 d-flex align-items-center">
              <input type="checkbox" className="form-check-input me-2" checked={agree} onChange={e => setAgree(e.target.checked)} />
              <span className="text-secondary fs-6">
                I agree to the Terms and Conditions & Privacy Policy
              </span>
            </div>
            <button type="submit" className="btn w-100 fw-bold text-white mb-3" style={{ background: 'linear-gradient(90deg, #22c55e 0%, #3b82f6 100%)', fontSize: 20 }}>Create Account</button>
            <div className="text-center text-secondary fs-6 my-3 position-relative">
              <span className="bg-white px-2 position-relative z-1">Or continue with</span>
              <div className="position-absolute start-0 end-0 top-50 border-bottom" style={{ zIndex: 0 }}></div>
            </div>
            <button type="button" className="btn btn-outline-secondary w-100 mb-2 d-flex align-items-center justify-content-center gap-2">
              <span style={{ fontSize: 20 }}>🟢</span> Sign up with Google
            </button>
            <div className="text-center text-secondary fs-6 mt-3">
              Already have an account? <a href="#" onClick={e => { e.preventDefault(); handleTabChange('signin'); }} className="fw-bold text-decoration-none" style={{ color: '#3b82f6' }}>Sign In</a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage; 