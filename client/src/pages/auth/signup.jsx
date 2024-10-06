import { useState } from 'react';

const signup = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log(email, password);
    setEmail(() => '');
    setPassword(() => '');
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up form</h1>
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
