"use server";

import { jwtDecode } from "jwt-decode";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/registration`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    const result = await res.json();
    const storeCokies = await cookies();
    if (result.success) {
      storeCokies.set("accessToken", result.data.accessToken);
      storeCokies.set("refreshToken", result.data.refreshToken);
    }
    revalidateTag("auth");

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    const result = await res.json();
    const storeCokies = await cookies();
    if (result.success) {
      storeCokies.set("accessToken", result.data.accessToken);
      storeCokies.set("refreshToken", result.data.refreshToken);
    }
    revalidateTag("auth");

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const updateProfile = async (userData: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/profile`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies())?.get("accessToken")!.value,
        },
        body: JSON.stringify(userData),
      }
    );

    revalidateTag("auth");

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
export const deleteUser = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/user/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies())?.get("accessToken")!.value,
        },
      }
    );

    revalidateTag("auth");

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
export const updateRole = async (id: string, role: string) => {
  console.log("servoce", role);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/role/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies())?.get("accessToken")!.value,
        },
        body: JSON.stringify({ role }),
      }
    );

    revalidateTag("auth");

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
export const updateStatus = async (id: string, status: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/status/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies())?.get("accessToken")!.value,
        },
        body: JSON.stringify({ status }),
      }
    );

    revalidateTag("auth");

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  let decodedData = null;
  if (accessToken) {
    decodedData = await jwtDecode(accessToken as any);
    return decodedData;
  } else {
    return null;
  }
};

export const logout = async () => {
  (await cookies()).delete("accessToken");
};
export const getNewToken = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies())?.get("refreshToken")!.value,
        },
      }
    );
    revalidateTag("auth");

    return res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getMe = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies())?.get("accessToken")!.value,
      },
    });

    return res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getUserOrders = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/user/${id}/orders`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies())?.get("accessToken")!.value,
        },
      }
    );

    return res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getAllUsers = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/users`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies())?.get("accessToken")!.value,
        },
      }
    );

    return res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};
