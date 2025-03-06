"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createCategory = async (data: any) => {
  try {
  
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies())?.get("accessToken")!.value,
      },

      body: JSON.stringify(data),
    });
    revalidateTag("Category");

    return res.json();
  } catch (error: any) {
    return new Error(error.message || "Unknown error");
  }
};
export const getAllCategory = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/category`, {
      next: {
        tags: ["Category"],
      },
    });

    return res.json();
  } catch (error: any) {
    return new Error(error.message || "Unknown error");
  }
};
export const deleteCategory = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/category/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies())?.get("accessToken")!.value,
        },
      }
    );
    revalidateTag("Category");
    return res.json();
  } catch (error: any) {
    return new Error(error.message || "Unknown error");
  }
};
export const updateCategory = async (id: string, values: any) => {
    
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/category/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies())?.get("accessToken")!.value,
        },
        body: JSON.stringify(values)
      }
    );
    revalidateTag("Category");
    return res.json();
  } catch (error: any) {
    return new Error(error.message || "Unknown error");
  }
};
export const getCategoryById = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/category/${id}`,
      {
        next: {
          tags: ["Category"],
        },
      }
    );
    revalidateTag("Category");
    return res.json();
  } catch (error: any) {
    return new Error(error.message || "Unknown error");
  }
};
