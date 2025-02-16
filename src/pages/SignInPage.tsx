import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { FaGoogle, FaApple } from 'react-icons/fa';

export const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle sign in
    console.log('Sign in:', { email, password });
  };

  return (
    <Layout showSidebar={false}>
      <div className="max-w-md mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-medium mb-2">Welcome Back</h1>
          <div className="flex justify-center gap-4 text-sm">
            <span className="text-gray-600">New to BidHub?</span>
            <Link to="/signup" className="text-[#4169e1] hover:underline">
              Sign Up
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
              Email / Bidder id
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4169e1]"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4169e1]"
            />
          </div>

          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-[#4169e1] hover:underline">
              Forgot your password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-[#4169e1] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#f8f9fa] text-gray-500">or</span>
          </div>
        </div>

        <div className="space-y-3">
          <button className="w-full flex items-center justify-center gap-2 px-3 py-2.5 border border-gray-300 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-900">
            <FaApple className="w-5 h-5" />
            Continue with Apple
          </button>
          <button className="w-full flex items-center justify-center gap-2 px-3 py-2.5 border border-gray-300 rounded-lg bg-[#4285f4] text-white text-sm font-medium hover:bg-blue-600">
            <FaGoogle className="w-5 h-5" />
            Continue with Google
          </button>
        </div>
      </div>
    </Layout>
  );
};
