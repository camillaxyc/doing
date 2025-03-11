"use client";
import { useState } from "react";

export default function Todo() {
  const [todoList, setTodoList] = useState<string[]>([
    "Do homework",
    "Clean my room",
  ]);

  const [completedTask, setCompletedTask] = useState<string[]>([]);

  const [addedTask, setAddedTask] = useState("Enter New Task");
  const addTask = (task: string) => {
    if (task.trim() === "") return;

    setTodoList((prev) => [...prev, task]);
    setAddedTask("Enter New Task");
  };

  const removeTask = (indexToRemove: number) => {
    const item = todoList[indexToRemove];
    if (completedTask.includes(item)) {
      setCompletedTask((prev) =>
        prev.filter((currentItem) => currentItem !== item)
      );
    }
    setTodoList((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      <div className="flex flex-col">
        <button
          className="bg-blue-600 h-8 rounded-sm cursor-pointer"
          onClick={() => {
            addTask(addedTask);
          }}
        >
          Add Task
        </button>
        <input
          value={addedTask}
          onChange={(e) => {
            setAddedTask(e.target.value);
            console.log(addedTask);
          }}
        ></input>
      </div>
      <div>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          {todoList.map((item, index) => (
            <li key={item + index} className="flex flex-row justify-between">
              <div>
                <button
                  className="border-blue-600 border-2 cursor-pointer rounded-sm w-8 h-8 text-green-700 text-xl"
                  onClick={() => {
                    setCompletedTask((prev) =>
                      prev.includes(item)
                        ? prev.filter((completedTask) => completedTask !== item) //
                        : [...prev, item]
                    );
                  }}
                >
                  <div
                    className={`${
                      completedTask.includes(item) ? "inline" : "hidden "
                    }`}
                  >
                    ✔
                  </div>
                </button>
              </div>
              <TodoItem item={item} index={index} setTodoList={setTodoList} />
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
      <ProgressBar
        progress={Math.round((completedTask.length / todoList.length) * 100)}
      />
    </div>
  );
}
const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div>
      <div className="w-100 rounded-sm border-1">
        <div
          className="h-6 bg-green-700 duration-200 border-r-2 rounded-sm border-green-700"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div>Progress</div>
      <div>You got this!!</div>
    </div>
  );
};

type TodoItemProps = {
  item: string;
  index: number;
  setTodoList: React.Dispatch<React.SetStateAction<string[]>>;
};

const TodoItem: React.FC<TodoItemProps> = ({ item, index, setTodoList }) => {
  const [editTask, setEditTask] = useState(item);
  return (
    <input
      defaultValue={item}
      onChange={(e) => {
        setEditTask(e.target.value);
      }}
      onBlur={() => {
        setTodoList((prevItems) =>
          prevItems.map((oldItem, i) => (i === index ? editTask : oldItem))
        );
      }}
    />
  );
};
