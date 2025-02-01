import Search from "./helper/Search";
import ProductForm from "./helper/ProductForm";
import ProductList from "./helper/ProductList";
import AddProduct from "./helper/AddProduct";
import PriceFilter from "./helper/PriceFilter";

export default function Products() {
  

  return (
    <div className="space-y-4">
      <Search />
      <PriceFilter />
      <ProductList/>
      <AddProduct/>
      <ProductForm/>
    </div>
  );
}
