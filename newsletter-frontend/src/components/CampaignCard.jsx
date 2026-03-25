import React from "react";
import { useNavigate } from "react-router-dom";

const CampaignCard = ({ campaign }) => {
  const navigate = useNavigate();

  return (
    <div className="card" onClick={() => navigate(`/campaign/${campaign.id}`)}>
      <h3>{campaign.subject}</h3>
      <span>{campaign.published_date}</span>
      <p>{campaign.preview_text}</p>
    </div>
  );
};

export default CampaignCard;