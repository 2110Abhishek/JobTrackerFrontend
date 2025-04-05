import { useState } from "react";
import axios from "axios";
import "./AddJob.css";

const AddJob = () => {
  const [form, setForm] = useState({
    company: "",
    role: "",
    status: "Applied",
    appliedDate: "",
    link: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/jobs", form);
      console.log("Job added:", res.data);
      setForm({
        company: "",
        role: "",
        status: "Applied",
        appliedDate: "",
        link: "",
      });
      alert("🎉 Job Added Successfully!");
    } catch (err) {
      console.error("Error adding job:", err);
      alert("❌ Failed to add job. Try again!");
    }
  };

  return (
    <div className="addjob-wrapper">
      <div className="addjob-card">
        <h2 className="addjob-heading">🚀 Add New Job Application</h2>
        <form className="addjob-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>🏢 Company Name</label>
            <input
              name="company"
              placeholder="e.g. Google"
              value={form.company}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>💼 Job Role</label>
            <input
              name="role"
              placeholder="e.g. Frontend Developer"
              value={form.role}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>📅 Applied Date</label>
            <input
              type="date"
              name="appliedDate"
              value={form.appliedDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>📌 Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
          </div>

          <div className="input-group">
            <label>🔗 Job Link</label>
            <input
              name="link"
              placeholder="Paste job URL"
              value={form.link}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-btn">
            ➕ Add Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddJob;
