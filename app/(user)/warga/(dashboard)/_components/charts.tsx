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

const data01 = [
  { name: "SK Tidak Mampu", value: 400 },
  { name: "SK Domisili", value: 300 },
  { name: "SK Belum Menikah", value: 300 },
  { name: "SK Usaha", value: 200 },
];

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 10),
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 10),
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 10),
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 10),
  },
  {
    name: "Mei",
    total: Math.floor(Math.random() * 10),
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 10),
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 10),
  },
  {
    name: "Agu",
    total: Math.floor(Math.random() * 10),
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 10),
  },
  {
    name: "Okt",
    total: Math.floor(Math.random() * 10),
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 10),
  },
  {
    name: "Des",
    total: Math.floor(Math.random() * 10),
  },
];

export function BarChartSurat() {
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

export function PieChartSurat() {
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
            isAnimationActive={false}
            data={data01}
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
