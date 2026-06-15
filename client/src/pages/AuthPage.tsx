import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import { KeyRound, Mail, Check, ArrowLeft, FileText } from 'lucide-react';
import Button from '../components/ui/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().optional(),
});

const registerSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type FormValues = z.infer<typeof registerSchema>;

const AuthPage: React.FC = () => {
  const { login, register, status } = useAuth();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema) as any,
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // If already authenticated, redirect to workspace
  if (status === 'authenticated') {
    return <Navigate to="/home" replace />;
  }

  const onSubmit = async (data: FormValues) => {
    setError(null);
    setLoading(true);
    try {
      if (isLogin) {
        await login(data.email, data.password);
        navigate('/home', { replace: true });
      } else {
        await register(data.email, data.password);
        // Automatically log in after registration
        await login(data.email, data.password);
        navigate('/home', { replace: true });
      }
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.detail ||
        err.message ||
        (isLogin ? 'Failed to log in. Please check your credentials.' : 'Registration failed. User may already exist.')
      );
    } finally {
      setLoading(false);
    }
  };

  const handleToggleMode = (mode: boolean) => {
    setIsLogin(mode);
    setError(null);
    reset({
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] min-h-screen w-screen bg-white select-none">
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigate('/')}
        leftIcon={<ArrowLeft size={16} />}
        className="absolute top-6 left-6 z-50 bg-white/80 backdrop-blur-xs shadow-xs hover:bg-slate-50"
      >
        Back
      </Button>
      {/* Left Column (Desktop Only) */}
      <div className="hidden lg:flex flex-col justify-center min-h-screen bg-gradient-to-br from-slate-50 via-slate-100/50 to-blue-50/30 border-r border-border-main p-16">
        <div className="max-w-md mx-auto w-full flex flex-col justify-center">
          {/* Brand & Tagline */}
          <div className="mb-10">
            <div className="text-accent mb-6">
              <FileText size={56} className="stroke-[1.5]" />
            </div>
            <h1 className="text-4xl font-extrabold text-text-primary tracking-tight mb-3">
              DesignDoc
            </h1>
            <p className="text-lg text-text-muted font-medium leading-relaxed">
              Turn your project idea into complete design artifacts
            </p>
          </div>

          {/* Feature list */}
          <ul className="space-y-4 mb-12">
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-blue-50 text-accent flex items-center justify-center">
                <Check size={12} className="stroke-[3]" />
              </div>
              <div>
                <span className="text-sm font-semibold text-text-primary">AI-generated SRS documents</span>
                <p className="text-xs text-text-muted">Instant, comprehensive Software Requirements Specifications.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-blue-50 text-accent flex items-center justify-center">
                <Check size={12} className="stroke-[3]" />
              </div>
              <div>
                <span className="text-sm font-semibold text-text-primary">ER, Class & Sequence diagrams</span>
                <p className="text-xs text-text-muted">Beautiful mermaid.js diagrams rendered in real-time.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-blue-50 text-accent flex items-center justify-center">
                <Check size={12} className="stroke-[3]" />
              </div>
              <div>
                <span className="text-sm font-semibold text-text-primary">Production-ready SQL schemas</span>
                <p className="text-xs text-text-muted">Database schemas tailored to your application's domain.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-blue-50 text-accent flex items-center justify-center">
                <Check size={12} className="stroke-[3]" />
              </div>
              <div>
                <span className="text-sm font-semibold text-text-primary">Save and revisit past projects</span>
                <p className="text-xs text-text-muted">Keep your design history secure and always accessible.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Column (Auth Form) */}
      <div className="flex flex-col justify-center items-center p-6 lg:p-16 bg-slate-50/50 lg:bg-white w-full h-full min-h-screen">
        {/* Mobile Header (Hidden on Desktop) */}
        <div className="flex flex-col items-center mb-8 lg:hidden">
          <div className="bg-accent text-white p-2.5 rounded-2xl flex items-center justify-center shadow-md mb-3">
            <FileText size={28} />
          </div>
          <h2 className="text-xl font-bold text-text-primary tracking-tight">
            DesignDoc
          </h2>
          <p className="text-xs text-text-muted mt-1.5 text-center px-4 leading-relaxed">
            Turn your project idea into complete design artifacts
          </p>
        </div>

        {/* Auth Card with Shadow */}
        <div className="w-full max-w-[420px] bg-white border border-border-main rounded-2xl shadow-xl p-8 flex flex-col items-center">
          {/* Login / Register Toggle (Pill Buttons) */}
          <div className="flex bg-bg-sidebar p-1 rounded-xl mb-6 w-full">
            <button
              type="button"
              onClick={() => handleToggleMode(true)}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${isLogin
                  ? 'bg-white text-text-primary shadow-xs'
                  : 'text-text-muted hover:text-text-primary'
                }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => handleToggleMode(false)}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${!isLogin
                  ? 'bg-white text-text-primary shadow-xs'
                  : 'text-text-muted hover:text-text-primary'
                }`}
            >
              Register
            </button>
          </div>

          {/* Error Notification */}
          {error && (
            <div className="w-full mb-5 bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-xs leading-normal text-left font-medium">
              {error}
            </div>
          )}

          {/* Credentials Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4 select-text">
            <div className="flex flex-col gap-1 items-start">
              <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider pl-1">
                Email Address
              </label>
              <div className="relative w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                  <Mail size={16} />
                </span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  {...registerField('email')}
                  className={`w-full border bg-white rounded-lg pl-10 pr-4 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-border-main focus:border-accent'
                    }`}
                  disabled={loading}
                />
              </div>
              {errors.email && (
                <span className="text-[10px] text-red-500 pl-1 mt-0.5">{errors.email.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-1 items-start">
              <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider pl-1">
                Password
              </label>
              <div className="relative w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                  <KeyRound size={16} />
                </span>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...registerField('password')}
                  className={`w-full border bg-white rounded-lg pl-10 pr-4 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-border-main focus:border-accent'
                    }`}
                  disabled={loading}
                />
              </div>
              {errors.password && (
                <span className="text-[10px] text-red-500 pl-1 mt-0.5">{errors.password.message}</span>
              )}
            </div>

            {!isLogin && (
              <div className="flex flex-col gap-1 items-start">
                <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider pl-1">
                  Confirm Password
                </label>
                <div className="relative w-full">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                    <KeyRound size={16} />
                  </span>
                  <input
                    type="password"
                    placeholder="••••••••"
                    {...registerField('confirmPassword')}
                    className={`w-full border bg-white rounded-lg pl-10 pr-4 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none ${errors.confirmPassword ? 'border-red-500 focus:border-red-500' : 'border-border-main focus:border-accent'
                      }`}
                    disabled={loading}
                  />
                </div>
                {errors.confirmPassword && (
                  <span className="text-[10px] text-red-500 pl-1 mt-0.5">{errors.confirmPassword.message}</span>
                )}
              </div>
            )}

            <Button
              type="submit"
              className="w-full mt-2 py-2.5 font-semibold"
              isLoading={loading}
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </Button>
          </form>

          {/* Mode Switch Helper Link */}
          <div className="mt-6 text-xs text-text-muted">
            {isLogin ? (
              <span>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => handleToggleMode(false)}
                  className="text-accent hover:text-accent-hover font-semibold underline cursor-pointer"
                >
                  Register
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => handleToggleMode(true)}
                  className="text-accent hover:text-accent-hover font-semibold underline cursor-pointer"
                >
                  Login
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
