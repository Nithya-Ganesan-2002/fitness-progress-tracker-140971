import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

// Very basic progress bar chart using SVG, replace with chart lib as needed
function ProgressBar({ percent, color }) {
  const w = 165, h = 17, r = 8;
  return (
    <svg width={w} height={h}>
      <rect width={w} height={h} rx={r} fill="#ecf5fa" />
      <rect width={w * Math.min(percent, 100) / 100} height={h} rx={r} fill={color} />
      <text
        x={w/2}
        y={h/2+5}
        textAnchor="middle"
        fontWeight="bold"
        fontSize={13}
        fill="#222"
      >
        {percent}%
      </text>
    </svg>
  );
}

// PUBLIC_INTERFACE
function Dashboard() {
  const { authHeaders } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Fetch dashboard data (summary stats)
    async function fetchStats() {
      try {
        let res = await fetch('/api/dashboard', { headers: { ...authHeaders() }});
        if (!res.ok) throw new Error('API error');
        let data = await res.json();
        setStats(data);
      } catch {
        setStats({
          totalWorkouts: 32,
          caloriesBurned: 4800,
          goals: [{ name: "Weekly Target", progress: 67 }],
        }); // placeholder, use demo if offline
      }
    }
    fetchStats();
  }, [authHeaders]);

  return (
    <div>
      <div className="dashboard-grid">
        <div className="card dash-stat">
          <div className="dash-label">Total Workouts</div>
          <div className="dash-value">{stats?.totalWorkouts ?? "--"}</div>
        </div>
        <div className="card dash-stat">
          <div className="dash-label">Calories Burned</div>
          <div className="dash-value">{stats?.caloriesBurned ?? "--"} kcal</div>
        </div>
        <div className="card dash-stat">
          <div className="dash-label">Your Goals</div>
          {(stats?.goals || [{name:'Goal',progress:0}]).map((goal, idx) => (
            <div key={idx} style={{marginBottom:8}}>
              <span>{goal.name}</span>
              <ProgressBar percent={goal.progress} color="var(--accent)" />
            </div>
          ))}
        </div>
      </div>
      <div className="card" style={{marginTop:32,minHeight:180}}>
        <h3 style={{color: "var(--primary)"}}>Recent Activity Trends</h3>
        <svg width="98%" height="70" style={{background:'#f4f8fb',margin:'12px auto 1px auto',display:'block',borderRadius:7}}>
          <polyline
            fill="none"
            stroke="var(--primary)"
            strokeWidth="4"
            points="10,55 45,35 75,28 110,33 140,25 180,38 240,28"
          />
          {/* dots */}
          {[55,35,28,33,25,38,28].map((y,i)=>(
            <circle key={i} cx={10 + i*35} cy={y} r="4" fill="var(--accent)" />
          ))}
        </svg>
        <div style={{fontSize:12,color:"#888",marginTop:6}}>Trend is simulated for demo; will show actual progress with API</div>
      </div>
    </div>
  );
}

export default Dashboard;
