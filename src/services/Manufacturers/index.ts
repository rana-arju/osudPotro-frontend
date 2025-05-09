"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createManufacturer = async (data: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/manufacturer`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies())?.get("accessToken")!.value,
        },

        body: JSON.stringify(data),
      }
    );
    revalidateTag("Manufacturer");

    return res.json();
  } catch (error: any) {
    return new Error(error.message || "Unknown error");
  }
};
export const getAllManufacturer = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/manufacturer`,
      {
        next: {
          tags: ["Manufacturer"],
        },
      }
    );

    return res.json();
  } catch (error: any) {
    return new Error(error.message || "Unknown error");
  }
};
export const deleteManufacturer = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/manufacturer/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies())?.get("accessToken")!.value,
        },
      }
    );

    revalidateTag("Manufacturer");
    return res.json();
  } catch (error: any) {
    return new Error(error.message || "Unknown error");
  }
};
export const updateManufacturer = async (values: any, id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/manufacturer/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies())?.get("accessToken")!.value,
        },
        body: JSON.stringify(values),
      }
    );
    revalidateTag("Manufacturer");
    return res.json();
  } catch (error: any) {
    return new Error(error.message || "Unknown error");
  }
};
export const getManufacturerById = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/manufacturer/${id}`,
      {
        next: {
          tags: ["Manufacturer"],
        },
      }
    );
    return res.json();
  } catch (error: any) {
    return new Error(error.message || "Unknown error");
  }
};
export const getManufacturerMedicinsById = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/manufacturer/medicines/${id}`,
      {
        next: {
          tags: ["Manufacturer"],
        },
      }
    );
    return res.json();
  } catch (error: any) {
    return new Error(error.message || "Unknown error");
  }
};
