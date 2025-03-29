'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (result?.error) {
      setError('نام کاربری یا رمز عبور اشتباه است');
    } else {
      // بعد از ورود موفق، کاربر به صفحه اصلی هدایت می‌شود
      window.location.href = '/';
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold">ورود به حساب کاربری</h1>
        <form onSubmit={handleSubmit} className="mt-4">
          <div>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="نام کاربری"
              className="p-2 border border-gray-300 rounded mt-2"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="رمز عبور"
              className="p-2 border border-gray-300 rounded mt-2"
            />
          </div>
          {error && <div className="text-red-500 mt-2">{error}</div>}
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded mt-4"
          >
            ورود
          </button>
        </form>
      </div>
    </div>
  );
}
