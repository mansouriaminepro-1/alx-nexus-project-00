import React from 'react';
import { CheckIcon, XIcon, ArrowRightIcon, ShareIcon } from '../ui/icons';

interface VoteConfirmationPopupProps {
    isOpen: boolean;
    onClose: () => void;
    itemName: string;
    pollId: string;
    onShare: () => void;
}

const VoteConfirmationPopup: React.FC<VoteConfirmationPopupProps> = ({
    isOpen,
    onClose,
    itemName,
    pollId,
    onShare
}) => {
    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Popup */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md px-4 animate-in zoom-in-95 duration-300">
                <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden relative">

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors z-10"
                    >
                        <XIcon className="w-5 h-5 text-gray-600" />
                    </button>

                    {/* Content */}
                    <div className="p-10 text-center">

                        {/* Success Icon */}
                        <div className="mb-6 flex justify-center">
                            <div className="w-24 h-24 rounded-full bg-brand-yellow flex items-center justify-center animate-bounce shadow-xl">
                                <CheckIcon className="w-12 h-12 text-brand-black" />
                            </div>
                        </div>

                        {/* Message */}
                        <h2 className="text-3xl font-extrabold text-brand-black mb-3">
                            Vote Confirmed!
                        </h2>
                        <p className="text-lg text-gray-600 mb-2">
                            You voted for
                        </p>
                        <p className="text-2xl font-bold text-brand-black mb-8">
                            {itemName}
                        </p>

                        {/* Actions */}
                        <div className="space-y-3">
                            <a
                                href={`/poll/${pollId}/results`}
                                className="w-full bg-brand-black text-white py-4 px-6 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-brand-yellow hover:text-brand-black transition-all shadow-lg flex items-center justify-center gap-2"
                            >
                                View Live Results
                                <ArrowRightIcon className="w-5 h-5" />
                            </a>

                            <button
                                onClick={onShare}
                                className="w-full bg-brand-yellow text-brand-black py-4 px-6 rounded-full font-bold text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-lg flex items-center justify-center gap-2"
                            >
                                Share This Battle
                                <ShareIcon className="w-5 h-5" />
                            </button>
                        </div>

                        <p className="mt-6 text-xs text-gray-400 font-medium">
                            Your vote is anonymous and counts in real-time
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VoteConfirmationPopup;
