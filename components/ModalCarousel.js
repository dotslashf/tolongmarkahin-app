/* eslint-disable @next/next/no-img-element */
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function ModalCarousel({
  isOpenModalCarousel,
  setIsOpenModalCarousel,
  media,
}) {
  return (
    <Transition appear show={isOpenModalCarousel} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto bg-gray-600/80"
        onClose={() => {
          setIsOpenModalCarousel(false);
        }}
      >
        <div className="h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block h-auto max-w-xs md:max-w-xl p-4 bg-base-200 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-box">
              <div className="flex items-center space-x-4 h-full justify-center rounded-box">
                <div className="carousel carousel-center space-x-2 h-full rounded-box">
                  {media.map(item => {
                    return (
                      <div
                        className="carousel-item items-center justify-center w-full max-h-96"
                        key={item.media_url_https}
                      >
                        <a
                          href={item.media_url_https}
                          target="_blank"
                          rel="noreferrer"
                          className="h-full"
                        >
                          <img
                            className="h-full object-top object-cover rounded-box"
                            src={item.media_url_https}
                            alt={item.alt_text}
                          />
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
