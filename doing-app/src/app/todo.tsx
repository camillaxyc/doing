"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function Todo() {
  const [todoList, setTodoList] = useState<string[]>([
    "Do homework",
    "Clean my room",
  ]);

  const [completedTask, setCompletedTask] = useState<string[]>([]);
  const router = useRouter();

  const goToTask = (task: string) => {
    const formattedTask = task.replace(/\s+/g, "-"); // Replace spaces with hyphens
    router.push(`/task/${formattedTask}`); // Navigate to the dynamic task route
  };

  const [addedTask, setAddedTask] = useState("");
  const addTask = (task: string) => {
    setTodoList((prev) => [...prev, task]);
    setAddedTask("");
    const nextInput = document.querySelector(
      `input[data-index="${todoList.length - 1}"]`
    ) as HTMLInputElement;
    if (nextInput) {
      nextInput.focus();
    }
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

  async function getActivity({ category }: { category: string }) {
    try {
      const response = await fetch(
        category !== ""
          ? `https://bored.api.lewagon.com/api/activity/?type=${category}`
          : "https://bored.api.lewagon.com/api/activity"
      );
      const data: Activity = await response.json();
      setAddedTask(data.activity);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const GenerateIdea = () => {
    const [dropDown, setDropDown] = useState<boolean>(false);
    return (
      <div className="flex-1 relative">
        <button
          className="bg-blue-600 h-8 w-full rounded-sm cursor-pointer text-white"
          onClick={() => {
            setDropDown(!dropDown);
          }}
        >
          Generate Ideas
        </button>
        <div
          className="flex-col h-32 w-full overflow-y-scroll z-10 absolute bg-gray-100 dark:bg-gray-900 gap-2 rounded-sm"
          style={{ display: `${dropDown ? "flex" : "none"}` }}
          onClick={() => {
            setDropDown(!dropDown);
          }}
        >
          <div
            className="cursor-pointer hover:bg-gray-400/[.2] p-2"
            onClick={() => {
              getActivity({ category: "" });
            }}
          >
            Random
          </div>
          <div
            className="cursor-pointer hover:bg-gray-400/[.2] p-2"
            onClick={() => {
              getActivity({ category: "relaxation" });
            }}
          >
            Relaxing
          </div>
          <div
            className="cursor-pointer hover:bg-gray-400/[.2] p-2"
            onClick={() => {
              getActivity({ category: "education" });
            }}
          >
            Educational
          </div>
          <div
            className="cursor-pointer hover:bg-gray-400/[.2] p-2"
            onClick={() => {
              getActivity({ category: "recreational" });
            }}
          >
            Fun
          </div>
          <div
            className="cursor-pointer hover:bg-gray-400/[.2] p-2"
            onClick={() => {
              getActivity({ category: "busywork" });
            }}
          >
            Busywork
          </div>
          <div
            className="cursor-pointer hover:bg-gray-400/[.2] p-2"
            onClick={() => {
              getActivity({ category: "social" });
            }}
          >
            With friends
          </div>
          <div
            className="cursor-pointer hover:bg-gray-400/[.2] p-2"
            onClick={() => {
              getActivity({ category: "diy" });
            }}
          >
            DIY Stuff
          </div>
          <div
            className="cursor-pointer hover:bg-gray-400/[.2] p-2"
            onClick={() => {
              getActivity({ category: "music" });
            }}
          >
            Music
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="flex flex-col">
        <div className="flex flex-row gap-4">
          <GenerateIdea />
          <button
            className="flex-1 bg-blue-600 h-8 rounded-sm cursor-pointer text-white"
            onClick={() => {
              addTask(addedTask);
            }}
          >
            Add Task
          </button>
        </div>
        <input
          className="p-1 my-4"
          placeholder="Enter New Task"
          value={addedTask}
          onChange={(e) => {
            setAddedTask(e.target.value);
          }}
        ></input>
      </div>
      <div>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          {todoList.map((item, index) => (
            <li
              key={item + index}
              className="flex flex-row justify-around gap-4"
            >
              <div>
                <button
                  className="border-gray-700 dark:border-white/[.145] border-2 cursor-pointer rounded-sm w-8 h-8 text-green-700 text-xl"
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
              <TodoItem
                item={item}
                index={index}
                setTodoList={setTodoList}
                todoList={todoList}
              />
              <div
                onClick={() => {
                  goToTask(item);
                }}
              >
                <p>Help</p>
              </div>
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
      <div>{progress === 100 ? "COMPLETE" : "Progress"}</div>
      <div>
        {progress === 100 ? "Good job!! You finished!" : "You got this!!"}
      </div>
    </div>
  );
};

type TodoItemProps = {
  item: string;
  index: number;
  setTodoList: React.Dispatch<React.SetStateAction<string[]>>;
  todoList: string[];
};

export const TodoItem: React.FC<TodoItemProps> = ({
  item,
  index,
  setTodoList,
  todoList,
}) => {
  const [editTask, setEditTask] = useState(item);

  useEffect(() => {
    if (index === todoList.length - 1) {
      const newInput = document.querySelector(
        `input[data-index="${index}"]`
      ) as HTMLInputElement;
      if (newInput) {
        newInput.focus();
      }
    }
  }, [todoList.length, index]);

  return (
    <input
      maxLength={50}
      className="p-1 w-full"
      defaultValue={item}
      placeholder="Enter Text"
      onChange={(e) => {
        setEditTask(e.target.value);
      }}
      data-index={index}
      onBlur={() => {
        setTodoList((prevItems) =>
          prevItems.map((oldItem, i) => (i === index ? editTask : oldItem))
        );
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();

          const nextInput = document.querySelector(
            `input[data-index="${index + 1}"]`
          ) as HTMLInputElement;
          if (nextInput) {
            nextInput.focus();
          } else {
            setTodoList((prev) => [...prev, ""]);
          }
        }
      }}
    />
  );
};

interface Activity {
  activity: string;
  type: string;
  participants: number;
  price: number;
  link: string;
  key: string;
  accessibility: number;
}
