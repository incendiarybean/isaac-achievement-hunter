import React, { useEffect, useState } from "react";

/**
 * This function tracks the swipe movement of an element
 * @param ref The HTML element you're expecting to swipe on
 * @param action The callback function to return a value
 */
export const SwipeHandler = (
    ref: React.RefObject<HTMLDivElement>,
    action: Function
) => {
    const [touchStart, setTouchStart] = useState<number | null>();

    // TODO: Check for Y changes so page doesn't scroll while swiping

    useEffect(() => {
        const handleSwipeStart = ({ target, targetTouches }: TouchEvent) => {
            if (ref && ref.current && ref.current.contains(target as Node)) {
                setTouchStart(targetTouches[0].clientX);
            }
        };

        const handleSwipeMove = ({ target, targetTouches }: TouchEvent) => {
            if (ref && ref.current && ref.current.contains(target as Node)) {
                if (touchStart && touchStart - 150 > targetTouches[0].clientX) {
                    setTouchStart(null);
                    return action(true);
                }

                if (touchStart && touchStart + 150 < targetTouches[0].clientX) {
                    setTouchStart(null);
                    return action(false);
                }
            }
        };

        document.addEventListener("touchstart", handleSwipeStart);
        document.addEventListener("touchmove", handleSwipeMove);
        return () => {
            document.removeEventListener("touchstart", handleSwipeStart);
            document.removeEventListener("touchmove", handleSwipeMove);
        };
    }, [ref, setTouchStart, touchStart, action]);
};
