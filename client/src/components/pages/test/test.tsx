import { useState } from "react";

interface Product {
  name: string;
  description: string;
  price: number;
}
export function Test() {
  const [selectedProduct, setSelectedProduct] = useState<Product>(
    {} as Product
  );

  const selectedProductHandler = [] as Product[];

  function handleSelectedProduct() {
    if (!selectedProductHandler.includes(selectedProduct)) {
      selectedProductHandler.push(selectedProduct);
    } else {
      selectedProductHandler.filter(
        (product) => product.name !== selectedProduct.name
      );
    }
  }

  const apiPayload = [
    {
      name: "produto 1",
      description: "descrição do produto 1",
      price: 10.0,
    },
    {
      name: "produto 2",
      description: "descrição do produto 2",
      price: 20.0,
    },
    {
      name: "produto 3",
      description: "descrição do produto 3",
      price: 30.0,
    },
  ];

  console.log(selectedProduct);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      {apiPayload.map((item) => {
        return (
          <div
            style={{
              border: "2px solid red",
              display: "flex",
              flexDirection: "column",
              minHeight: "100px",
              backgroundColor: selectedProductHandler.includes(item)
                ? "green"
                : "white",
            }}
          >
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <span>{item.price}</span>
            <button
              onClick={() => {
                setSelectedProduct(item);
                handleSelectedProduct();
              }}
            >
              Select product
            </button>
          </div>
        );
      })}
    </div>
  );
}
