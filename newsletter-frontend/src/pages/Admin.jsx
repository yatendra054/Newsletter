import React, { useState, useEffect } from "react";
import { createCampaign, getCampaigns, deleteCampaign } from "../api/api";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [formData, setFormData] = useState({
    subject: "",
    preview_text: "",
    article_url: "",
    html_content: "",
    plain_text_content: "",
    published_date: new Date().toISOString().split('T')[0]
  });
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    const data = await getCampaigns();
    setCampaigns(data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await createCampaign(formData);
      alert(res.message);
      fetchCampaigns(); // Refresh list
      // Reset form if needed, or navigate
    } catch (error) {
      alert("Failed to create campaign");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      await deleteCampaign(id);
      fetchCampaigns();
    }
  };

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      
      <section>
        <h2>Create New Campaign</h2>
        <form onSubmit={handleSubmit} className="admin-form">
          <label>Subject*</label>
          <input
            name="subject"
            placeholder="Campaign Subject"
            required
            onChange={handleChange}
          />

          <label>Preview Text</label>
          <input
            name="preview_text"
            placeholder="Short preview text"
            onChange={handleChange}
          />

          <label>Article URL</label>
          <input
            name="article_url"
            placeholder="https://example.com/article"
            onChange={handleChange}
          />

          <label>HTML Content*</label>
          <textarea
            name="html_content"
            placeholder="HTML body of the email"
            required
            rows="10"
            onChange={handleChange}
          ></textarea>

          <label>Plain Text Content</label>
          <textarea
            name="plain_text_content"
            placeholder="Plain text fallback"
            rows="5"
            onChange={handleChange}
          ></textarea>

          <label>Published Date</label>
          <input
            name="published_date"
            type="date"
            value={formData.published_date}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Campaign"}
          </button>
        </form>
      </section>

      <hr style={{ margin: "40px 0", borderColor: "var(--border)" }} />

      <section>
        <h2>Existing Campaigns</h2>
        {campaigns.length === 0 ? (
          <p>No campaigns found.</p>
        ) : (
          campaigns.map((c) => (
            <div key={c.id} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ margin: "0 0 5px 0" }}>{c.subject}</h3>
                <small style={{ color: "var(--text-p)" }}>{c.published_date}</small>
              </div>
              <button 
                className="secondary" 
                style={{ backgroundColor: "#ff4d4d", color: "white", border: "none" }}
                onClick={() => handleDelete(c.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default Admin;
