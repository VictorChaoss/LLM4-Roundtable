const ALLOWED_ORIGINS = ['https://llm4.xyz', 'https://www.llm4.xyz', 'https://llm-4-roundtable.vercel.app', 'http://localhost', 'http://127.0.0.1'];
function getCorsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };
}

export default async function handler(req, res) {
  const origin = req.headers.origin || '';
  const corsHeaders = getCorsHeaders(origin);
  Object.keys(corsHeaders).forEach(k => res.setHeader(k, corsHeaders[k]));
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    return res.status(200).json({ success: true, message: "Hello from minimal serverless test!" });
  } catch(e) {
    return res.status(500).json({ error: e.message, stack: e.stack });
  }
}
