// userService.js
import api from "./api";

export const updateUser = async (body) => {
  return await api.put("/users/edit", body);
};
