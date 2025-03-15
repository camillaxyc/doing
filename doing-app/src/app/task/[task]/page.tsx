"use client";

import Todo, { TodoItem } from "@/app/todo";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Task() {
  const params = useParams();

  const [task, setTask] = useState<string | null>(null);
  const [taskStep, setTaskStep] = useState<string[]>([
    "Getting started",
    "Research Topic",
  ]);

  useEffect(() => {
    if (!params) {
      return;
    }

    const task = params.task;
    if (typeof task !== "string") {
      return;
    }
    setTask(task.replace(/-/g, " "));
  }, [params]);

  const removeTask = (indexToRemove: number) => {
    setTaskStep((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-2 pb-2 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Link href={"../"} className="text-3xl">
        Doing!
      </Link>
      <div className="flex flex-col items-center p-8 pb-12 font-[family-name:var(--font-geist-sans)]">
        <div className="flex flex-col items-center gap-2 p-8 border-2 border-transparent rounded-2xl bg-gray-300/20">
          <button></button>
          <div className="text-2xl">{task}</div>
          <Timer />
          <div>
            Break your task into smaller parts and add notes to help guide you
          </div>
          <div className="flex flex-row min-h-16 justify-center gap-8">
            <div className="flex flex-col justify-start items-center p-2 gap-2">
              <div className="underline">Notes</div>
              <textarea
                className="resize-none min-h-40 border-1 rounded-sm px-2"
                placeholder="Notes for your task"
              ></textarea>
            </div>
            <div className="flex flex-col justify-start items-center p-2 gap-2">
              <div className="underline">Steps on for your Task</div>
              <ol>
                {taskStep.map((item, index) => (
                  <li key={item + index} className="flex flex-row">
                    <div className="p-3">{index + 1 + ") "}</div>
                    <TodoItem
                      item={item}
                      index={index}
                      setTodoList={setTaskStep}
                      todoList={taskStep}
                    />
                    <div className="">
                      <button
                        className="px-3 py-3 rounded cursor-pointer"
                        onClick={() => {
                          removeTask(index);
                        }}
                      >
                        ❌
                      </button>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Timer = () => {
  const [time, setTime] = useState<number>(0); // Time in seconds
  const [isActive, setIsActive] = useState<boolean>(false); // Whether the timer is running
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const [minutes, setMinutes] = useState<number>(0); // Time in minutes (user's input)

  // Start or reset the timer
  const startTimer = () => {
    setTime(minutes * 60); // Convert minutes to seconds
    setIsActive(true);
  };

  const pauseTimer = () => {
    setTime(time);
    setIsActive(!isActive);
    setIsPaused(!isPaused);
  };

  const stopTimer = () => {
    setIsActive(false);
    setTime(0); // Reset the time when stopped
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000); // Decrease the time by 1 second every 1000 ms
    } else if (time === 0) {
      stopTimer();
    }

    return () => clearInterval(interval); // Cleanup on unmount
  }, [isActive, time]);
  return (
    <div className=" p-2 rounded-sm flex flex-col items-center gap-2">
      <div>
        {time !== 0 ? (
          ""
        ) : (
          <select
            id="minutes"
            onChange={(e) => setMinutes(Number(e.target.value))}
            value={minutes}
            className="bg-gray-200/[0.145] text-black p-1 rounded-sm"
          >
            <option value={0}>Select time</option>
            <option value={10}>10 minutes</option>
            <option value={15}>15 minutes</option>
            <option value={20}>20 minutes</option>
          </select>
        )}
      </div>

      <div>
        <p>
          Time remaining: {Math.floor(time / 60)}:
          {(time % 60).toString().padStart(2, "0")}
        </p>
      </div>
      {time === 0 ? (
        <>
          <button
            className="bg-blue-600 h-8 w-full rounded-sm cursor-pointer text-white"
            onClick={startTimer}
            disabled={isActive || minutes === 0}
          >
            Start Timer
          </button>
        </>
      ) : (
        <>
          <button
            className="bg-blue-600 h-8 w-full rounded-sm cursor-pointer text-white"
            onClick={pauseTimer}
          >
            {isPaused ? "Resume" : "Pause"}
          </button>
          <button
            className="bg-blue-600 h-8 w-full rounded-sm cursor-pointer text-white"
            onClick={stopTimer}
          >
            Stop Timer
          </button>
        </>
      )}
    </div>
  );
};
