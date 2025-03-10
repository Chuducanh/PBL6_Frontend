"use client";
import Benefits from "@components/Benefits/page";
import LinkButton from "@components/Buttons/LinkButton";
import Card from "@components/Card/Card";
import OverlayContainer from "@components/OverlayContainer/OverlayContainer";
import SliderCarousel from "@components/Slider/SliderComponent";
import SupplierCard from "@components/SupplierCard/SupplierCard";
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
  return (
    <>
      <section className="w-full flex-center flex-col rounded-2xl overflow-hidden mt-32">
        <SliderCarousel autoSlide autoSlideInterval={4500} />
      </section>
      <section className="w-full flex-center flex-col mt-[70px]">
        <h1 className="head_text text-center">
          WATCH WORLD
          <br className="max-md:hidden" />
          <span className="orange_gradient text-center font-semibold">
            {" "}
            Website bán đồng hồ
          </span>
        </h1>
        <p className="text-center font-semibold mt-5 text-lg text-gray-600 sm:text-xl max-w-2xl">
          Website bán đồng hồ là trang web bán đồng hồ đến từ Châu Âu, uy tín
          hàng đầu Việt Nam, mua bán sỉ lẻ các loại đồng hồ.
        </p>
      </section>

      <section className="w-full h-[700px] mt-[100px]">
        <div
          className="flex space-between"
          style={{ justifyContent: "space-between" }}
        >
          <p className="text-3xl font-bold mb-[20px] py-1">
            TẠO NÊN ĐẲNG CẤP CỦA BẠN
          </p>
          <div className="pt-[10px]">
            <a
              href="/products/all"
              className="hover:decoration-solid hover:underline"
            >
              Tìm hiểu thêm <span>&#8594;</span>
            </a>
          </div>
        </div>

        <div className="w-full h-full flex">
          <div className="w-1/2 h-full mr-2">
            <OverlayContainer imgSrc="/assets/images/men.jpg">
              <LinkButton
                href="/products/Luxury Watches"
                extraClass="absolute bottom-2 z-20"
              >
                Đồng hồ cao cấp
              </LinkButton>
            </OverlayContainer>
          </div>
          <div className="w-1/2 h-full">
            <div className="w-full mb-3" style={{ height: "49%" }}>
              <OverlayContainer imgSrc="/assets/images/slide3.jpg">
                <LinkButton
                  href="/products/Men's Watches"
                  extraClass="absolute bottom-2 z-20"
                >
                  Đồng hồ nam
                </LinkButton>
              </OverlayContainer>
            </div>
            <div className="w-full mt-2" style={{ height: "49.5%" }}>
              <OverlayContainer imgSrc="/assets/images/womenWatch.jpeg">
                <LinkButton
                  href="/products/Women's Watches"
                  extraClass="absolute bottom-2 z-20"
                >
                  Đồng hồ nữ
                </LinkButton>
              </OverlayContainer>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full flex-center flex-col mt-[150px]">
        <h1 className="text-center font-semibold text-5xl">
          Trang web mang đến sự đa dạng với nhiều lựa chọn đồng hồ độc đáo.
          <br className="max-md:hidden" />
          <span className="orange_gradient text-center"> - WATCH WORLD -</span>
        </h1>
      </section>

      <section className="w-full mt-[100px]">
        <video width="100%" height="360" autoPlay>
          <source src="assets/images/video_watches.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

      <section className="app-max-width w-full h-full flex flex-col justify-center mt-[150px]">
        <div className="flex mb-5" style={{ justifyContent: "space-between" }}>
          <p className="text-2xl mb-5 font-bold underline">Bán chạy nhất</p>
          <a
            href="/products/all"
            className="hover:decoration-solid hover:underline"
          >
            Tất cả sản phẩm <span>&#8594;</span>
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 lg:gap-x-12 gap-y-6 mb-10 app-x-padding">
          <Card />
        </div>
      </section>

      <section className="w-full flex-center flex-col mt-[70px]">
        <h1 className="text-4xl py-2 font-bold text-center">
          Không chỉ đẹp mắt đó còn là phong cách cá nhân.
          <br className="max-md:hidden" />
        </h1>
      </section>

      <section className="w-full h-[350px] mt-[100px] mb-[100px]">
        <div className="flex mb-5" style={{ justifyContent: "space-between" }}>
          <p className="text-2xl mb-5 font-bold underline">Các nhà cung cấp</p>
          <a
            href="/suppliers"
            className="hover:decoration-solid hover:underline"
          >
            Tìm hiểu thêm <span>&#8594;</span>
          </a>
        </div>
        <SupplierCard />
      </section>

      <Benefits />
    </>
  );
};

export default Home;
