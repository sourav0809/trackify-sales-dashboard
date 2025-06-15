import React from "react";

const VisitorInsightsLegend: React.FC = () => (
  <div className="flex items-center justify-center gap-6 w-ful text-xs sm:text-[0.8rem] flex-wrap ">
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-purple-500"></div>
      <span className="text-muted-foreground font-medium">
        Returning Visitors
      </span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-500"></div>
      <span className="text-muted-foreground font-medium">New Visitors</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-green-500"></div>
      <span className="text-muted-foreground font-medium">Total Visitors</span>
    </div>
  </div>
);

export default VisitorInsightsLegend;
