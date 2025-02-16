import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { FaGoogle, FaApple } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import type { ApiError } from '../types/api';

interface ValidationErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

export const SignUpPage = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [agreeToMarketing, setAgreeToMarketing] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (password: string) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,32}$/;
    return regex.test(password);
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      newErrors.password =
        'Password must be 8-32 characters and include uppercase, lowercase, number and special character';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!agreeToTerms) {
      newErrors.terms = 'You must agree to the Terms of Service';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      console.log('Attempting signup with:', { email, password, agreeToMarketing });
      await signUp(email, password, agreeToMarketing);
      console.log('Signup successful');
      navigate('/');
    } catch (err) {
      console.error('Signup error:', err);
      if (err instanceof Error) {
        setApiError(err.message);
      } else {
        const apiError = err as ApiError;
        const errorMessage = apiError.response?.data?.error || 'Registration failed';
        setApiError(errorMessage);
      }
    } finally {
      setIsLoading(false);
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

        {apiError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {apiError}
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
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4169e1] ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isLoading}
              required
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
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
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4169e1] ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isLoading}
              required
            />
            {errors.password ? (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            ) : (
              <p className="mt-1 text-xs text-gray-500">
                8-32 characters, must include uppercase, lowercase, number and special character
              </p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4169e1] ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isLoading}
              required
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className={`mt-1 rounded focus:ring-[#4169e1] ${
                  errors.terms ? 'border-red-500' : 'border-gray-300'
                } ${agreeToTerms ? 'text-[#4169e1]' : ''}`}
                disabled={isLoading}
                required
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                I agree to the{' '}
                <Link to="/terms" className="text-[#4169e1] hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-[#4169e1] hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.terms && <p className="text-sm text-red-600">{errors.terms}</p>}

            <div className="flex items-start">
              <input
                type="checkbox"
                id="marketing"
                checked={agreeToMarketing}
                onChange={(e) => setAgreeToMarketing(e.target.checked)}
                className="mt-1 rounded text-[#4169e1] focus:ring-[#4169e1]"
                disabled={isLoading}
              />
              <label htmlFor="marketing" className="ml-2 text-sm text-gray-700">
                I want to receive marketing emails about products, services and deals
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#4169e1] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
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
