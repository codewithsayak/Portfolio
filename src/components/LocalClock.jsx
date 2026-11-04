import { useEffect, useState } from 'react';

/** Live clock in the visitor's timezone — a small sign of life in the header/rail. */
export default function LocalClock({ className = '' }) {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000 * 20);
    return () => clearInterval(id);
  }, []);

  const formatted = time.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Kolkata',
  });

  return (
    <span className={className} title="Local time in Basirhat, West Bengal (IST)">
      {formatted} IST
    </span>
  );
}
