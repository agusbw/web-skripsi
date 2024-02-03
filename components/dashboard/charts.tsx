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
import Image from "next/image";
import React from "react";

export function BarChartSurat({
  data,
}: {
  data: { name: string; total: number }[];
}) {
  let isAllZero = true;
  data.forEach((item) => {
    if (item.total !== 0) {
      isAllZero = false;
    }
  });

  if (isAllZero) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Image
          alt="no data"
          width={100}
          height={100}
          src={"/no-data.svg"}
          className="lg:mt-10"
        />
        <div className="text-muted-foreground text-center text-sm mt-4 px-10">
          Belum ada data untuk ditampilkan
        </div>
      </div>
    );
  }

  return (
    <ResponsiveContainer
      width="100%"
      height={350}
      className={"-ml-10"}
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
  let isAllZero = true;
  data.forEach((item) => {
    if (item.value !== 0) {
      isAllZero = false;
    }
  });

  if (isAllZero) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Image
          alt="no data"
          width={100}
          height={100}
          src={"/no-data.svg"}
          className="lg:mt-10"
        />
        <div className="text-muted-foreground text-center text-sm mt-4 px-10">
          Belum ada data untuk ditampilkan
        </div>
      </div>
    );
  }

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
