"use server";

import axios from "axios";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createMedicine = async (data: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/medicine`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies())?.get("accessToken")!.value,
      },

      body: JSON.stringify(data),
    });
    revalidateTag("medicine");

    return res.json();
  } catch (error: any) {
    return new Error(error.message || "Unknown error");
  }
};

export const getAllMedicine = async (params: Record<string, unknown>) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/medicine`,
      {
        params: {
          ...params,
          searchTerm: params.searchTerm || undefined,
          category: params.category || undefined,
          minPrice: params.minPrice || undefined,
          maxPrice: params.maxPrice || undefined,
          prescription: params.prescription || undefined,
          availability: params.availability || undefined,
          sort: params.sort || undefined,
          page: params.page || 1,
          limit: params.limit || 10,
        },
      }
    );
    

    return response.data;
  } catch (error: any) {
    return new Error(error.message || "Unknown error");
  }
};
export const deleteMedicine = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/medicine/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies())?.get("accessToken")!.value,
        },
      }
    );

    revalidateTag("medicine");
    return res.json();
  } catch (error: any) {
    return new Error(error.message || "Unknown error");
  }
};
export const updateMedicine = async (id: string, values: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/medicine/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies())?.get("accessToken")!.value,
        },
        body: JSON.stringify(values),
      }
    );
    revalidateTag("medicine");
    return res.json();
  } catch (error: any) {
    return new Error(error.message || "Unknown error");
  }
};
export const getMedicineById = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/medicine/${id}`,
      {
        next: {
          tags: ["medicine"],
        },
      }
    );

    return res.json();
  } catch (error: any) {
    return new Error(error.message || "Unknown error");
  }
};
