"use client"

import { useTheme } from "next-themes"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    revenue: 4000,
    expenses: 2400,
  },
  {
    name: "Feb",
    revenue: 3000,
    expenses: 1398,
  },
  {
    name: "Mar",
    revenue: 9800,
    expenses: 2000,
  },
  {
    name: "Apr",
    revenue: 3908,
    expenses: 2780,
  },
  {
    name: "May",
    revenue: 4800,
    expenses: 1890,
  },
  {
    name: "Jun",
    revenue: 3800,
    expenses: 2390,
  },
  {
    name: "Jul",
    revenue: 5000,
    expenses: 3490,
  },
  {
    name: "Aug",
    revenue: 7000,
    expenses: 3490,
  },
  {
    name: "Sep",
    revenue: 6000,
    expenses: 2490,
  },
  {
    name: "Oct",
    revenue: 8000,
    expenses: 3490,
  },
  {
    name: "Nov",
    revenue: 7000,
    expenses: 3490,
  },
  {
    name: "Dec",
    revenue: 9800,
    expenses: 4000,
  },
]

export function RevenueChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <XAxis dataKey="name" stroke={isDark ? "#888888" : "#888888"} fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke={isDark ? "#888888" : "#888888"}
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            borderColor: isDark ? "#374151" : "#e5e7eb",
            borderRadius: "0.375rem",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          }}
          itemStyle={{
            color: isDark ? "#e5e7eb" : "#374151",
          }}
          formatter={(value) => [`$${value}`, undefined]}
          labelStyle={{
            color: isDark ? "#9ca3af" : "#6b7280",
          }}
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#0ea5e9"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6, strokeWidth: 0 }}
        />
        <Line
          type="monotone"
          dataKey="expenses"
          stroke="#94a3b8"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6, strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

