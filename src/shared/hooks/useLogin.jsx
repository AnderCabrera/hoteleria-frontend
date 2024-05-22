import { useState } from "react";
import { loginRequest } from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (username, password) => {
    setIsLoading(true);
    const user = {
      username,
      password,
    };
    const response = await loginRequest(user);
    setIsLoading(false);

    if (response.error) {
      localStorage.clear();
      return toast.error(
        response?.e?.response?.data ||
          "Error general al intentar logearse. Intenta de nuevo.",
      );
    } else if (response) {
      console.log(response);
      const { userDetails } = response.data;
      localStorage.setItem("token", response.data.token);
      const token = localStorage.getItem("token");
      const decodeToken = jwtDecode(token);
      const tokenId = decodeToken.uid;
      localStorage.setItem("_id", tokenId);
      const role = decodeToken.role;
      localStorage.setItem("role", role);

      navigate("/*");
      return toast.success("Te has logeado exitosamente");
    }
  };
  return {
    login,
    isLoading,
  };
};
