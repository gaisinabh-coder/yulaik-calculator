const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwAMfQjlH-qnLbNTQS-5Jw0QPaxS9kM6nNvRb4WWVuw7VdHtB9lMwPNELMha2S1L9IS/exec';

export async function sendLead(data: Record<string, unknown>) {
  await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: JSON.stringify(data),
  });

  return {
    ok: true,
  };
}