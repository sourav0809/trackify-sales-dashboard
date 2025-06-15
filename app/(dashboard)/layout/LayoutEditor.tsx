"use client";
import React from "react";
import { Button } from "@/components/common/ui/button";
import { motion } from "framer-motion";
import { Save, RotateCcw, Loader2 } from "lucide-react";

const LayoutEditor = ({
  handleReset,
  handleSave,
  loader,
}: {
  handleReset: () => void;
  handleSave: () => void;
  loader: {
    reset: boolean;
    save: boolean;
  };
}) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className={`fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border z-30 h-[4rem]`}
    >
      <div className="px-4 py-4 flex items-center sm:justify-end justify-center w-full">
        <div className="flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="outline"
              onClick={handleReset}
              className="gap-2 font-medium cursor-pointer bg-green-600 hover:bg-green-700 text-white hover:text-white "
              disabled={loader.reset}
            >
              {loader.reset ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RotateCcw className="w-4 h-4" />
              )}
              Reset Layout
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="default"
              onClick={handleSave}
              className="gap-2 font-medium cursor-pointer bg-blue-500 hover:bg-blue-600 "
              disabled={loader.save}
            >
              {loader.save ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save Changes
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default LayoutEditor;
