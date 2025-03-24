"use client"

import { useTheme } from "next-themes"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Pain Relief",
    inStock: 120,
    lowStock: 15,
    outOfStock: 3,
  },
  {
    name: "Vitamins",
    inStock: 85,
    lowStock: 8,
    outOfStock: 0,
  },
  {
    name: "Devices",
    inStock: 45,
    lowStock: 12,
    outOfStock: 4,
  },
  {
    name: "Allergy",
    inStock: 65,
    lowStock: 5,
    outOfStock: 0,
  },
  {
    name: "Cold & Flu",
    inStock: 75,
    lowStock: 10,
    outOfStock: 2,
  },
]

export function InventoryChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 0, bottom: 5, left: 0 }}>
        <XAxis dataKey="name" stroke={isDark ? "#888888" : "#888888"} fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke={isDark ? "#888888" : "#888888"} fontSize={12} tickLine={false} axisLine={false} />
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
          formatter={(value) => [value, "Products"]}
          labelStyle={{
            color: isDark ? "#9ca3af" : "#6b7280",
          }}
        />
        <Bar dataKey="inStock" stackId="a" fill="#16a34a" radius={[4, 4, 0, 0]} />
        <Bar dataKey="lowStock" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
        <Bar dataKey="outOfStock" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

