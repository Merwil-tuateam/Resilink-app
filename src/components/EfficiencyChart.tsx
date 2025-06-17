import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EfficiencyChart: React.FC = () => {
  const data = [
    { day: 'Lun', efficiency: 82, routes: 12 },
    { day: 'Mar', efficiency: 85, routes: 14 },
    { day: 'Mie', efficiency: 78, routes: 11 },
    { day: 'Jue', efficiency: 88, routes: 15 },
    { day: 'Vie', efficiency: 92, routes: 16 },
    { day: 'Sab', efficiency: 86, routes: 13 },
    { day: 'Dom', efficiency: 79, routes: 10 }
  ];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis 
            dataKey="day" 
            stroke="#64748b"
            fontSize={12}
          />
          <YAxis 
            stroke="#64748b"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            formatter={(value, name) => [
              `${value}${name === 'efficiency' ? '%' : ''}`,
              name === 'efficiency' ? 'Eficiencia' : 'Rutas'
            ]}
          />
          <Line 
            type="monotone" 
            dataKey="efficiency" 
            stroke="#10b981" 
            strokeWidth={3}
            dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: '#059669' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EfficiencyChart;