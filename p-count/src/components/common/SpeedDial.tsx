import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Plus, X } from "lucide-react";

export type SpeedDialAction = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
};

interface SpeedDialProps {
  actions?: SpeedDialAction[];
  placement?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}

export const SpeedDial: React.FC<SpeedDialProps> = ({
  actions = [],
  placement = "bottom-right",
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const pos = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
  }[placement];

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={ref} className={cn("fixed z-40 flex flex-col items-end", pos)}>
      {/* Actions */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.15 }}
            className="mb-2 flex flex-col gap-2"
          >
            {actions.map((action, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  action.onClick();
                  setOpen(false);
                }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.15, delay: index * 0.05 }}
                className="flex items-center gap-2 rounded-xl bg-primary text-primary-foreground p-3 shadow-lg hover:bg-primary/90"
              >
                {action.icon}
                <span className="text-sm font-medium">{action.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="p-4 rounded-full bg-primary text-primary-foreground shadow-xl hover:bg-primary/90 relative overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="x-icon"
              initial={{ rotate: -90 }}
              animate={{ rotate: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div
              key="plus-icon"
              initial={{ rotate: 90 }}
              animate={{ rotate: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Plus size={22} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
};
