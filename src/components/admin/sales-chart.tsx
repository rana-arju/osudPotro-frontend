"use client"

import { useTheme } from "next-themes"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    date: "2023-01-01",
    sales: 4000,
    orders: 240,
  },
  {
    date: "2023-02-01",
    sales: 3000,
    orders: 198,
  },
  {
    date: "2023-03-01",
    sales: 9800,
    orders: 320,
  },
  {
    date: "2023-04-01",
    sales: 3908,
    orders: 278,
  },
  {
    date: "2023-05-01",
    sales: 4800,
    orders: 189,
  },
  {
    date: "2023-06-01",
    sales: 3800,
    orders: 239,
  },
  {
    date: "2023-07-01",
    sales: 5000,
    orders: 349,
  },
  {
    date: "2023-08-01",
    sales: 7000,
    orders: 449,
  },
  {
    date: "2023-09-01",
    sales: 6000,
    orders: 389,
  },
  {
    date: "2023-10-01",
    sales: 8000,
    orders: 489,
  },
  {
    date: "2023-11-01",
    sales: 7000,
    orders: 429,
  },
  {
    date: "2023-12-01",
    sales: 9800,
    orders: 590,
  },
]

export function SalesChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
        <XAxis dataKey="date" stroke={isDark ? "#888888" : "#888888"} fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke={isDark ? "#888888" : "#888888"}
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
          yAxisId="left"
        />
        <YAxis
          stroke={isDark ? "#888888" : "#888888"}
          fontSize={12}
          tickLine={false}
          axisLine={false}
          orientation="right"
          yAxisId="right"
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
          formatter={(value, name) => [name === "sales" ? `$${value}` : value, name === "sales" ? "Sales" : "Orders"]}
          labelStyle={{
            color: isDark ? "#9ca3af" : "#6b7280",
          }}
        />
        <Area type="monotone" dataKey="sales" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorSales)" yAxisId="left" />
        <Area
          type="monotone"
          dataKey="orders"
          stroke="#8b5cf6"
          fillOpacity={1}
          fill="url(#colorOrders)"
          yAxisId="right"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

