"use client";

import Card from "@components/Card/Card";
import { getProductByCategorySuccess } from "@redux/reducers/product.reducer";
import { ProductApi } from "@services/api/product.api";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Products = () => {
  const pathname = usePathname();
  const paths = pathname.split("/");
  const dispatch = useDispatch();
  const urlEncoded = paths[paths.length - 1];
  const categoryName = decodeURIComponent(urlEncoded);

  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    router.push(selectedValue);
  };

  const getProductsByCategory = useCallback(async (categoryName) => {
    try {
      const res = await ProductApi.getListProduct();
      if (categoryName === "all") {
        const productCategory1 = res?.data;
        dispatch(getProductByCategorySuccess({ products: productCategory1 }));
      } else {
        const productCategory2 = res?.data.filter((item) =>
          item.IDCategory?.some(
            (category) => category.CategoryName === categoryName
          )
        );
        dispatch(getProductByCategorySuccess({ products: productCategory2 }));
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getProductsByCategory(categoryName);
    console.log(categoryName);
  }, [categoryName]);

  return (
    <>
      <section className="w-full flex-center flex-col mt-[130px] mb-[80px]">
        <h1 className="head_text text-center">
          Sunny Watch
          <br className="max-md:hidden" />
          <span className="orange_gradient text-center">
            {" "}
            Website bán đồng hồ
          </span>
        </h1>
        <p className="desc text-center">
          Website bán đồng hồ là trang web bán đồng hồ đến từ Châu Âu, uy tín
          hàng đầu Việt Nam, mua bán sỉ lẻ các loại đồng hồ.
        </p>
      </section>

      <section className="app-max-width w-full h-full flex flex-col justify-center">
        <div className="flex flex-col items-end">
          <div className="w-[200px] text-gray-700">
            <p>CATEGORIES</p>
          </div>
          <select
            className="w-[200px] bg-white border border-gray-300 text-gray-900 text-md rounded-lg px-4 py-2 mb-[30px] shadow-md"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="" disabled selected>
              Chọn loại đồng hồ
            </option>
            <option value="/products/all">Tất cả</option>
            <option value="/products/Men's Watches">Đồng hồ nam</option>
            <option value="/products/Women's Watches">Đồng hồ nữ</option>
            <option value="/products/Children's Watches">Đồng hồ trẻ em</option>
            <option value="/products/Luxury Watches">Đồng hồ cao cấp</option>
            <option value="/products/Smart Watches">Đồng hồ thông minh</option>
          </select>
        </div>

        <p className="text-2xl mb-5 font-bold underline">
          {categoryName === "all"
            ? `Tất cả loại đồng hồ`
            : categoryName === "Men's Watches"
            ? `Đồng hồ nam`
            : categoryName === "Women's Watches"
            ? `Đồng hồ nữ`
            : categoryName === "Children's Watches"
            ? `Đồng hồ trẻ em`
            : categoryName === "Luxury Watches"
            ? `Đồng hồ cao cấp`
            : categoryName === "Smart Watches"
            ? `Đồng hồ thông minh`
            : ""}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 lg:gap-x-12 gap-y-6 mb-10 app-x-padding">
          <Card />
        </div>
      </section>
    </>
  );
};

export default Products;
