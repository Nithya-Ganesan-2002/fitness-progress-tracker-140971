import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

// PUBLIC_INTERFACE
function History() {
  const { authHeaders } = useAuth();
  const [activities, setActivities] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    async function fetchHistory() {
      try {
        let res = await fetch('/api/history', { headers: { ...authHeaders() } });
        let data = await res.json();
        setActivities(data);
      } catch {
        setActivities([
          { type: "Run", duration: 32, calories: 244, date: "2024-06-04" },
          { type: "Cycling", duration: 45, calories: 382, date: "2024-06-03" },
          { type: "Yoga", duration: 22, calories: 80, date: "2024-06-02" },
        ]);
      }
    }
    fetchHistory();
  }, [authHeaders]);
  
  const filtered = filter 
    ? activities.filter(a => a.type.toLowerCase().includes(filter.toLowerCase()))
    : activities;

  return (
    <div>
      <div className="card" style={{maxWidth:540}}>
        <h3 style={{marginBottom:8, color:"var(--primary)"}}>Activity History</h3>
        <input 
          placeholder="Filter by type..." 
          value={filter}
          onChange={e=>setFilter(e.target.value)}
          style={{marginBottom:8, width:"210px"}}
        />
        <table className="workout-table">
          <thead>
            <tr><th>Date</th><th>Type</th><th>Duration</th><th>Calories</th></tr>
          </thead>
          <tbody>
            {filtered.map((a,i)=>(
              <tr key={i}>
                <td>{a.date}</td>
                <td>{a.type}</td>
                <td>{a.duration} min</td>
                <td>{a.calories ?? '--'}</td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={4}><em>No activities found</em></td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default History;
