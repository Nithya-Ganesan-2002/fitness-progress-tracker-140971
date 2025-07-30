import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

// PUBLIC_INTERFACE
function Goals() {
  const { authHeaders } = useAuth();
  const [goals, setGoals] = useState([]);
  const [form, setForm] = useState({ name: '', target: '', progress: 0 });
  const [editIdx, setEditIdx] = useState(null);

  async function fetchGoals() {
    try {
      let res = await fetch('/api/goals', { headers: { ...authHeaders() }});
      let data = await res.json();
      setGoals(data);
    } catch {
      setGoals([
        { name:"Run 5K/week", target: "5K", progress: 62 },
        { name: "Burn 2000 kcal/week", target: 2000, progress: 54 }
      ]);
    }
  }
  useEffect(() => { fetchGoals(); }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.target) return;
    if (editIdx !== null) {
      setGoals(g => g.map((g,i)=>i===editIdx?form:g));
      setEditIdx(null);
    } else {
      setGoals(g => [...g, {...form, progress: 0}]);
    }
    setForm({ name:'', target:'', progress:0 });
  }
  function handleEdit(idx) {
    setEditIdx(idx); setForm(goals[idx]);
  }
  function handleDelete(idx) {
    setGoals(g => g.filter((_, i)=>i!==idx));
    if (editIdx===idx) setEditIdx(null);
  }

  return (
    <div>
      <div className="card" style={{maxWidth: 510}}>
        <h3 style={{marginBottom:8, color:"var(--secondary)"}}>
          {editIdx!==null ? "Edit Goal" : "Set New Goal"}
        </h3>
        <form className="flex-gap" onSubmit={handleSubmit}>
          <input required placeholder="Goal name" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} />
          <input required placeholder="Target (e.g. 5K)" value={form.target} onChange={e=>setForm(f=>({...f,target:e.target.value}))} />
          <button className="btn-accent">{editIdx!==null ? "Update" : "Add"}</button>
          {editIdx!==null && (<button className="btn-outline" type="button" style={{marginLeft:8}} onClick={()=>{setEditIdx(null);setForm({name:'',target:'',progress:0})}}>Cancel</button>)}
        </form>
      </div>
      <div className="card">
        <h3 style={{color:"var(--primary)"}}>Your Goals</h3>
        <table className="workout-table">
          <thead>
            <tr><th>Name</th><th>Target</th><th>Progress</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {goals.map((g,i)=>(
              <tr key={i}>
                <td>{g.name}</td>
                <td>{g.target}</td>
                <td>
                  <div className="goal-progress-bar">
                    <div style={{
                      width:`${g.progress}%`,height:"100%",
                      background:"var(--accent)",borderRadius:12
                    }} />
                    <span className="goal-progress-label">{g.progress}%</span>
                  </div>
                </td>
                <td>
                  <button className="btn-xs" onClick={()=>handleEdit(i)}>Edit</button>
                  <button className="btn-xs btn-danger" onClick={()=>handleDelete(i)}>Delete</button>
                </td>
              </tr>
            ))}
            {goals.length === 0 && <tr><td colSpan={4}><em>No goals set</em></td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Goals;
