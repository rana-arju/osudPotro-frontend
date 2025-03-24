"use client"

import { useTheme } from "next-themes"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Delivered", value: 540, color: "#16a34a" },
  { name: "Processing", value: 320, color: "#0ea5e9" },
  { name: "Shipped", value: 210, color: "#8b5cf6" },
  { name: "Pending", value: 120, color: "#f59e0b" },
  { name: "Cancelled", value: 44, color: "#ef4444" },
]

export function OrderStatusChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className="flex h-[300px] items-center justify-center">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
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
            formatter={(value) => [value, "Orders"]}
            labelStyle={{
              color: isDark ? "#9ca3af" : "#6b7280",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

