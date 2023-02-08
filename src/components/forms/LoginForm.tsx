import TextField from "../input/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface FormValue {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .trim()
    .matches(/^[A-Z]+$/i, "only contains alphabets")
    .required("error"),
});

export default function LoginForm() {
  const [errorMsg, setErrorMsg] = useState();
  const navigate = useNavigate();

  const { handleSubmit, control } = useForm<FormValue>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const handleLogin = (data: FormValue) => {
    console.log(data);
    const formData = data;
    const postForm = async () => {
      try {
        const res = await axios.post("https://reqres.in/api/login", formData);
        if (res.data?.token) {
          navigate("/");
        } else {
          alert("Login failed");
        }
      } catch (error: any) {
        // console.log(error?.response?.data?.error);
        // console.log(error);
        alert(error?.response?.data?.error);
        // alert("login failed");
      }
    };
    postForm();
  };

  console.log(errorMsg);
  return (
    <div className="p-5 bg-slate-100 text-slate-900">
      <form onSubmit={handleSubmit(handleLogin)}>
        <TextField control={control} name="email" type="text" placeholder="enter your email" />
        <TextField control={control} name="password" type="password" placeholder="enter your password" />
        <button type="submit" className="p-3 bg-slate-900 text-slate-100">
          Submit
        </button>
      </form>
    </div>
  );
}
