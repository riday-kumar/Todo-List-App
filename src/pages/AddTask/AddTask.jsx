import React from "react";

const AddTask = () => {
  return (
    <div>
      <h1 className="text-center text-3xl my-5">My Next Task</h1>
      <form className="w-[70%] mx-auto">
        <fieldset className="fieldset *:w-full">
          <input
            type="text"
            name="title"
            className="input h-16 text-2xl font-bold"
            placeholder="Task Title"
          />
          <br />
          <textarea
            name="description"
            placeholder="Task Description"
            className="input textarea text-xl"
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
    </div>
  );
};

export default AddTask;
