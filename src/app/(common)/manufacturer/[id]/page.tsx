import ProductCard from "@/components/product-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  getManufacturerById,
  getManufacturerMedicinsById,
} from "@/services/Manufacturers";
import React from "react";

const Manufacturer = async ({ params }: any) => {
  const { id } = await params;
  const res = await getManufacturerById(id);
  const response = await getManufacturerMedicinsById(id);
  const manufacturer = res?.data;
  const medicins = response?.data;

  return (
    <div className="py-2 md:py-8 px-2 md:px-4 min-h-screen">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6">
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
      <div className="mt-8">
        <h2 className="flex justify-center text-xl md:text-2xl font-bold mb-5">
          All Related Medicines
        </h2>

        {medicins?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {medicins?.map((medicine: any) => (
              <ProductCard key={medicine._id} product={medicine} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Manufacturer;
