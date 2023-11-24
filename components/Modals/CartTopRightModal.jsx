import { Dialog, Transition } from "@headlessui/react";
import { TrashIcon, XCircleIcon } from "@heroicons/react/24/outline";
import {
  addToCart,
  cartSelector,
  decreaseQuantityProduct,
  deleteCartItem,
} from "@redux/reducers";
import { closeCartSideBar, modalSelector } from "@redux/reducers/modal.reducer";
import arrayToSTring from "@utils/arrayToString";
import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CartSidebar.module.scss";
export default function Sidebar() {
  const { items } = useSelector(cartSelector);

  const { openCartModal, open: openModal } = useSelector(modalSelector);
  const router = useRouter();
  const dispatch = useDispatch();

  const cancelButtonRef = useRef(null);
  const onCloseModal = () => {
    dispatch(closeCartSideBar());
  };
  const onClickAddQuantityProduct = (item) => {
    if (item.quantityInCart < item.quantity) {
      dispatch(addToCart(item));
    }
  };

  const onClickDecreaseQuantityProduct = (item) => {
    if (item.quantityInCart == 1) {
      dispatch(deleteCartItem(item));
    } else {
      dispatch(decreaseQuantityProduct(item));
    }
  };
  return (
    <Transition.Root show={openCartModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={onCloseModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="h-full fixed top-0 right-0 h-full overflow-hidden bg-white text-left shadow-xl sm:w-full sm:max-w-lg">
              <div
                className={classNames(
                  "bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 flex flex-col justify-between h-full"
                )}
              >
                <XCircleIcon
                  onClick={() => {
                    onCloseModal();
                  }}
                  className="absolute  h-9 w-9 right-5 top-5 object-cover cursor-pointer transition-transform transform hover:scale-110 ease-out duration-500  "
                />
                <div className={styles.cartContainer}>
                  <span className={styles["text-wrapper"]}>Cart</span>
                  <div
                    className="flex flex-col mt-8 gap-8 overflow-y-scroll"
                    style={{
                      maxHeight: "410px",
                    }}
                  >
                    {items?.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div>
                          <Image
                            src="/assets/images/watch1.jpg"
                            width={75}
                            height={25}
                            alt=""
                          />
                        </div>
                        <div className="flex-1 flex justify-between">
                          <div className="flex flex-col justify-between">
                            <p className="text-sm font-medium leading-none">
                              {item?.nameProduct}
                            </p>
                            <div>
                              <p className="m-0 text-gray-400 text-sm">
                                Color: {arrayToSTring(item?.color)}
                              </p>
                              <p className="text-gray-400 text-sm mb-4">
                                size: {arrayToSTring(item?.size)}
                              </p>
                              <div className="custom-number-input h-8  w-32">
                                <div className="flex flex-row w-full h-full rounded-lg relative bg-transparent mt-1 border-solid border-2 border-neutral-500">
                                  <button
                                    data-action="decrement"
                                    className=" text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                                    onClick={() =>
                                      onClickDecreaseQuantityProduct(item)
                                    }
                                  >
                                    <span className="m-auto text-2xl font-thin leading-none">
                                      −
                                    </span>
                                  </button>

                                  <input
                                    type="text"
                                    className="outline-none focus:outline-none text-center w-full font-semibold text-md hover:text-black focus:text-black  md:text-base cursor-default flex items-center text-gray-700  outline-none"
                                    name="custom-input-number"
                                    value={item?.quantityInCart}
                                  ></input>
                                  <button
                                    data-action="increment"
                                    className="text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                                    onClick={() =>
                                      onClickAddQuantityProduct(item)
                                    }
                                  >
                                    <span className="m-auto text-2xl font-thin leading-none">
                                      +
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col justify-between items-end	 pr-2.5">
                            <p className="text-sm font-medium  leading-none">
                              {item.price}
                            </p>
                            <div className="border-2 p-1 h-8 w-8">
                              <TrashIcon
                                onClick={() => {
                                  dispatch(deleteCartItem(item));
                                }}
                                className=" object-cover cursor-pointer transition-transform transform hover:scale-110 duration-5 hover:fill-red-500"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => {
                    router.push("/cart", { scroll: true });
                    dispatch(closeCartSideBar());
                  }}
                  type="submit"
                  className="w-full font-medium underline border-slate-950 border-2	 hover:text-white my-2 hover:bg-[#141718] hover:-translate-y-1 hover:scale-110 rounded-md py-3 px-10 text-center cursor-pointer transition ease-out duration-500"
                >
                  View Cart
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
