import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
const GridItem = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full ${className}`}
    >
      <div className=" h-full flex items-center justify-center w-full">
        {children}
      </div>
    </div>
  );
};

export default GridItem;
