import NameCard from "@/components/helper/NameCard";
import Session from "@/components/helper/Session";
import Products from "@/components/ProductsData";

export default function DashboardPage() {

  return (
    <>
      <Session /> {/* Ensures user session is checked before rendering */}
      <div className="flex flex-col items-center min-h-screen py-4">
        <NameCard />
        <div className="my-4 w-full max-w-2xl">
          <Products/>
        </div>
      </div>
    </>
  );
}
