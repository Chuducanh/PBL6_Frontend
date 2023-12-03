"use client";
import LinkButton from "@components/Buttons/LinkButton";
import Card from "@components/Card/Card";
import OverlayContainer from "@components/OverlayContainer/OverlayContainer";
import SliderCarousel from "@components/Slider/SliderComponent";
import {
  getProductListSuccess,
  productSelector,
} from "@redux/reducers/product.reducer";
import { ProductApi } from "@services/api/product.api";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const { categoryList } = useSelector(productSelector);
  const dispatch = useDispatch();
  const handelGetAll = useCallback(async () => {
    try {
      const res = await Promise.all([
        ProductApi.getListProduct(),
        ProductApi.getCategories(),
      ]);
      dispatch(
        getProductListSuccess({
          products: res[0]?.data,
          categories: res[1]?.data,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    handelGetAll();
  }, []);

  console.log(categoryList);

  console.log(categoryList.map((item) => item.IDProduct[0]?.pictureLinks[0]));

  return (
    <>
      <section className="w-full flex-center flex-col rounded-2xl overflow-hidden mt-32">
        <SliderCarousel autoSlide autoSlideInterval={1500} />
      </section>
      <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
          {/* Đồ án PBL6 */}Sunny Watch
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

      <section className="w-full h-auto py-10">
        <p className="text-lg mb-5 font-bold underline">
          Chọn loại đồng hồ phù hợp
        </p>
        <div className="app-max-width app-x-padding h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {categoryList.map((item, idx) => (
            <div key={idx} className="w-full">
              <OverlayContainer imgSrc="/assets/images/logo_home.svg">
                <LinkButton href="" extraClass="absolute bottom-2 z-20">
                  {item.CategoryName}
                </LinkButton>
              </OverlayContainer>
            </div>
          ))}
        </div>
      </section>

      <section className="app-max-width w-full h-full flex flex-col justify-center mt-16 mb-20">
        <p className="text-lg mb-5 font-bold underline">Bán chạy nhất</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 lg:gap-x-12 gap-y-6 mb-10 app-x-padding">
          <Card />
        </div>
      </section>
    </>
  );
};

export default Home;
