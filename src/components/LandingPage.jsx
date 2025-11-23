import React from 'react';
import { Leaf, Sprout, ArrowRight, AlertCircle, Activity, CheckCircle } from 'lucide-react';

const LandingPage = ({ onNavigate }) => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            {/* Landing Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2 text-emerald-700">
                        <Leaf className="h-8 w-8" />
                        <span className="text-xl font-bold tracking-tight">AgroAI Doctor</span>
                    </div>
                    <div className="space-x-4">
                        <button
                            onClick={() => onNavigate('login')}
                            className="text-slate-600 hover:text-emerald-600 font-medium transition-colors"
                        >
                            Log In
                        </button>
                        <button
                            onClick={() => onNavigate('signup')}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg font-medium transition-colors shadow-sm"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <main className="flex-grow">
                <div className="container mx-auto px-6 py-20 md:py-32 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 space-y-8">
                        <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold">
                            <Sprout size={16} />
                            <span>AI-Powered Agriculture</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight">
                            Protect Your Crops with <span className="text-emerald-600">Deep Learning</span>
                        </h1>
                        <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
                            Instantly detect potato leaf diseases like Early Blight and Late Blight.
                            Upload a photo and get real-time diagnosis and treatment recommendations.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button
                                onClick={() => onNavigate('signup')}
                                className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:-translate-y-1 shadow-lg flex items-center justify-center space-x-2"
                            >
                                <span>Get Started Free</span>
                                <ArrowRight size={20} />
                            </button>
                            <button
                                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                                className="bg-white border-2 border-slate-200 text-slate-700 hover:border-emerald-500 hover:text-emerald-600 px-8 py-4 rounded-xl font-bold text-lg transition-all"
                            >
                                Learn More
                            </button>
                        </div>
                    </div>

                    {/* Hero Illustration (Abstract Cards) */}
                    <div className="md:w-1/2 mt-16 md:mt-0 relative">
                        <div className="relative z-10 bg-white p-6 rounded-2xl shadow-2xl border border-slate-100 max-w-md mx-auto transform rotate-3 hover:rotate-0 transition-transform duration-500">
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                                    <AlertCircle size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">Early Blight Detected</h3>
                                    <p className="text-sm text-slate-500">Confidence: 94.2%</p>
                                </div>
                            </div>
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-yellow-500 w-[94%]"></div>
                            </div>
                        </div>

                        <div className="absolute top-10 right-10 -z-10 bg-emerald-100 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                        <div className="absolute -bottom-8 left-20 -z-10 bg-purple-100 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                    </div>
                </div>

                {/* Features Section */}
                <div id="features" className="bg-slate-100 py-20">
                    <div className="container mx-auto px-6">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why use AgroAI Doctor?</h2>
                            <p className="text-slate-600">Our advanced Convolutional Neural Network (CNN) model is trained on the PlantVillage dataset to provide lab-quality diagnostics in seconds.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { icon: <Activity className="text-blue-600" />, title: "Instant Results", desc: "Get prediction results in milliseconds. No need to wait for lab reports." },
                                { icon: <CheckCircle className="text-emerald-600" />, title: "98% Accuracy", desc: "Trained on thousands of images to distinguish between healthy and diseased leaves." },
                                { icon: <Leaf className="text-purple-600" />, title: "Smart Recommendations", desc: "Receive actionable advice on fungicides and care immediately after detection." }
                            ].map((feature, idx) => (
                                <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                                    <div className="h-12 w-12 bg-slate-50 rounded-lg flex items-center justify-center mb-6">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <footer className="bg-slate-900 text-slate-400 py-12">
                <div className="container mx-auto px-6 text-center">
                    <div className="flex items-center justify-center space-x-2 text-white mb-4">
                        <Leaf className="h-6 w-6" />
                        <span className="text-lg font-bold">AgroAI Doctor</span>
                    </div>
                    <p className="mb-8">Empowering farmers with Artificial Intelligence.</p>
                    <div className="text-sm border-t border-slate-800 pt-8">
                        © 2024 AgroAI Doctor. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
