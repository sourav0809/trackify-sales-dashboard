import { RootState } from "@/store";
import { useSelector } from "react-redux";

interface CustomLabelProps {
  x: number;
  y: number;
  width: number;
  height: number;
  value: number;
  name: string;
  getStageColor: (index: number) => string;
}

const Labels = (props: CustomLabelProps) => {
  const { x, y, width, height, value, name } = props;
  const centerX = x + width / 2;
  const centerY = y + height / 2;

  const conversionHistoryData = useSelector(
    (state: RootState) => state.chart.conversionHistory
  );

  const conversionRate = (
    (value / conversionHistoryData[0].value) *
    100
  ).toFixed(1);

  return (
    <g>
      <text
        x={centerX}
        y={centerY - 10}
        textAnchor="middle"
        fill="#1e293b"
        className="text-sm font-medium"
      >
        {name}
      </text>
      <text
        x={centerX}
        y={centerY + 10}
        textAnchor="middle"
        fill="#64748b"
        className="text-xs"
      >
        {value.toLocaleString()} ({conversionRate}%)
      </text>
    </g>
  );
};

export default Labels;
