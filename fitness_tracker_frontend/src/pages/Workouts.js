import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

// DEFAULT API ENDPOINTS (replace with your backend)
const WORKOUTS_API = '/api/workouts';

// PUBLIC_INTERFACE
function Workouts() {
  const { authHeaders } = useAuth();
  const [workouts, setWorkouts] = useState([]);
  const [form, setForm] = useState({ type: '', duration: '', calories: '' });
  const [editIdx, setEditIdx] = useState(null);

  async function fetchWorkouts() {
    try {
      let res = await fetch(WORKOUTS_API, { headers: { ...authHeaders() }});
      let data = await res.json();
      setWorkouts(data);
    } catch {
      // mock
      setWorkouts([
        { type: "Run", duration: 30, calories: 250 },
        { type: "Cycling", duration: 45, calories: 380 },
      ]);
    }
  }
  useEffect(() => { fetchWorkouts(); }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.type || !form.duration) return;
    if (editIdx !== null) {
      // Update
      setWorkouts(w => w.map((wkt, i) => i === editIdx ? form : wkt));
      setEditIdx(null);
    } else {
      // Add
      setWorkouts(w => [...w, form]);
    }
    setForm({ type: '', duration: '', calories: '' });
  }
  function handleEdit(idx) {
    setEditIdx(idx);
    setForm(workouts[idx]);
  }
  function handleDelete(idx) {
    setWorkouts(w => w.filter((_, i) => i !== idx));
    if (editIdx === idx) setEditIdx(null);
  }

  return (
    <div>
      <div className="card" style={{maxWidth: 520}}>
        <h3 style={{marginBottom:9, color:"var(--primary)"}}>
          {editIdx !== null ? "Edit Workout" : "Add Workout"}
        </h3>
        <form className="flex-gap" onSubmit={handleSubmit}>
          <input required placeholder="Type (e.g. Run)" value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value}))} />
          <input type="number" min="0" required placeholder="Duration (min)" value={form.duration} onChange={e=>setForm(f=>({...f,duration:e.target.value}))} />
          <input type="number" min="0" placeholder="Calories" value={form.calories} onChange={e=>setForm(f=>({...f,calories:e.target.value}))} />
          <button className="btn-accent">{editIdx!==null ? "Update" : "Add"}</button>
          {editIdx!==null && (<button type="button" className="btn-outline" style={{marginLeft:8}} onClick={()=>{setEditIdx(null);setForm({type:'',duration:'',calories:''})}}>Cancel</button>)}
        </form>
      </div>
      <div className="card">
        <h3 style={{color:"var(--secondary)"}}>Your Workouts</h3>
        <table className="workout-table">
          <thead>
            <tr><th>Type</th><th>Duration</th><th>Calories</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {workouts.map((w, i) => (
              <tr key={i}>
                <td>{w.type}</td>
                <td>{w.duration} min</td>
                <td>{w.calories || '--'}</td>
                <td>
                  <button className="btn-xs" onClick={()=>handleEdit(i)}>Edit</button>
                  <button className="btn-xs btn-danger" onClick={()=>handleDelete(i)}>Delete</button>
                </td>
              </tr>
            ))}
            {workouts.length === 0 && <tr><td colSpan={4}><em>No workouts added</em></td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Workouts;
