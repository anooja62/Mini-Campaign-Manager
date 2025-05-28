export default function ModalWrapper({ isOpen, onClose, children }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-4">
        <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            onClick={onClose}
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    );
  }
  