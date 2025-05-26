import Image from "next/image";
import React, { useEffect, useState } from "react";
import AddTaskModal from "./AddTaskModal";
import { useAppContext } from "../States/AppProvider";
import { ToDo } from "../models/interfaces/ToDo";

const Tasks = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [displayedTodos, setDisplayedTodos] = useState<ToDo[]>([]);

  const { setTodos, todos, user } = useAppContext();

  const handleSave = (title: string, description: string) => {
    setTodos([
      ...todos,
      {
        completed: false,
        id:
          todos.length > 0 ? todos[todos.length - 1].id + 1 : todos.length + 1,
        title,
        userId: user.id,
        description,
      },
    ]);
    setShowModal(false);
  };

  useEffect(() => {
    const sliceFrom = currentPage * 4;
    setDisplayedTodos(todos.slice(sliceFrom, sliceFrom + 4));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const onDelete = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div>
      {displayedTodos.map((t) => {
        return (
          <div
            className="bg-white shadow-md rounded-md p-4 flex items-center mb-4 min-h-[100px]"
            key={t.id}
          >
            <div className="w-5/6">
              <h3 className="text-base font-semibold mb-1 truncate">
                {t.title}
              </h3>
              <p className="text-xs text-primary font-normal leading-tight">
                {t.description ??
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris, ac elementum ultrices mauris. Cursus urna"}
              </p>
            </div>
            <button
              className="w-1/6 flex justify-center"
              onClick={() => onDelete(t.id)}
            >
              <Image
                src="/icons/Trash.svg"
                width={20}
                height={20}
                alt="trash"
              />
            </button>
          </div>
        );
      })}
      <div className="fixed bottom-0 left-0 w-full p-4 z-10 ">
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            {"<"}
          </button>

          <span className="text-sm font-medium">{` ${currentPage + 1} / ${
            currentPage === 0 ? 1 : Math.round(todos.length / 5 + 1)
          }`}</span>

          <button
            onClick={() =>
              setCurrentPage((prev) =>
                (prev + 1) * 4 < todos.length ? prev + 1 : prev
              )
            }
            disabled={(currentPage + 1) * 4 >= todos.length}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            {">"}
          </button>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className={`rounded-[5px] py-[12px] px-[141px] mt-10 flex justify-center items-center gap-[10px] w-full bg-primary-green text-white `}
        >
          Añadir tarea
        </button>
        {showModal && (
          <AddTaskModal
            onClose={() => setShowModal(false)}
            onSave={handleSave}
          />
        )}
      </div>
    </div>
  );
};

export default Tasks;
