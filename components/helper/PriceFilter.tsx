"use client";
import { useProductContext } from "@/context/ProductContext";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
const PriceFilter = () => {
  const { minPrice, setMinPrice, maxPrice, setMaxPrice } = useProductContext();

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(Number(e.target.value));
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(Number(e.target.value));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-lg">Price Range</label>
        <div className="flex items-center">
          <span className="mr-2">Min: ${minPrice}</span>
          <span className="mr-2">Max: ${maxPrice}</span>
        </div>
      </div>

      {/* Progress bars for min and max price */}
      <div className="flex justify-between space-x-4">
        <div className="w-full">
          <Label className="text-sm">Min Price</Label>
          <Input
            type="range"
            min={0}
            max={1000}
            value={minPrice}
            onChange={handleMinPriceChange}
            className="w-full"
          />
        </div>

        <div className="w-full">
          <Label className="text-sm">Max Price</Label>
          <Input
            type="range"
            min={0}
            max={1000}
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
