const API_BASE = "http://localhost:5000";

export default API_BASE;

export async function fetchQuestions(unit) {
  const res = await fetch(`${API_BASE}/api/questions?unit=${encodeURIComponent(unit)}`);
  return res.json();
}
export const fetchResults = async (email) => {
  const url = email
    ? `http://localhost:5000/api/results?email=${email}`
    : "http://localhost:5000/api/results";
  const res = await fetch(url);
  return res.json();
};


export async function postResult(resultData) {
  const res = await fetch(`${API_BASE}/api/results`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(resultData),
  });
  
  return res.json();
}

