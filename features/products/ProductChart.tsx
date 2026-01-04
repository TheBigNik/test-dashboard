'use client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const mockSalesData = [
  { month: 'Jan', sales: 400 },
  { month: 'Feb', sales: 300 },
  { month: 'Mar', sales: 600 },
  { month: 'Apr', sales: 800 },
];

export function ProductChart() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-[300px] w-full bg-card rounded-xl border border-border animate-pulse" />;
  }

  const isDark = resolvedTheme === 'dark';
  const gridColor = isDark ? '#1e293b' : '#e2e8f0'; 
  const textColor = isDark ? '#94a3b8' : '#475569'; // High contrast Slate 600 for light mode

  return (
    <div className="h-[300px] w-full p-6 bg-card rounded-xl border border-border transition-colors duration-300">
      <h3 className="text-lg font-bold mb-6 text-foreground">Monthly Sales Performance</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={mockSalesData}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis 
            dataKey="month" 
            stroke={textColor} 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
            dy={10} 
          />
          <YAxis 
            stroke={textColor} 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip 
            cursor={{ fill: isDark ? '#1e293b' : '#f8fafc' }}
            contentStyle={{ 
              backgroundColor: isDark ? '#0f172a' : '#ffffff', 
              borderColor: gridColor,
              borderRadius: '12px',
              border: '1px solid',
              color: isDark ? '#f8fafc' : '#0f172a',
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
            }} 
            itemStyle={{ color: '#6366f1', fontWeight: 'bold' }}
          />
          <Bar 
            dataKey="sales" 
            fill="#6366f1" 
            radius={[6, 6, 0, 0]} 
            barSize={32}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}