import { useState, useEffect } from 'react';

function padZero(num: number) {
  return num < 10 ? `0${num}` : num;
}

export default function TimeCounter({ startDate }: { startDate: string }) {
  const [time, setTime] = useState({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date(startDate);
    
    const interval = setInterval(() => {
      const now = new Date();
      let diff = now.getTime() - targetDate.getTime();
      
      if (diff < 0) diff = 0;

      const seconds = Math.floor((diff / 1000) % 60);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const daysTotal = Math.floor(diff / (1000 * 60 * 60 * 24));
      
      const years = Math.floor(daysTotal / 365);
      const daysAfterYears = daysTotal % 365;
      const months = Math.floor(daysAfterYears / 30);
      const finalDays = daysAfterYears % 30;

      setTime({ years, months, days: finalDays, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  const boxes = [
    { value: time.years, label: 'Anos' },
    { value: padZero(time.months), label: 'Meses' },
    { value: padZero(time.days), label: 'Dias' },
    { value: padZero(time.hours), label: 'Horas' },
    { value: padZero(time.minutes), label: 'Minutos' },
    { value: padZero(time.seconds), label: 'Segundos' }
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mb-6 relative z-10">
      {boxes.map((box, i) => (
        <div key={i} className="bg-[#0a060d] rounded-sm flex flex-col items-center justify-center py-4 border border-[#c5a059]/30 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
          <span className="text-xl font-serif font-bold text-[#e6e0f8] mb-1 drop-shadow-md">{box.value}</span>
          <span className="text-xs text-[#c5a059] font-medium tracking-widest uppercase">{box.label}</span>
        </div>
      ))}
    </div>
  );
}
