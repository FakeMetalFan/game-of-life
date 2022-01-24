type Grid = {
  width: number;
  height: number;
  cells: number[];
  changedIndexes: number[];
  static: boolean;
};

type CanvasDrawProps = {
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
};

type CanvasDrawCallback = (props: CanvasDrawProps) => void;
