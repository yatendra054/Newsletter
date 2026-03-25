import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCampaignDetail } from "../api/api";
import Layout from "../components/Layout";

const CampaignDetail = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    getCampaignDetail(id).then(setCampaign);
  }, [id]);

  if (!campaign) return <p>Loading...</p>;

  return (
    <Layout>
      <h2>{campaign.subject}</h2>
      <p><i>{campaign.preview_text}</i></p>
      <p>{campaign.published_date}</p>

      <div
        dangerouslySetInnerHTML={{ __html: campaign.html_content }}
      />

      <a href={campaign.article_url} className="btn">
        Read Full Article
      </a>
    </Layout>
  );
};

export default CampaignDetail;