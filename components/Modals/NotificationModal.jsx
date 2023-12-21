import { CONSTANTS } from "@constants/status";
import { Dialog, Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import {
  closeModal,
  modalSelector,
  resetModal,
} from "@redux/reducers/modal.reducer";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { Fragment, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ModalExample() {
  const { open, message, status, modalID } = useSelector(modalSelector);
  const dispatch = useDispatch();
  const router = useRouter();

  const onAccept = () => {
    if (modalID == CONSTANTS.modalID.NAVIGATE_TO_LOGIN) {
      router.push("/login", { scroll: true });
    } else if (modalID == CONSTANTS.modalID.NAVIGATE_TO_HOMEPAGE) {
      router.push("/", { scroll: true });
    }
    dispatch(closeModal());
  };
  const onResetModal = () => {
    dispatch(resetModal());
  };
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        style={{ zIndex: "1000" }}
        initialFocus={cancelButtonRef}
        onClose={onResetModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      {status === CONSTANTS.status.WARNING ? (
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      ) : (
                        <CheckCircleIcon
                          className="h-6 w-6 text-green-600"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        {status === CONSTANTS.status.WARNING
                          ? "Cảnh báo"
                          : "Xác nhận"}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{message}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className={classNames(
                      "inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto",
                      {
                        "bg-red-600  hover:bg-red-500":
                          status === CONSTANTS.status.WARNING,
                        "bg-green-600  hover:bg-green-500":
                          status !== CONSTANTS.status.WARNING,
                      }
                    )}
                    onClick={onAccept}
                  >
                    {status === CONSTANTS.status.WARNING
                      ? "Xác nhận"
                      : "Đồng ý"}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={onResetModal}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
