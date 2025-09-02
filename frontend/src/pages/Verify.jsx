import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { verifyArmstrongNumber } from '../utils/api';

function Verify() {
    const [number, setNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!number.trim()) {
            setError('Please enter a number');
            return;
        }

        const num = parseInt(number);
        if (isNaN(num) || num < 0) {
            setError('Please enter a valid positive number');
            return;
        }

        setIsLoading(true);
        setError('');
        setResult(null);

        try {
            const data = await verifyArmstrongNumber(num);
            setResult(data);
        } catch (error) {
            console.error('Verification failed:', error);
            setError(error.message || 'Verification failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleNumberChange = (e) => {
        setNumber(e.target.value);
        if (error) {
            setError('');
        }
    };

    if (result) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 animate-fade-in">
                    <div className="card text-center">
                        <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-6 ${result.isArmstrong ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                            {result.isArmstrong ? (
                                <svg className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                <svg className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </div>
                        <h2 className={`text-3xl font-bold mb-4 ${result.isArmstrong ? 'text-green-400' : 'text-red-400'}`}>
                            {result.isArmstrong ? 'Armstrong Number!' : 'Not an Armstrong Number'}
                        </h2>
                        <p className="text-slate-300 mb-8">
                            The number <span className="font-semibold text-white">{number}</span> {result.isArmstrong ? 'is' : 'is not'} an Armstrong number.
                        </p>
                        <div className="space-y-3">
                            <button
                                onClick={() => {
                                    setResult(null);
                                    setNumber('');
                                }}
                                className="w-full btn-primary"
                            >
                                Verify Another Number
                            </button>
                            <Link
                                to="/dashboard"
                                className="w-full btn-secondary"
                            >
                                Go to Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 animate-fade-in">
                <div className="card">
                    <div className="text-center mb-8">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mb-6">
                            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">
                            Armstrong Number Verifier
                        </h2>
                        <p className="text-slate-400">
                            Enter a number to check if it's an Armstrong number
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="number" className="block text-sm font-medium text-slate-300 mb-2">
                                Number to Verify
                            </label>
                            <input
                                id="number"
                                name="number"
                                type="number"
                                autoComplete="off"
                                required
                                min="0"
                                className="input"
                                placeholder="Enter a number (e.g., 153)"
                                value={number}
                                onChange={handleNumberChange}
                            />
                            {error && (
                                <p className="mt-2 text-sm text-red-400 text-center">
                                    {error}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Verifying...
                                </span>
                            ) : (
                                'Verify Number'
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <div className="bg-slate-800/50 rounded-lg p-4 mb-6">
                            <p className="text-sm text-slate-300 mb-2">
                                An Armstrong number is a number that is equal to the sum of its own digits each raised to the power of the number of digits.
                            </p>
                            <p className="text-xs text-slate-400">
                                Example: 153 = 1³ + 5³ + 3³ = 1 + 125 + 27 = 153
                            </p>
                        </div>
                        <Link to="/dashboard" className="text-slate-500 hover:text-slate-400 text-sm transition-colors">
                            ← Back to dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Verify;
