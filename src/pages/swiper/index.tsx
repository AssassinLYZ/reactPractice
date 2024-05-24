import { useCallback, useState } from "react";
import styles from "../swiper/index.module.css";
import { throttle } from "lodash";
interface SwiperProps {}
// type FuncType = (...args: any[]) => void;

function useDebounce(func: FuncType, delay: number): FuncType {
  let timerId: ReturnType<typeof setTimeout>;
  return function (...args: any[]) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
type FuncType = (...args: any[]) => void;

function useThrottle(func: FuncType, delay: number): FuncType {
  let throttled = false;

  return function (...args: any[]) {
    if (!throttled) {
      throttled = true;
      func(...args);
      setTimeout(() => {
        throttled = false;
      }, delay);
    }
  };
}
// const Swiper: React.FC<SwiperProps> = ({}) => {
//   //   const [imgs, setImgs] = useState<string[]>([]);
//   const [currentIndex, setCurrentIndex] = useState<number>(0);
//   const [isMove, setIsmove] = useState<boolean>(false);
//   const images = [1, 2, 3, 4, 5, 1];

//   const moveLeft = () => {
//     // if (currentIndex === images.length - 2) {
//     //   setCurrentIndex((currentIndex) => currentIndex + 1);
//     //   //   setIsmove(true);
//     //   setTimeout(() => {
//     //     setIsmove(true);
//     //     setCurrentIndex(0);
//     //   }, 999);
//     // } else {
//     //   setIsmove(false);
//     //   setCurrentIndex((currentIndex) => currentIndex + 1);
//     // }
//     // else {
//     // setIsmove(false);
//     // }
//   };
//   const debouncedMoveLeft = useThrottle(moveLeft, 1000);
//   const moveRight = () => {
//     if (currentIndex === 0) return;
//     setCurrentIndex((currentIndex) => currentIndex - 1);
//   };
//   return (
//     <div>
//       <p>{currentIndex}</p>
//       <div className={styles.box}>
//         {images.map((item, index) => {
//           return (
//             <p
//               className={styles.item}
//               key={item + index}
//               style={{
//                 transition: isMove ? "" : "all 1s ease",
//                 transform: `translateX(-${currentIndex * 100}px)`,
//                 background: `rgb(${item * 10},${item * 10},  ${item * 10})`,
//               }}
//             >
//               {item}
//             </p>
//           );
//         })}
//       </div>
//       <p onClick={debouncedMoveLeft}>left</p>
//       <p onClick={moveRight}>right</p>
//     </div>
//   );
// };
// export default Swiper;

// 示例用法
export const MyComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isMove, setIsmove] = useState<boolean>(false);
  const [isClickable, setIsClickable] = useState<boolean>(true);
  const images = [1, 2, 3, 4, 5, 1];

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleClick = useThrottle(() => {
    console.log("Button clicked");
  }, 1000); // 1s 的节流延迟

  const handleMoveLeft = () => {
    console.log(123);
    if (!isClickable) return;
    console.log("B 2");
    setIsClickable(false);
    if (currentIndex === images.length - 2) {
      setCurrentIndex((currentIndex) => currentIndex + 1);
      setTimeout(() => {
        setIsmove(true);
        setCurrentIndex(0);
      }, 999);
    } else {
      setIsmove(false);
      setCurrentIndex((currentIndex) => currentIndex + 1);
    }
    setTimeout(() => {
      setIsClickable(true);
    }, 1000);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInput} />
      <button onClick={handleClick}>Click me 123</button>
      <div>
        <p>{currentIndex}</p>
        <div className={styles.box}>
          {images.map((item, index) => {
            return (
              <p
                className={styles.item}
                key={item + index}
                style={{
                  transition: isMove ? "" : "all 1s ease",
                  transform: `translateX(-${currentIndex * 100}px)`,
                  background: `rgb(${item * 10},${item * 10},  ${item * 10})`,
                }}
              >
                {item}
              </p>
            );
          })}
        </div>
        <button onClick={handleClick}>Click me</button>
        <button onClick={handleMoveLeft}>left</button>
        {/* <p onClick={moveRight}>right</p> */}
      </div>
    </div>
  );
};
export default MyComponent;
