import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { FaGoogle, FaApple } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import type { ApiError } from '../types/api';

export const SignUpPage = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [agreeToMarketing, setAgreeToMarketing] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await signUp(email, password, agreeToMarketing);
      navigate('/');
    } catch (err) {
      const error = err as ApiError;
      const errorMessage = error.response?.data?.error || 'Registration failed';
      setError(errorMessage);
    }
  };

  return (
    <Layout showSidebar={false}>
      <div className="max-w-md mx-auto py-8">
        <div className="text-center mb-8">
          <div className="flex justify-center gap-4 text-sm">
            <Link to="/signin" className="text-gray-600">
              Sign In
            </Link>
            <span className="text-[#4169e1] border-b-2 border-[#4169e1] font-medium">Sign Up</span>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4169e1]"
              required
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
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              8-32 characters, at least one digit, one lowercase letter, one uppercase letter, and
              one special character.
            </p>
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-sm text-gray-700 mb-1">
              Confirm password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4169e1]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="w-4 h-4 text-[#4169e1] border-gray-300 rounded focus:ring-[#4169e1]"
                required
              />
              <span className="text-sm text-gray-700">
                I agree to{' '}
                <Link to="/terms" className="text-[#4169e1] hover:underline">
                  Terms & Conditions
                </Link>
              </span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={agreeToMarketing}
                onChange={(e) => setAgreeToMarketing(e.target.checked)}
                className="w-4 h-4 text-[#4169e1] border-gray-300 rounded focus:ring-[#4169e1]"
              />
              <span className="text-sm text-gray-700">I agree to receive marketing emails</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#4169e1] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            Register
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
