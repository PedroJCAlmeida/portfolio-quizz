import { useEffect, useState } from "react";

export default function QuestionTimer({ timeout, onTimeout = () => {}, mode }) {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        if (typeof onTimeout !== "function") {
            console.error("onTimeout não é uma função!");
            return;
        }

        const timer = setTimeout(onTimeout, timeout);

        return () => clearTimeout(timer);
    }, [timeout, onTimeout]);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime(prev => Math.max(prev - 100, 0));
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <progress
            id="question-timer"
            max={timeout}
            value={remainingTime}
            className={mode}
        />
    );
}
