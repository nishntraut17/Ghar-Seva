// Modal.jsx
import { Transition, Dialog } from '@headlessui/react';
import { Fragment } from 'react';
import { Rating } from '@mui/material';

const Modal = ({ isOpen, onClose, onSubmit, rating, review, handleRatingChange, handleReviewChange, selectedOrder }) => {
    if (!selectedOrder) {
        return null;
    }

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 overflow-hidden z-50"
                onClose={onClose}
            >
                <div className="absolute inset-0 overflow-hidden">
                    <Transition.Child
                        as={Fragment}
                        enter="transform transition ease-in-out duration-200 sm:duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transform transition ease-in-out duration-200 sm:duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" />
                    </Transition.Child>

                    <Transition.Child
                        as={Fragment}
                        enter="transform transition ease-in-out duration-200 sm:duration-200"
                        enterFrom="translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="translate-y-0 sm:scale-100"
                        leave="transform transition ease-in-out duration-200 sm:duration-200"
                        leaveFrom="translate-y-0 sm:scale-100"
                        leaveTo="translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <Dialog.Panel className="fixed inset-0 overflow-hidden z-50 flex items-center justify-center">
                            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all">
                                <h2 className="text-lg font-medium text-gray-900 px-6 py-4 bg-gray-100 border-b">Rating & Review for {selectedOrder.product.name}</h2>
                                <div className="p-6 flex flex-col gap-2 items-start justify-start">
                                    <p>Price: {selectedOrder.product.price}</p>
                                    <p>Quantity: {selectedOrder.quantity}</p>

                                    <label>
                                        Rating:
                                        <Rating
                                            size={"medium"}
                                            precision={0.25}
                                            value={rating}
                                            onChange={(e) => handleRatingChange(parseInt(e.target.value))}
                                        />
                                    </label>
                                    <br />
                                    <label>
                                        Review:
                                        <textarea value={review} onChange={(e) => handleReviewChange(e.target.value)}></textarea>
                                    </label>
                                    <br />
                                    <div className='flex gap-2'>
                                        <button onClick={onSubmit} className='border-2 border-slate-300 bg-slate-200 rounded-md'>Submit Rating & Review</button>
                                        <button onClick={onClose} className='border-2 border-slate-300 bg-slate-200 rounded-md'>Close</button>
                                    </div>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default Modal;
