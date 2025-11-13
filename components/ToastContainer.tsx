import React from 'react';
import { useToast } from '../ToastContext';
import { CheckCircleIcon, XCircleIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { ToastMessage, ToastType } from '../ToastContext';

const ICONS: Record<ToastType, React.ReactNode> = {
  success: <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />,
  error: <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />,
  info: <InformationCircleIcon className="h-6 w-6 text-blue-400" aria-hidden="true" />,
};

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div
      aria-live="assertive"
      className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-50"
    >
      <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="max-w-sm w-full bg-gray-800 shadow-lg rounded-lg pointer-events-auto ring-1 ring-white/10 overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">{ICONS[toast.type]}</div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-gray-100">{toast.message}</p>
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                  <button
                    type="button"
                    className="bg-gray-800 rounded-md inline-flex text-gray-400 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                    onClick={() => {
                      removeToast(toast.id);
                    }}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToastContainer;
