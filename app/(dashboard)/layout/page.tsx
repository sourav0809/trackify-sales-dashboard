"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Save, RotateCcw } from "lucide-react";
import { Button } from "@/components/common/ui/button";
import GridLayout from "@/components/grid-layout/GridLayout";
import { gridLayouts } from "@/constants/gridLayouts.const";

const Page = () => {
  const [currentLayouts, setCurrentLayouts] = useState(gridLayouts);
  const [hasChanges, setHasChanges] = useState(false);

  const handleLayoutChange = (layout: any, layouts: any) => {
    setCurrentLayouts(layouts);
    setHasChanges(true);
  };

  const handleReset = () => {
    setCurrentLayouts(gridLayouts);
    setHasChanges(false);
  };

  const handleSave = () => {
    console.log("Saving layout:", currentLayouts);
    setHasChanges(false);
  };

  return (
    <div className="relative h-screen w-full">
      {/* Scrollable content container */}
      <div className="overflow-auto h-[calc(100%-4rem)]">
        <GridLayout isEditing={true} onLayoutChange={handleLayoutChange} />
      </div>

      {/* Fixed Bottom Bar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border z-50 h-[4rem]"
      >
        <div className="px-4 py-4 flex items-center sm:justify-end justify-center w-full">
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="gap-2 font-medium"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Layout
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="default"
                size="sm"
                onClick={handleSave}
                className="gap-2 font-medium"
                disabled={!hasChanges}
              >
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Page;
