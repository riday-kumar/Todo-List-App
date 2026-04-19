import React, { useState } from "react";

import Confetti from "react-confetti";

const Task = () => {
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    complete: false,
  });

  const [allTodo, setAllTodo] = useState([]);

  const [congratulation, setCongratulation] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.title) {
      const newAry = [...allTodo, newTodo];
      setAllTodo(newAry);
      localStorage.setItem("todos", JSON.stringify(newAry));
      //   clear the form
      const newObj = { title: "", description: "", complete: false };
      setNewTodo(newObj);
      setError(false);
    } else {
      setError(true);
    }
  };

  const getInputValue = (e) => {
    const { name, value } = e.target;

    setNewTodo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleComplete = (i) => {
    const newAllTodo = [...allTodo];
    newAllTodo[i].complete = !newAllTodo[i].complete;
    setAllTodo(newAllTodo);
    setCongratulation(true);
  };

  const storedData = localStorage.getItem("todos");

  const storedTodos = JSON.parse(storedData);
  if (storedTodos) {
    setAllTodo(...storedTodos);
  }

  return (
    <div>
      <div className=" w-[70%] mx-auto mb-10">
        {allTodo.map((todo, index) => (
          <div
            key={index}
            className={`p-4 mb-5 border-b-2 border-dashed ${todo.complete ? "hidden" : "block"}`}
          >
            <h3 className="text-2xl font-bold capitalize border-b-2 border-gray-100 pb-4">
              {todo.title}
            </h3>
            <p className="text-xl text-justify py-4">{todo.description}</p>
            <button
              onClick={() => {
                handleComplete(index);
              }}
              className="btn btn-sm btn-success"
            >
              Complete
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center">
        {congratulation && (
          <Confetti
            width={800}
            height={600}
            recycle={false}
            numberOfPieces={500}
            onConfettiComplete={() => setCongratulation(false)}
          />
        )}
      </div>
      {/* form */}
      <form onSubmit={handleSubmit} className="w-[70%] mx-auto">
        {error && (
          <p className="font-bold text-red-600 capitalize">
            Need a title of the Task
          </p>
        )}
        <fieldset className="fieldset *:w-full">
          <input
            type="text"
            name="title"
            className="input h-16 text-2xl font-bold"
            placeholder="My Task One"
            value={newTodo.title}
            onChange={getInputValue}
          />
          <br />
          <textarea
            name="description"
            placeholder="Description"
            className="input textarea text-xl"
            value={newTodo.description}
            onChange={getInputValue}
          ></textarea>

          <button
            type="submit"
            style={{ width: "100px" }}
            className="btn btn-info font-bold mt-4"
          >
            Add
          </button>
        </fieldset>
      </form>
      {/* to dos */}
    </div>
  );
};

export default Task;
