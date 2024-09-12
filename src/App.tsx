import { useState } from "react";
import "./App.css";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetGoodsQuery,
} from "./store";

function App() {
  const [count, setCount] = useState("");
  const [newProduct, setNewProduct] = useState("");
  const { data, isLoading } = useGetGoodsQuery(count);
  const [addProduct, { isError }] = useAddProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const handleAddProduct = async () => {
    if (newProduct) {
      await addProduct({ name: newProduct }).unwrap();
      setNewProduct("");
    }
  };

  const handleRemoveProduct = async (id) => {
    deleteProduct(id).unwrap();
  };

  if (isLoading) return <h1>Loading...</h1>;
  return (
    <>
      <div>
        <input
          value={newProduct}
          type="text"
          onChange={(e) => {
            setNewProduct(e.target.value);
          }}
        />
        <button onClick={handleAddProduct}>Add product</button>
      </div>
      <div>
        <select value={count} onChange={(e) => setCount(e.target.value)}>
          <option value="''">All</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.name}{" "}
            <span onClick={() => handleRemoveProduct(item.id)}>Remove</span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
