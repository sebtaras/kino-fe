import { useContext } from "react";
import { AxiosContext } from "../context/AxiosContext";

export const useAxiosContext = () => useContext(AxiosContext);
