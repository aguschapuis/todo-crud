import axios from "axios";
import { ToDo } from "../models/interfaces/ToDo";

export const getTodos = async (): Promise<ToDo[]> => {
  try {
    const response = await axios.get<ToDo[]>(
      `https://jsonplaceholder.typicode.com/todos`
    );
    return response.data;
  } catch (error) {
    console.error("Error on get ToDos: ", error);
    return [];
  }
};
