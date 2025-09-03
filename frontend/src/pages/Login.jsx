import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../utils/api';
import FormContainer from '../components/forms/FormContainer';
import Input from '../components/forms/Input';
import Button from '../components/forms/Button';
import ErrorMessage from '../components/ui/ErrorMessage';
import Icon from '../components/ui/Icon';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { login, setIsLoading: setAuthLoading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setAuthLoading(true);
        setError('');

        try {
            const data = await loginUser({ email, password });

            if (data.token && data.user) {
                login(data.token, data.user);
                navigate('/dashboard');
            } else {
                setError('Invalid response from server');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError(error.message || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
            setAuthLoading(false);
        }
    };

    return (
        <FormContainer
            title="Welcome Back"
            subtitle="Sign in to your account to continue"
            icon={<Icon name="lock" size="xl" className="text-white" />}
        >
            <ErrorMessage message={error} className="mb-6" />

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                            Email address
                        </label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                            Password
                        </label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <Button
                    type="submit"
                    loading={isLoading}
                    loadingText="Signing in..."
                    size="lg"
                    className="w-full"
                >
                    Sign In
                </Button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-slate-400">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-green-400 hover:text-green-300 font-medium transition-colors">
                        Sign up
                    </Link>
                </p>
                <p className="mt-2">
                    <Link to="/" className="text-slate-500 hover:text-slate-400 text-sm transition-colors">
                        ← Back to home
                    </Link>
                </p>
            </div>
        </FormContainer>
    );
}

export default Login;
