import axios from 'axios';
import { useState } from 'react';

const signup = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState([]);

  const clearForm = () => {
    setEmail(() => '');
    setPassword(() => '');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors(() => []);

    try {
      const response = await axios.post('/api/users/signup', {
        email,
        password,
      });

      console.log(response.data);
    } catch (err) {
      err.response.data.map((message) => {
        setErrors((prevState) => prevState.push(message));
      });
      console.log(errors);

      console.log(err.response.data);
    }

    clearForm();
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up form</h1>
      <div className="">
        {errors.map((err) => {
          <li key={err}>err</li>;
        })}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button> Submit </button>
    </form>
  );
};

export default signup;
