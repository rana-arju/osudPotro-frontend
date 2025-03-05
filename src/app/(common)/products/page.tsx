import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import ProductCard from "@/components/product-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllMedicine } from "@/services/medicine";
import { IProduct } from "@/types/Product";

export default async function ProductsPage() {

const productsData = await getAllMedicine();
const products = productsData?.data;

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Filters sidebar */}
      <div className="w-full md:w-64 shrink-0 space-y-6">
        <div>
          <h3 className="font-medium mb-2">Categories</h3>
          <div className="space-y-2">
            {[
              "Pain Relief",
              "Vitamins & Supplements",
              "First Aid",
              "Medical Devices",
              "Allergy",
            ].map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox id={`category-${category}`} />
                <Label htmlFor={`category-${category}`}>{category}</Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-medium mb-2">Price Range</h3>
          <Slider defaultValue={[0, 100]} max={100} step={1} className="my-6" />
          <div className="flex items-center space-x-2">
            <Input type="number" placeholder="Min" className="h-8" />
            <span>-</span>
            <Input type="number" placeholder="Max" className="h-8" />
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-medium mb-2">Rating</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox id={`rating-${rating}`} />
                <Label
                  htmlFor={`rating-${rating}`}
                >{`${rating} Stars & Above`}</Label>
              </div>
            ))}
          </div>
        </div>

        <Button className="w-full">Apply Filters</Button>
      </div>

      {/* Products grid */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">All Products</h1>
          <Select defaultValue="featured">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="newest">Newest Arrivals</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {products?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products?.map((product: IProduct) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="flex flex-col justify-center items-center text-xl capitalize font-bold text-primary">
            There are no Medicine
          </p>
        )}
      </div>
    </div>
  );
}
