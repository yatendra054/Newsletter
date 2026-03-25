import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Form from "../components/Form";
import CampaignCard from "../components/CampaignCard";
import { getCampaigns } from "../api/api";

const Home = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    getCampaigns().then(setCampaigns);
  }, []);

  return (
    <Layout>
      <Form />

      <h2>Recent Campaigns</h2>

      {campaigns.length > 0 ? (
        campaigns.map((c) => <CampaignCard key={c.id} campaign={c} />)
      ) : (
        <p>No campaigns available</p>
      )}
    </Layout>
  );
};

export default Home;