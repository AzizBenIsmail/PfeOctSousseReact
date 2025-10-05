import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { createPopper } from "@popperjs/core";


import {
  addUser,
  deleteUserById,
  getOrderAllUsersByAge,
  getAllUsers,
  getUserBetweenXAndY,
  searchUsersByName,
  addUserWithImage,
} from "../../service/apiuser";

import {useHistory} from 'react-router-dom'
// components

export default function CardTableListOfUsers({ color }) {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    password: "",
    user_image: "",
  });
  const [minAge, setMinAge] = useState();
  const [maxAge, setMaxAge] = useState();

  const history = useHistory()

  const [popoverShow, setPopoverShow] = React.useState(false);
  const btnRef = React.createRef();
  const popoverRef = React.createRef();
  const openPopover = () => {
    createPopper(btnRef.current, popoverRef.current, {
      placement: "bottom",
    });
    setPopoverShow(true);
  };
  const closePopover = () => {
    setPopoverShow(false);
  };

  const getUsers = async () => {
    try {
      await getAllUsers()
        .then((response) => {
          setUsers(response.data.userList);
          console.log("users", response.data.userList);
        })
        .catch((error) => {
          console.log("Error while calling getUsers API ", error);
        });
    } catch (error) {
      console.log("Error while calling getUsers API ", error);
    }
  };

  const searchUsers = async () => {
    try {
      await searchUsersByName(name)
        .then((response) => {
          setUsers(response.data.userList);
          console.log("users", response.data.userList);
        })
        .catch((error) => {
          console.log("Error while calling getUsers API ", error);
        });
    } catch (error) {
      console.log("Error while calling getUsers API ", error);
    }
  };

  const getOrderUsers = async () => {
    try {
      await getOrderAllUsersByAge()
        .then((response) => {
          setUsers(response.data.userList);
          console.log("users", response.data.userList);
        })
        .catch((error) => {
          console.log("Error while calling getUsers API ", error);
        });
    } catch (error) {
      console.log("Error while calling getUsers API ", error);
    }
  };

  const getUserBetweenAges = async (minAge, maxAge) => {
    try {
      console.log(minAge, maxAge);
      await getUserBetweenXAndY(minAge, maxAge)
        .then((response) => {
          setUsers(response.data.userList);
          console.log("users", response.data.userList);
        })
        .catch((error) => {
          console.log("Error while calling getUsers API ", error);
        });
    } catch (error) {
      console.log("Error while calling getUsers API ", error);
    }
  };

  useEffect(() => {
    getUsers(); // appel initial

    const interval = setInterval(() => {
      getUsers();
    }, 5000); // toutes les 5 secondes

    return () => clearInterval(interval); // nettoyage quand le composant est démonté
  }, []);

  useEffect(() => {
    searchUsers();
  }, [name]);

  

  const deleteUser = async (id) => {
    try {
      await deleteUserById(id)
        .then((response) => {
          getUsers();
          alert("Bienvenue sur mon site !");
          console.log("user deleted");
        })
        .catch((error) => {
          console.log("Error while calling deleteUserById API ", error);
        });
    } catch (error) {
      console.log("Error while calling getUsers API ", error);
    }
  };

  const handlechange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
    console.log(newUser);
  };

  const addNewUser = async () => {
    try {
      await addUser(newUser)
        .then((response) => {
          getUsers();
          console.log("user added");
        })
        .catch((error) => {
          console.log("Error while calling addUser API ", error);
        });
      setNewUser({
        firstName: "",
        lastName: "",
        age: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log("Error while calling getUsers API ", error);
    }
  };

  //const image = "";
  const [image, setImage] = useState();

  const formData = new FormData();

  const handlechangeImg = (e) => {
    setImage(e.target.files[0]);
    console.log(image);
  }

  const addNewUserWithImg = async () => {
    try {
      formData.append("firstName", newUser.firstName);
      formData.append("lastName", newUser.lastName);
      formData.append("age", newUser.age);
      formData.append("email", newUser.email);
      formData.append("password", newUser.password);
      formData.append("user_image", image, `${image.name}`);
      console.log(image);
      console.log(newUser);
      await addUserWithImage(formData)
        .then((response) => {
          getUsers();
          console.log("user added");
        })
        .catch((error) => {
          console.log("Error while calling addUser API ", error);
        });
    } catch (error) {
      console.log("Error while calling getUsers API ", error);
    }
  };



  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                Card Tables List Of Users
              </h3>
              <button
                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => getOrderUsers()}
              >
                Order Users BY Age
              </button>
              <div class="flex gap-4 mb-3">
                <input
                  type="text"
                  placeholder="Min Age"
                  class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-6/12"
                  onChange={(e) => setMinAge(Number(e.target.value))}
                />
                <input
                  type="text"
                  placeholder="Max Age"
                  class="px-2 ml-2 py-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-6/12"
                  onChange={(e) => setMaxAge(Number(e.target.value))}
                />
                <button
                  className="bg-lightBlue-500 ml-2 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-1 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => getUserBetweenAges(minAge, maxAge)}
                >
                  Get Users
                </button>
              </div>
              <div class="flex gap-4 mb-3">
                <input
                  type="text"
                  placeholder="Search By FirstName"
                  class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-6/12"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <button
                  className="bg-lightBlue-500 ml-2 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-1 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => searchUsers(name)}
                >
                  search Users By Name
                </button>
              </div>
              <div className="flex flex-wrap">
                <div className="w-full text-center">
                  <button
                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      popoverShow ? closePopover() : openPopover();
                    }}
                    ref={btnRef}
                  >
                    Add Client
                  </button>
                  <div
                    className={
                      (popoverShow ? "" : "hidden ") +
                      "bg-lightBlue-600 border-0 mr-3 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg"
                    }
                    ref={popoverRef}
                  >
                    <div>
                      <div className="bg-lightBlue-600 text-white opacity-75 font-semibold p-3 mb-0 border-b border-solid border-blueGray-100 uppercase rounded-t-lg">
                        Add Client
                      </div>
                      <div className="text-white p-3">
                        <div class="flex gap-4 mb-3">
                          <input
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            value={newUser.firstName}
                            class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-6/12"
                            onChange={handlechange}
                          />
                          <input
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            class="px-2 ml-2 py-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-6/12"
                            onChange={handlechange}
                            value={newUser.lastName}
                          />
                          <input
                            type="text"
                            placeholder="Age"
                            name="age"
                            class="px-2 py-1 ml-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-6/12"
                            onChange={handlechange}
                            value={newUser.age}
                          />
                        </div>
                        <div class="flex gap-4 mb-3">
                          <input
                            type="text"
                            placeholder="Email"
                            name="email"
                            class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-6/12"
                            onChange={handlechange}
                            value={newUser.email}
                          />
                          <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            class="px-2 ml-2 py-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-6/12"
                            onChange={handlechange}
                            value={newUser.password}
                          />
                        </div>
                        <input
                          type="file"
                          name="user_image"
                          class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-6/12"
                          onChange={handlechangeImg}
                        />
                        <button
                          className="bg-lightBlue-500 ml-2 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-1 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => {
                            addNewUser();
                            closePopover();
                          }}
                        >
                          Add User
                        </button>
                        <button
                          className="bg-lightBlue-500 ml-2 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-1 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => addNewUserWithImg()}
                        >
                          Add User with Image
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  First Name
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Last Name
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Email
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  role
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  age
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                ></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                    <img
                      src={`http://localhost:5000/images/users/${user.user_image}`}
                      className="h-12 w-12 bg-white rounded-full border"
                      alt="..."
                    ></img>{" "}
                    <span
                      className={
                        "ml-3 font-bold " +
                        +(color === "light"
                          ? "text-blueGray-600"
                          : "text-white")
                      }
                    >
                      {user.firstName}
                    </span>
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {user.lastName}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {user.email}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <div className="flex">{user.roles}</div>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <div className="flex items-center">
                      <div className="relative w-full">{user.age}</div>
                    </div>
                  </td>
                  <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-left">
                    <button
                      className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                      type="button"
                      onClick={()=> history.push({ 
                        pathname : "/admin/UpdateUser",
                        state : {user : user}
                      })}
                    >
                      Update
                    </button>{" "}
                    <button
                      className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => deleteUser(user._id)}
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
    </>
  );
}

CardTableListOfUsers.defaultProps = {
  color: "light",
};

CardTableListOfUsers.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
