"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Save, RotateCcw, Loader2 } from "lucide-react";
import { Button } from "@/components/common/ui/button";
import GridLayout from "@/components/grid-layout/GridLayout";
import { gridLayouts } from "@/constants/gridLayouts.const";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setDashboardLayout } from "@/store/reducers/userReducer";
import { getErrorMessage } from "@/helpers/common";
import { toast } from "sonner";
import agent from "@/agent/agent";

const Page = () => {
  const dispatch = useDispatch();

  const { layoutConfig } = useSelector((state: RootState) => state.user);
  const [currentLayouts, setCurrentLayouts] = useState(layoutConfig);
  const [loader, setLoader] = useState({
    save: false,
    reset: false,
  });

  const handleLayoutChange = (layout: any, layouts: any) => {
    setCurrentLayouts(layouts);
    dispatch(setDashboardLayout(layouts));
  };

  const handleReset = async () => {
    setLoader((prev) => {
      return {
        ...prev,
        reset: true,
      };
    });

    try {
      await agent.User.updateUserPreferences({
        dashboardLayoutConfig: gridLayouts,
      });

      setCurrentLayouts(gridLayouts);
      dispatch(setDashboardLayout(gridLayouts));
      toast.success("Layout reset successfully");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoader((prev) => {
        return {
          ...prev,
          reset: false,
        };
      });
    }
  };

  const handleSave = async () => {
    setLoader((prev) => {
      return {
        ...prev,
        save: true,
      };
    });

    try {
      await agent.User.updateUserPreferences({
        dashboardLayoutConfig: currentLayouts,
      });
      toast.success("Layout saved successfully");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoader((prev) => {
        return {
          ...prev,
          save: false,
        };
      });
    }
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
        className={`fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border z-50 h-[4rem]`}
      >
        <div className="px-4 py-4 flex items-center sm:justify-end justify-center w-full">
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="gap-2 font-medium"
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
                size="sm"
                onClick={handleSave}
                className="gap-2 font-medium"
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
    </div>
  );
};

export default Page;
