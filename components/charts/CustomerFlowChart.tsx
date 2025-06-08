import React from 'react';
import { ResponsiveContainer } from 'recharts';

interface Node {
  name: string;
  category: string;
  value: number;
}

interface Link {
  source: number;
  target: number;
  value: number;
}

const nodes: Node[] = [
  { name: 'T-Shirts', category: 'entry', value: 1000 },
  { name: 'Dresses', category: 'entry', value: 800 },
  { name: 'Jeans', category: 'middle', value: 600 },
  { name: 'Accessories', category: 'middle', value: 400 },
  { name: 'Checkout', category: 'exit', value: 300 },
  { name: 'Abandoned', category: 'exit', value: 200 }
];

const links: Link[] = [
  { source: 0, target: 2, value: 400 },
  { source: 0, target: 3, value: 300 },
  { source: 1, target: 2, value: 200 },
  { source: 1, target: 3, value: 100 },
  { source: 2, target: 4, value: 200 },
  { source: 2, target: 5, value: 100 },
  { source: 3, target: 4, value: 100 },
  { source: 3, target: 5, value: 100 }
];

const colors = {
  entry: '#3b82f6',
  middle: '#34d399',
  exit: '#8b5cf6'
};

const SankeyNode = ({
  x,
  y,
  width,
  height,
  name,
  category,
  value
}: Node & { x: number; y: number; width: number; height: number }) => (
  <g transform={`translate(${x},${y})`}>
    <rect
      width={width}
      height={height}
      fill={colors[category as keyof typeof colors]}
      rx={4}
      ry={4}
    />
    <text
      x={width / 2}
      y={height / 2}
      textAnchor="middle"
      dominantBaseline="middle"
      fill="white"
      fontSize={12}
      fontWeight="medium"
    >
      {name}
    </text>
    <text
      x={width / 2}
      y={height / 2 + 16}
      textAnchor="middle"
      dominantBaseline="middle"
      fill="white"
      fontSize={10}
      opacity={0.8}
    >
      {value.toLocaleString()}
    </text>
  </g>
);

const SankeyLink = ({
  sourceX,
  sourceY,
  sourceHeight,
  targetX,
  targetY,
  targetHeight,
  value,
  color
}: {
  sourceX: number;
  sourceY: number;
  sourceHeight: number;
  targetX: number;
  targetY: number;
  targetHeight: number;
  value: number;
  color: string;
}) => {
  const path = `
    M ${sourceX} ${sourceY}
    C ${(sourceX + targetX) / 2} ${sourceY},
      ${(sourceX + targetX) / 2} ${targetY},
      ${targetX} ${targetY}
    L ${targetX} ${targetY + targetHeight}
    C ${(sourceX + targetX) / 2} ${targetY + targetHeight},
      ${(sourceX + targetX) / 2} ${sourceY + sourceHeight},
      ${sourceX} ${sourceY + sourceHeight}
    Z
  `;

  return (
    <path
      d={path}
      fill={color}
      opacity={0.3}
      stroke={color}
      strokeWidth={1}
    />
  );
};

const CustomerFlowChart = () => {
  const width = 800;
  const height = 400;
  const nodeWidth = 120;
  const nodeHeight = 60;
  const nodePadding = 40;

  const calculateNodePositions = () => {
    const categories = ['entry', 'middle', 'exit'];
    const categorySpacing = (width - nodeWidth) / (categories.length - 1);

    return nodes.map((node, i) => {
      const categoryIndex = categories.indexOf(node.category);
      const categoryNodes = nodes.filter(n => n.category === node.category);
      const nodeIndex = categoryNodes.indexOf(categoryNodes.find(n => n.name === node.name)!);
      const totalHeight = categoryNodes.length * nodeHeight + (categoryNodes.length - 1) * nodePadding;
      const startY = (height - totalHeight) / 2;

      return {
        ...node,
        x: categoryIndex * categorySpacing,
        y: startY + nodeIndex * (nodeHeight + nodePadding),
        width: nodeWidth,
        height: nodeHeight
      };
    });
  };

  const nodePositions = calculateNodePositions();

  return (
    <div className="bg-card rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-border w-full h-full">
      <h2 className="text-xl font-medium text-[#625b71] mb-8">Customer Flow Across Categories</h2>
      
      <div className="h-[300px] sm:h-[400px] lg:h-[500px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
            <g>
              {links.map((link, i) => {
                const source = nodePositions[link.source];
                const target = nodePositions[link.target];
                return (
                  <SankeyLink
                    key={i}
                    sourceX={source.x + source.width}
                    sourceY={source.y + (source.height - (link.value / source.value) * source.height) / 2}
                    sourceHeight={(link.value / source.value) * source.height}
                    targetX={target.x}
                    targetY={target.y + (target.height - (link.value / target.value) * target.height) / 2}
                    targetHeight={(link.value / target.value) * target.height}
                    value={link.value}
                    color={colors[source.category as keyof typeof colors]}
                  />
                );
              })}
              {nodePositions.map((node, i) => (
                <SankeyNode key={i} {...node} />
              ))}
            </g>
          </svg>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-4 mt-4 pb-4 flex-wrap">
        {Object.entries(colors).map(([category, color]) => (
          <div key={category} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-sm text-muted-foreground font-medium capitalize">
              {category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerFlowChart;