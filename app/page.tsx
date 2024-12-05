"use client";
import React, { useEffect, useState } from "react";
import Todo from "../components/Todo";
import axios, { AxiosResponse } from "axios";
interface FormTypes {
  title: string;
  description: string;
}
interface TodoState {
  id: number;
  _id: string;
  title: string;
  description: string;
  deleteTodo: (id: string) => void;
  doneTodo: (id: string) => void;
  isCompleted: boolean;
}
export default function Home() {
  const [todos, setTodos] = useState<TodoState[]>([]);
  const [formData, setFormData] = useState<FormTypes>({
    title: "",
    description: "",
  });
  const handleChangeForm = <T extends HTMLInputElement | HTMLTextAreaElement>(
    event: React.ChangeEvent<T>
  ) => {
    const { name, value } = event.target;
    setFormData((prevForm) => {
      return {
        ...prevForm,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      //api code
      console.log(formData);
      const response: AxiosResponse = await axios.post(
        "http://localhost:3000/api",
        formData,
        {
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );
      alert("Create todos: " + response.data.msg);
      setFormData({
        title: "",
        description: "",
      });
      await getFetchListTodo();
    } catch (err) {
      console.log(err);
    }
  };
  const getFetchListTodo = async () => {
    const response: AxiosResponse = await axios.get(
      "http://localhost:3000/api"
    );
    const data = response.data.todos;
    setTodos(data);
  };
  const deleteTodos = async (idMongo: string) => {
    const response: AxiosResponse = await axios.delete(
      "http://localhost:3000/api",
      {
        params: {
          _id: idMongo,
        },
      }
    );
    alert("Delete todos: " + response.data.msg);
    await getFetchListTodo();
  };
  const doneTodos = async (idMongo: string) => {
    const response: AxiosResponse = await axios.put(
      "http://localhost:3000/api",
      {},
      {
        params: {
          _id: idMongo,
        },
      }
    );
    alert("Update todos: " + response.data.msg);
    await getFetchListTodo();
  };
  useEffect(() => {
    getFetchListTodo();
  }, []);
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto"
      >
        <input
          type="text"
          name="title"
          placeholder="Enter title"
          onChange={handleChangeForm}
          value={formData.title}
          className="px-3 py-2 border-2 w-full "
        />
        <textarea
          name="description"
          placeholder="Enter description"
          onChange={handleChangeForm}
          value={formData.description}
          className="px-3 py-2 border-2 w-full"
        ></textarea>
        <button type="submit" className="bg-orange-600 py-3 px-11 text-white">
          Add todo
        </button>
      </form>

      <div className="relative overflow-x-auto mt-24 w-[60%] mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo: TodoState, index: number) => {
              return (
                <Todo
                  key={todo._id}
                  title={todo.title}
                  id={index}
                  _id={todo._id}
                  description={todo.description}
                  isCompleted={todo.isCompleted}
                  doneTodo={doneTodos}
                  deleteTodo={deleteTodos}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
