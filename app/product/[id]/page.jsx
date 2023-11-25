"use client";

import styles from "@app/product/[id]/page.module.css";
import Loading from "@components/Loading/Loading";
import { addToCart } from "@redux/reducers";
import {
  getProductDetailsSuccess,
  getProductPending,
  productSelector,
} from "@redux/reducers/product.reducer";
import { ProductApi } from "@services/api/product.api";
import arrayToSTring from "@utils/arrayToString";
import { toastSuccess } from "@utils/toastHelper";
import { usePathname } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";

import "@styles/swiper.css";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards, Navigation } from "swiper/modules";

export default function Product() {
  const { productList, productDetailsCurrent, isLoading } =
    useSelector(productSelector);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const paths = pathname.split("/");

  const id = paths[paths.length - 1];
  const getProductDetailPreView = useCallback(async (id) => {
    try {
      dispatch(getProductPending());
      const res = await ProductApi.getReviewProduct(id);
      dispatch(
        getProductDetailsSuccess({
          ...productList?.find((item) => item._id === id),
          review: res?.data,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }, []);
  const addProductToCart = () => {
    dispatch(addToCart(productDetailsCurrent));
    toastSuccess("Thêm 1 sản phẩm vào giỏ hàng thành công");
  };
  useEffect(() => {
    getProductDetailPreView(id);
  }, [id]);
  return (
    <section className="w-full max-w-full flex  mt-32 justify-between	">
      <div className={styles.imageContainer}>
        <>
          <Swiper
            effect={"cards"}
            // loop
            grabCursor={true}
            modules={[EffectCards, Navigation]}
            className="mySwiper"
          >
            {productDetailsCurrent?.pictureLinks?.map((item) => (
              <SwiperSlide key={item?._id}>
                <img
                  className="object-cover h-full w-full"
                  src={item}
                  layout="responsive"
                  alt=""
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      </div>
      {isLoading ? (
        <Loading size={20} />
      ) : (
        <div className={styles.details}>
          <span>Analog</span>
          <div className={styles.nameProduct}>
            {productDetailsCurrent?.nameProduct}
          </div>
          <div className={styles.priceProduct}>
            {productDetailsCurrent?.price} $
          </div>
          <div className={styles.colors}>
            <span>Colors: {arrayToSTring(productDetailsCurrent?.color)}</span>
            <br />
            <span>Size: {arrayToSTring(productDetailsCurrent?.size)}</span>
          </div>
          <div className={styles.description}>
            <span>{productDetailsCurrent?.description}</span>
          </div>
          <button
            onClick={() => addProductToCart()}
            type="button"
            className={styles.addToBasket}
          >
            Thêm vào giỏ hàng
          </button>
          <button type="button" className={styles.favourite}>
            Ưa thích
          </button>
        </div>
      )}
    </section>
  );
}
