import axios from "axios";

async function signupUser({ email, username, password }) {
  try {
    const response = await axios.post(
      "https://forex-trading-backend-dun.vercel.app/register",
      {
        email,
        username,
        password,
      }
    );

    return { status: "successfully registered", token: response.data.token };
  } catch (error) {
    if (error?.response?.data?.message === "email already exists") {
      return { status: "email already exists" };
    }

    if (error?.response?.data?.message === "user already exists") {
      console.log("hello");
      return { status: "username already exists" };
    }

    return { status: "error" };
  }
}

export default signupUser;
