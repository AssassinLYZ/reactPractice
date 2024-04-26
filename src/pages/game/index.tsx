import { useState } from "react";
import styles from "./index.module.css";

interface GameProps {}
interface Point {
  X: number;
  Y: number;
}
const Game: React.FC<GameProps> = () => {
  const [points, setPonits] = useState<Point[]>([]);
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setPonits([...points, { X: e.clientX - 10, Y: e.clientY - 25 }]);
    console.log(e);
  };
  return (
    <div onClick={handleClick} className={styles.box}>
      {points.map((item, index) => {
        return (
          <p
            key={index}
            className={styles.point}
            style={{ left: item.X, top: item.Y }}
          ></p>
        );
      })}
    </div>
  );
};
export default Game;
