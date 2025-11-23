import React, { useState, useEffect } from 'react';
import { Leaf, User, LogOut, Upload, X, Activity, Loader, AlertCircle, CheckCircle } from 'lucide-react';

const Dashboard = ({ user, onLogout }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [dragActive, setDragActive] = useState(false);

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file) => {
        if (!file.type.startsWith('image/')) {
            setError("Please upload a valid image file (JPG, PNG).");
            return;
        }
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
        setResult(null);
        setError(null);
    };

    const clearSelection = () => {
        setSelectedFile(null);
        setPreview(null);
        setResult(null);
        setError(null);
    };

    const sendFileToBackend = async () => {
        if (!selectedFile) return;
        setIsLoading(true);
        setError(null);

        // MOCK BACKEND CALL
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            const mockOutcomes = [
                { class: 'Potato___Early_blight', confidence: 0.94, recommendations: "Use copper-based fungicides and improve air circulation." },
                { class: 'Potato___Late_blight', confidence: 0.89, recommendations: "Remove infected leaves immediately. Use fungicides like Mancozeb." },
                { class: 'Potato___Healthy', confidence: 0.99, recommendations: "Keep maintaining good watering and soil practices." }
            ];
            const index = selectedFile.name.length % 3;
            setResult(mockOutcomes[index]);
        } catch (err) {
            setError("An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    const formatClassName = (name) => name.replace('Potato___', '').replace('_', ' ');

    const getStatusColor = (className) => {
        if (className.includes('Healthy')) return 'text-green-600 bg-green-50 border-green-200';
        if (className.includes('Early_blight')) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
        return 'text-red-600 bg-red-50 border-red-200';
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
            <header className="bg-emerald-700 text-white shadow-lg">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Leaf className="h-8 w-8" />
                        <h1 className="text-2xl font-bold tracking-tight">AgroAI Doctor</h1>
                    </div>
                    <div className="flex items-center space-x-6">
                        <div className="hidden md:flex items-center space-x-2 text-emerald-100 bg-emerald-800 px-3 py-1 rounded-full text-sm">
                            <User size={16} />
                            <span>{user?.name || 'User'}</span>
                        </div>
                        <button onClick={onLogout} className="flex items-center space-x-1 text-emerald-100 hover:text-white text-sm font-medium">
                            <LogOut size={18} />
                            <span className="hidden md:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-slate-900 mb-3">New Analysis</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Upload a photo of a potato plant leaf to begin diagnosis.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Left Column: Upload */}
                    <div className="space-y-6">
                        <div
                            className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 ease-in-out flex flex-col items-center justify-center text-center h-80
                ${dragActive ? 'border-emerald-500 bg-emerald-50 scale-[1.02]' : 'border-slate-300 bg-white hover:border-emerald-400'}
                ${selectedFile ? 'border-none p-0 overflow-hidden bg-slate-900' : ''}
              `}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            {preview ? (
                                <>
                                    <img src={preview} alt="Preview" className="w-full h-full object-contain" />
                                    <button onClick={clearSelection} className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors">
                                        <X size={20} />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                                        <Upload size={32} />
                                    </div>
                                    <p className="text-lg font-semibold text-slate-700">Drag & Drop leaf image</p>
                                    <p className="text-sm text-slate-400 mt-2 mb-6">or</p>
                                    <label className="cursor-pointer px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors shadow-sm">
                                        Browse Files
                                        <input type="file" className="hidden" accept="image/*" onChange={handleChange} />
                                    </label>
                                </>
                            )}
                        </div>

                        {selectedFile && !result && !isLoading && (
                            <button onClick={sendFileToBackend} className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-md flex items-center justify-center space-x-2">
                                <Activity size={20} /> <span>Analyze Leaf</span>
                            </button>
                        )}

                        {isLoading && (
                            <div className="w-full py-3.5 bg-slate-100 text-slate-500 font-medium rounded-xl flex items-center justify-center space-x-3 cursor-not-allowed">
                                <Loader className="animate-spin" size={20} /> <span>Processing Image...</span>
                            </div>
                        )}

                        {error && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3 text-red-700">
                                <AlertCircle className="shrink-0 mt-0.5" size={20} /> <p className="text-sm">{error}</p>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Result */}
                    <div className="relative">
                        {!result ? (
                            <div className="h-80 rounded-xl border border-slate-200 bg-white p-8 flex flex-col items-center justify-center text-center text-slate-400">
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                    <Leaf size={40} className="opacity-20 text-slate-900" />
                                </div>
                                <p className="text-lg font-medium">No Analysis Yet</p>
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="bg-slate-50 p-6 border-b border-slate-100">
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Result</h3>
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-2xl font-bold text-slate-900">{formatClassName(result.class)}</h2>
                                        <div className={`px-3 py-1 rounded-full text-sm font-bold border ${getStatusColor(result.class)}`}>
                                            {(result.confidence * 100).toFixed(1)}%
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 space-y-6">
                                    <div>
                                        <div className="flex justify-between text-sm mb-2 font-medium text-slate-600">
                                            <span>Confidence</span>
                                            <span>{(result.confidence * 100).toFixed(1)}%</span>
                                        </div>
                                        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                                            <div className={`h-2.5 rounded-full ${result.class.includes('Healthy') ? 'bg-emerald-500' : 'bg-red-500'}`} style={{ width: `${result.confidence * 100}%` }}></div>
                                        </div>
                                    </div>
                                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                                        <h4 className="font-semibold text-slate-900 mb-2 flex items-center">
                                            <CheckCircle size={16} className="mr-2 text-emerald-600" /> Recommendation
                                        </h4>
                                        <p className="text-sm text-slate-600 leading-relaxed">{result.recommendations}</p>
                                    </div>
                                    <button onClick={clearSelection} className="w-full py-3 bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors">
                                        Analyze Another Leaf
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
