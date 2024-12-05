export default function Todo({
  _id,
  title,
  description,
  isCompleted,
  id,
  deleteTodo,
  doneTodo,
}: {
  _id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  id: number;
  deleteTodo: (id: string) => void;
  doneTodo: (id: string) => void;
}) {
  return (
    <tr className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 `}>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {id}
      </th>
      <td className={`px-6 py-4 ${isCompleted ? "line-through" : ""}`}>
        {title}
      </td>
      <td className={`px-6 py-4 ${isCompleted ? "line-through" : ""}`}>
        {description}
      </td>
      <td className="px-6 py-4">{!isCompleted ? "Pending" : "Completed"}</td>
      <td className="px-6 py-4 gap-2 flex">
        <button
          className="py-2 px-4 bg-red-500 text-white"
          onClick={() => deleteTodo(_id)}
        >
          Delete
        </button>
        <button
          disabled={isCompleted ? true : false}
          onClick={() => doneTodo(_id)}
          className={`py-2 px-4 bg-green-500 text-white ${
            isCompleted ? "bg-gray-500" : ""
          }`}
        >
          Done
        </button>
      </td>
    </tr>
  );
}
