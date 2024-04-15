import axios from "axios";

async function LoginUser(username, password) {
  try {
    const response = await axios.post("http://localhost:4000/login", {
      username,
      password,
    });

    return { status: "success", token: response.data.token };
  } catch (error) {
    if (error?.response?.data?.message === "username does not exist") {
      return { status: "username does not exist" };
    }

    if (error?.response?.data?.message === "password is incorrect") {
      return { status: "password is incorrect" };
    }

    return { status: "error" };
  }
}

export default LoginUser;
