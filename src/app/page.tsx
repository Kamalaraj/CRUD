"use client";
import axios from "axios";
// import { revalidatePath } from "next/cache";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

interface User {
  id: string;
  _id?: string;
  FirstName: string;
  LastName: string;
  Age: number | "";
  Gender: string;
  Email: string;
}

export default function Home() {
  const [user, setUser] = useState<User[]>([]);
  const [userInfo, setUserInfo] = useState<User>({
    id: uuid(),
    FirstName: "",
    LastName: "",
    Age: "",
    Gender: "",
    Email: "",
  });
  const [buttonState, setButtonState] = useState<string>("Add");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("error : " + error);
      }
    };
    fetchUsers();
  }, [userInfo]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      console.log(userInfo);
      const response = await axios.post("/api/users", userInfo);
      console.log(response.data);

      cancelUpdate();
      console.log(response.data);
    } catch (error) {
      console.log("error : " + error);
    }
  };

  const startUpdate = (user: User) => {
    setUserInfo(user);
    setButtonState("Update");
  };

  const cancelUpdate = () => {
    setUserInfo({
      id: uuid(),
      FirstName: "",
      LastName: "",
      Age: "",
      Gender: "",
      Email: "",
    });
    setButtonState("Add");
  };

  const handleUpdate = async (id: string) => {
    try {
      const response = await axios.put("/api/users", userInfo);
      setUser(user.map((user) => (user.id === id ? response.data : user)));
      cancelUpdate();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const deleteUser = user.find((u) => u._id === id);
      if (deleteUser) {
        await axios.delete("/api/users", { data: deleteUser });
      }
      window.location.reload();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (  
    <div className="max-w-6xl mx-auto p-4 sm:p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl text-center font-bold mb-4">Create User</h1>
        <form
          className="space-y-4 shadow-xl rounded-2xl px-6 sm:px-8 pt-6 pb-8 bg-blue-100"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">First Name:</label>
              <input
                className="mt-1 block w-full px-3 py-2 border bg-white rounded-md shadow-sm focus:outline-none"
                type="text"
                name="FirstName"
                onChange={handleChange}
                value={userInfo.FirstName}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Last Name:</label>
              <input
                className="mt-1 block w-full px-3 py-2 border bg-white rounded-md shadow-sm focus:outline-none"
                type="text"
                name="LastName"
                onChange={handleChange}
                value={userInfo.LastName}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Age:</label>
            <input
              className="mt-1 block w-full px-3 py-2 border bg-white rounded-md shadow-sm focus:outline-none"
              type="number"
              name="Age"
              onChange={handleChange}
              value={userInfo.Age}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Gender:</label>
            <select
              className="mt-1 block w-full px-3 py-2 border bg-white rounded-md shadow-sm focus:outline-none"
              name="Gender"
              onChange={handleChange}
              value={userInfo.Gender}
              required
            >
              <option value="">Choose here</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Email:</label>
            <input
              className="mt-1 block w-full px-3 py-2 border bg-white rounded-md shadow-sm focus:outline-none"
              type="email"
              name="Email"
              onChange={handleChange}
              value={userInfo.Email}
              required
            />
          </div>
          <div className="flex space-x-4 justify  -between">
            {buttonState === "Add" ? (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-2xl w-1/3 "
                type="submit"
              >
                Add
              </button>
            ) : (
              <>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-3 rounded-2xl w-1/2"
                  type="button"
                  onClick={() => handleUpdate(userInfo._id!)}
                >
                  Update
                </button>
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-3 rounded-2xl w-1/2"
                  type="button"
                  onClick={cancelUpdate}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </form>
      </div>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6 overflow-x-auto">
        <h1 className="text-2xl text-center font-bold mb-4 text-gray-700">
          Users
        </h1>
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-blue-500 text-white text-center">
              <th className="px-2 sm:px-4 py-3 border">First Name</th>
              <th className="px-2 sm:px-4 py-3 border">Last Name</th>
              <th className="px-2 sm:px-4 py-3 border">Age</th>
              <th className="px-2 sm:px-4 py-3 border">Gender</th>
              <th className="px-2 sm:px-4 py-3 border">Email</th>
              <th className="px-2 sm:px-4 py-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {user.map((item, index) => (
              <tr
                key={index}
                className="border text-gray-700 hover:bg-gray-100 transition"
              >
                <td className="px-2 sm:px-4 py-3 border">{item.FirstName}</td>
                <td className="px-2 sm:px-4 py-3 border">{item.LastName}</td>
                <td className="px-2 sm:px-4 py-3 border">{item.Age}</td>
                <td className="px-2 sm:px-4 py-3 border">{item.Gender}</td>
                <td className="px-2 sm:px-4 py-3 border">{item.Email}</td>
                <td className="px-2 sm:px-4 py-3  flex gap-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-lg"
                    onClick={() => startUpdate(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg"
                    onClick={() => handleDelete(item._id!)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
