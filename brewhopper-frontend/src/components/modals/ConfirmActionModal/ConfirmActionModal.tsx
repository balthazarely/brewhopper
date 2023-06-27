import { HiX } from "react-icons/hi";

export function ConfirmActionModal({
  confrimActionModalOpen,
  setConfrimActionModalOpen,
  onFireFunction,
  message,
  confirmText,
  loading,
}: any) {
  return (
    <div>
      <input
        type="checkbox"
        checked={confrimActionModalOpen}
        id="my-modal-6"
        className="modal-toggle relative"
        readOnly
      />
      <div className="modal">
        <div className="modal-box relative">
          <button
            className="absolute top-2 right-2 btn btn-sm btn-ghost"
            onClick={() => setConfrimActionModalOpen(false)}
          >
            <HiX />
          </button>
          <div className="flex justify-center text-center">
            <h3 className="font-bold text-lg"> {message}</h3>
          </div>

          <div className="modal-action justify-center">
            <button
              className={`btn-primary btn px-2  `}
              onClick={onFireFunction}
            >
              {loading && <span className="loading loading-spinner"></span>}
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
