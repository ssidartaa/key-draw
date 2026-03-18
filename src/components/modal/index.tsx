"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { X } from "lucide-react";

import cn from "@/utils/className";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
}

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  contentClassName,
  closeOnOverlayClick = true,
  showCloseButton = true,
}: IProps) => {
  const isClickingOverlay = useRef(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="z-50 fixed inset-0 flex justify-center items-center bg-black/30 backdrop-blur-[2px]"
      onMouseDown={(e) =>
        (isClickingOverlay.current = e.target === e.currentTarget)
      }
      onMouseUp={(e) => {
        if (
          isClickingOverlay.current &&
          e.target === e.currentTarget &&
          closeOnOverlayClick
        )
          onClose();

        isClickingOverlay.current = false;
      }}
      onMouseLeave={() => (isClickingOverlay.current = false)}
      aria-modal="true"
      role="dialog"
    >
      <div className="flex justify-center items-center mx-auto p-5 container">
        <div
          className={cn(
            "relative bg-background shadow-2xl border border-gray-7 rounded-lg w-full max-w-lg max-h-[90vh] overflow-hidden",
            className ?? "",
          )}
          onClick={(event) => event.stopPropagation()}
        >
          {(title || showCloseButton) && (
            <div className="flex justify-between items-center px-5 py-4 border-gray-7 border-b">
              {title ? (
                <h2 className="font-semibold text-foreground text-lg">
                  {title}
                </h2>
              ) : (
                <div />
              )}

              {showCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  className="hover:bg-foreground/10 p-2 rounded-full hover:text-foreground/70 transition-colors cursor-pointer"
                  aria-label="Fechar modal"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>
              )}
            </div>
          )}

          <div
            className={cn(
              "px-5 py-4 max-h-[calc(90vh-72px)] overflow-y-auto",
              contentClassName ?? "",
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
