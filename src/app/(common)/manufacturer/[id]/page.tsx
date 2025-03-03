import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getManufacturerById } from "@/services/Manufacturers";
import React from "react";

const Manufacturer = async ({ params }: any) => {
  const { id } = await params;
  const res = await getManufacturerById(id);
  const manufacturer = res?.data

  return (
    <div className="container mx-auto py-2 md:py-8 px-2 md:px-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Available Medicines
      </h1>
      <Separator className="mb-6" />

        <Card
          key={manufacturer._id}
          className="bg-white dark:bg-zinc-900 shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              {manufacturer.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300">
              {manufacturer.description}
            </p>
          </CardContent>
        </Card>
    </div>
  );
};

export default Manufacturer;
