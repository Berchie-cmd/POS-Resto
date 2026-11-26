export function ConfirmDialog({ open, title, message, confirmLabel = "Confirm", onCancel, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#101411]/40 p-4 backdrop-blur-[2px]" role="presentation">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        className="w-full max-w-sm rounded-lg border border-[#BFC9BF] bg-white p-5 shadow-xl dark:border-[#3F4942] dark:bg-[#181D19]"
      >
        <h2 id="confirm-dialog-title" className="text-lg font-semibold text-[#181D19] dark:text-[#E0E3DE]">
          {title}
        </h2>
        <p className="mt-2 text-sm text-[#496552] dark:text-[#AFCEB7]">
          {message}
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="min-h-10 rounded-lg border border-[#BFC9BF] px-4 text-sm font-semibold text-[#181D19] hover:bg-[#E6E9E3] dark:border-[#3F4942] dark:text-[#E0E3DE] dark:hover:bg-[#272B27]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="min-h-10 rounded-lg bg-[#BA1A1A] px-4 text-sm font-semibold text-white hover:bg-[#93000A] dark:bg-[#FFB4AB] dark:text-[#690005]"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
