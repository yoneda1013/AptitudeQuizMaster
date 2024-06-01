import { TimeLeft as TimeLeftComponent } from "../../components/Progress/TimeLeftProgress";
import { useCalculateRemainingTime } from "../../hooks/useCalcDate";
import { useEffect, useState } from "react";
import { addSeconds } from "date-fns";
import { useOutletContext } from "@remix-run/react";
import { FetchedData } from "../_private.exam";

// 残り時間
export const TimeLeft: React.FC = () => {
  const data = useOutletContext() as FetchedData;

  const [currentTime, setCurrentTime] = useState(new Date());
  if (!data?.examAttempt?.examStartDate) {
    throw new Error("試験を開始してください");
  }
  const examStartDate = new Date(data.examAttempt.examStartDate);

  const timeLimit = data.examAttempt.exam.timeLimit;

  const [remainingTime, remainingPercentage] = useCalculateRemainingTime(
    examStartDate,
    currentTime,
    timeLimit
  );

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime((current) => addSeconds(current, 1));
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <TimeLeftComponent
      perOfElapsed={100 - remainingPercentage}
      leftTime={remainingTime}
    />
  );
};
