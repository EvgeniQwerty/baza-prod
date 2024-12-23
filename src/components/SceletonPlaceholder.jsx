import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SkeletonPlaceholder({ height, width, count }) {
  return <Skeleton height={height} width={width} count={count} />;
}