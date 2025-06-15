"use client";
import React, { useState } from "react";
import GridLayout from "@/components/grid-layout/GridLayout";
import { gridLayouts } from "@/constants/gridLayouts.const";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setDashboardLayout } from "@/store/reducers/userReducer";
import { getErrorMessage } from "@/helpers/common";
import { toast } from "sonner";
import agent from "@/agent/agent";
import LayoutEditor from "./LayoutEditor";

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

      <LayoutEditor
        handleReset={handleReset}
        handleSave={handleSave}
        loader={loader}
      />
    </div>
  );
};

export default Page;
