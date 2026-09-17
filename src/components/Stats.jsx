import { useEffect, useRef, useState } from 'react';
import { Zap, Users, Award, TrendingUp } from 'lucide-react';
import './Stats.css';

const STATS = [
  { icon: <Award size={28} />, value: 15, suffix: '+', label: 'Years of Experience', color: '#FF6B1A' },
  { icon: <Zap size={28} />, value: 10000, suffix: '+', label: 'Projects Completed', color: '#FFB800' },
  { icon: <Users size={28} />, value: 78000, suffix: '', label: 'Max Subsidy (₹)', color: '#22c55e', prefix: '₹' },
  { icon: <TrendingUp size={28} />, value: 100, suffix: '%', label: 'Customer Satisfaction', color: '#3b82f6' },
];

function useCountUp(target, duration = 2000, started = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);

  return count;
}

function StatCard({ stat, started }) {
  const count = useCountUp(stat.value, 2000, started);

  const formatValue = (v) => {
    if (v >= 1000) {
      return v.toLocaleString('en-IN');
    }
    return v;
  };

  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ color: stat.color, borderColor: `${stat.color}30`, background: `${stat.color}12` }}>
        {stat.icon}
      </div>
      <div className="stat-value">
        {stat.prefix && <span className="stat-prefix">{stat.prefix}</span>}
        {formatValue(count)}{stat.suffix}
      </div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
}

export default function Stats() {
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats-section" ref={ref}>
      <div className="stats-bg" />
      <div className="container">
        <div className="stats-grid">
          {STATS.map((stat) => (
            <StatCard key={stat.label} stat={stat} started={started} />
          ))}
        </div>
      </div>
    </section>
  );
}
