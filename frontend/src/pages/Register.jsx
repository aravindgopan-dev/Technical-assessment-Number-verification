import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import FormContainer from '../components/forms/FormContainer';
import Input from '../components/forms/Input';
import Button from '../components/forms/Button';
import ErrorMessage from '../components/ui/ErrorMessage';
import Icon from '../components/ui/Icon';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const validateForm = () => {
        const newErrors = {};

        if (!username.trim()) {
            newErrors.username = 'Username is required';
        } else if (username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
        }

        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setApiError('');

        try {
            const data = await registerUser({ name: username, email, password });

            // Use AuthContext to store the JWT token and user data
            if (data.token && data.user) {
                login(data.token, data.user);
                // Redirect to dashboard
                navigate('/dashboard');
            } else {
                setApiError('Invalid response from server');
            }

        } catch (error) {
            console.error('Registration failed:', error);
            setApiError(error.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        if (errors.username) {
            setErrors(prev => ({ ...prev, username: '' }));
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (errors.email) {
            setErrors(prev => ({ ...prev, email: '' }));
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (errors.password) {
            setErrors(prev => ({ ...prev, password: '' }));
        }
    };

    return (
        <FormContainer
            title="Create Account"
            subtitle="Join Cooeey and start verifying Armstrong numbers"
            icon={<Icon name="user" size="xl" className="text-white" />}
        >
            <ErrorMessage message={apiError} className="mb-6" />

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-2">
                            Username
                        </label>
                        <Input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={handleUsernameChange}
                            error={errors.username}
                            required
                        />
                    </div>
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
                            onChange={handleEmailChange}
                            error={errors.email}
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
                            onChange={handlePasswordChange}
                            error={errors.password}
                            required
                        />
                    </div>
                </div>

                <Button
                    type="submit"
                    loading={isLoading}
                    loadingText="Creating account..."
                    size="lg"
                    className="w-full"
                >
                    Create Account
                </Button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-slate-400">
                    Already have an account?{' '}
                    <Link to="/login" className="text-green-400 hover:text-green-300 font-medium transition-colors">
                        Sign in
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

export default Register;
