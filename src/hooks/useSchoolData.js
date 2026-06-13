import { useState, useEffect } from 'react';

// const SCHOOL_ID = import.meta.env.VITE_SCHOOL || 'technicaltesting';
const SCHOOL_ID = 'bhartividyamandirpn';

async function postERP(path) {
  const res = await fetch('/api/school-data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      path: path,
      school_id: SCHOOL_ID
    }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export function useFeeStructure() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    postERP('/api/website/fee-structure')
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

export function useTimetable() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    postERP('/api/website/exam-timetable')
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
