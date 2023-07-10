import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
// import { RootState } from "../store";

const RegisterScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  // const { userInfo } = useSelector((state: RootState) => state.auth);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confrimPassword, setConfrimPassword] = useState<string>("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfrimPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfrimPassword(e.target.value);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confrimPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
      } catch (error: any) {
        toast.error(error?.data.message || error?.error);
        console.log(error);
      }
    }
  };

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <label htmlFor="confrim-password">Confrim Password:</label>
          <input
            type="password"
            id="confrim-password"
            value={confrimPassword}
            onChange={handleConfrimPasswordChange}
            required
          />
        </div>
        <button disabled={isLoading} type="submit">
          Register
        </button>
      </form>
      {isLoading ? "LOADING" : ""}
      <Link to="/login">Click to login</Link>
    </div>
  );
};

export default RegisterScreen;
