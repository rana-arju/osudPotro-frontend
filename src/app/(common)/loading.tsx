import MedicineLoader from "@/components/loader";

export default function Loading() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <MedicineLoader />
    </div>
  );
}