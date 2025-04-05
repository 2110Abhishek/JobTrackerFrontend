import { useEffect, useState } from "react";
import axios from "axios";
import "./JobList.css";

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${id}`);
      setJobs((prev) => prev.filter((job) => job._id !== id));
      alert("🗑️ Job deleted successfully!");
    } catch (err) {
      console.error("Error deleting job:", err);
      alert("❌ Failed to delete job.");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/jobs/${id}`, {
        status: newStatus,
      });

      setJobs((prev) =>
        prev.map((job) =>
          job._id === id ? { ...job, status: newStatus } : job
        )
      );
      alert("✅ Status updated successfully!");
    } catch (err) {
      console.error("Error updating status:", err);
      alert("❌ Failed to update status.");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="joblist-wrapper">
      <h2 className="joblist-heading">📋 All Applied Jobs</h2>
      <div className="job-cards">
        {jobs.length === 0 ? (
          <p className="no-jobs">No jobs added yet.</p>
        ) : (
          jobs.map((job) => (
            <div key={job._id} className="job-card">
              <div className="job-info">
                <h3 className="job-role">{job.role}</h3>
                <p className="job-company">🏢 {job.company}</p>

                <p className={`job-status ${job.status.toLowerCase()}`}>
                  📌 {job.status}
                </p>

                <label className="status-label">Update Status:</label>
                <select
                  className="status-dropdown"
                  value={job.status}
                  onChange={(e) => handleStatusChange(job._id, e.target.value)}
                >
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>

                <p className="job-date">📅 Applied on: {job.appliedDate}</p>

                {job.link && (
                  <a
                    href={job.link}
                    className="job-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🔗 View Job
                  </a>
                )}
              </div>
              <button
                className="delete-btn"
                onClick={() => handleDelete(job._id)}
              >
                🗑️ Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobList;
