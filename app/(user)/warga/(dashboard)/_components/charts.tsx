"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Tooltip,
} from "recharts";
import React from "react";

export function BarChartSurat({
  data,
}: {
  data: { name: string; total: number }[];
}) {
  return (
    <ResponsiveContainer
      width="100%"
      height={350}
    >
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
        />
        <Bar
          dataKey="total"
          fill="#BD9CF6"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function PieChartSurat({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  return (
    <ResponsiveContainer
      width="100%"
      height={350}
    >
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <PieChart
          width={400}
          height={400}
        >
          <Pie
            dataKey="value"
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#9661F1"
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </ResponsiveContainer>
  );
}
