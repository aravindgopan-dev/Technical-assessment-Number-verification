import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { verifyArmstrongNumber } from '../utils/api';
import FormContainer from '../components/forms/FormContainer';
import Input from '../components/forms/Input';
import Button from '../components/forms/Button';
import ErrorMessage from '../components/ui/ErrorMessage';
import Icon from '../components/ui/Icon';
import Card from '../components/layout/Card';

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
                    <Card className="text-center">
                        <div className={`mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-6 ${result.isArmstrong ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                            <Icon
                                name={result.isArmstrong ? "check" : "close"}
                                size="xl"
                                className={result.isArmstrong ? "text-green-400" : "text-red-400"}
                            />
                        </div>
                        <h2 className={`text-3xl font-bold mb-4 ${result.isArmstrong ? 'text-green-400' : 'text-red-400'}`}>
                            {result.isArmstrong ? 'Armstrong Number!' : 'Not an Armstrong Number'}
                        </h2>
                        <p className="text-slate-300 mb-8">
                            The number <span className="font-semibold text-white">{number}</span> {result.isArmstrong ? 'is' : 'is not'} an Armstrong number.
                        </p>
                        <div className="space-y-3">
                            <Button
                                onClick={() => {
                                    setResult(null);
                                    setNumber('');
                                }}
                                className="w-full"
                            >
                                Verify Another Number
                            </Button>
                            <Button
                                variant="secondary"
                                className="w-full"
                                onClick={() => window.location.href = '/dashboard'}
                            >
                                Go to Dashboard
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <FormContainer
            title="Armstrong Number Verifier"
            subtitle="Enter a number to check if it's an Armstrong number"
            icon={<Icon name="calculator" size="xl" className="text-white" />}
        >
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="number" className="block text-sm font-medium text-slate-300 mb-2">
                        Number to Verify
                    </label>
                    <Input
                        id="number"
                        name="number"
                        type="number"
                        placeholder="Enter a number (e.g., 153)"
                        value={number}
                        onChange={handleNumberChange}
                        error={error}
                        required
                        min="0"
                    />
                </div>

                <Button
                    type="submit"
                    loading={isLoading}
                    loadingText="Verifying..."
                    size="lg"
                    className="w-full"
                >
                    Verify Number
                </Button>
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
        </FormContainer>
    );
}

export default Verify;
