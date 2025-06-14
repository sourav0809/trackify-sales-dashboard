"use client";
import React from "react";
import { motion } from "framer-motion";
import { Save, RotateCcw } from "lucide-react";
import { Button } from "@/components/common/ui/button";

const LayoutEditor = () => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border z-30 ml-[5rem] sm:ml-[64px] w-[calc(100%-5rem)]"
    >
      <div className="px-4 py-4 flex items-center sm:justify-end justify-center w-full">
        <div className="flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="outline"
              size="sm"
              // onClick={onReset}
              className="gap-2 font-medium !p-3 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Layout
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="default"
              size="sm"
              // onClick={onSave}
              className="gap-2 font-medium !p-3 cursor-pointer"
              // disabled={!hasChanges}
            >
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default LayoutEditor;
