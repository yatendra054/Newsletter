const BASE_URL = "http://127.0.0.1:8001"; // Flask later

export const subscribeUser = async (data) => {
  const res = await fetch(`${BASE_URL}/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getCampaigns = async () => {
  const res = await fetch(`${BASE_URL}/campaigns`);
  return res.json();
};

export const getCampaignDetail = async (id) => {
  const res = await fetch(`${BASE_URL}/campaign/${id}`);
  return res.json();
};

export const createCampaign = async (data) => {
  const res = await fetch(`${BASE_URL}/campaigns`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteCampaign = async (id) => {
  const res = await fetch(`${BASE_URL}/campaign/${id}`, {
    method: "DELETE",
  });
  return res.json();
};