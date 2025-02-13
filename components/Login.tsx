'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {login} from "../lib/weblog";

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please fill in both fields.");
            return;
        }
    //
        setIsLoading(true);

        toast.promise(
            () => {
                return login({
                    input: {
                        email: email,
                        password
                    }
                })
            },
            {
                loading: "Logging in...",
                success: () => {
                    setIsLoading(false);
                    return "Login Successfully!"
                },
                error: (error) => {
                    setIsLoading(false);
                    return error.message
                }
            }
        )
            .then(async (result) => {
                router.push(`/`)
                router.refresh()
            })

    };

    return (
        <div className="flex items-center justify-center h-full">
            <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg mt-4 dark:bg-gray-800">
                <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200">Login</h2>
                <form className="mt-6 space-y-4"
                      onSubmit={handleLogin}
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
                        <input
                            type="email"
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
                        <input
                            type="password"
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition duration-300"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <svg className="w-5 h-5 animate-spin mr-2" fill="none" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                                <path fill="white" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                        ) : null}
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login