'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

// Mock Data for Wizard
const STEPS = [
    { id: 1, label: 'Type', description: 'Select content format' },
    { id: 2, label: 'Details', description: 'Enter key information' },
    { id: 3, label: 'Enhance', description: 'AI tools' },
    { id: 4, label: 'Preview', description: 'Check appearance' },
    { id: 5, label: 'Submit', description: 'Review & publish' },
];

export default function CreateWizardPageWrapper() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CreateWizardPage />
        </Suspense>
    );
}

function CreateWizardPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const initialType = searchParams.get('type');

    const [currentStep, setCurrentStep] = useState(initialType ? 2 : 1);
    const [contentType, setContentType] = useState(initialType || '');
    const [formData, setFormData] = useState({
        title: '',
        summary: '',
        content: '',
        location: '',
        date: '',
    });

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

    const handleTypeSelect = (type: string) => {
        setContentType(type);
        nextStep();
    };

    return (
        <div className="max-w-6xl mx-auto py-8">
            {/* Wizard Progress Bar */}
            <div className="mb-12">
                <div className="flex justify-between relative">
                    {/* Progress Line Background */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -z-10 -translate-y-1/2 rounded-full" />

                    {/* Active Progress Line */}
                    <div
                        className="absolute top-1/2 left-0 h-1 bg-publisher-primary -z-10 -translate-y-1/2 rounded-full transition-all duration-500"
                        style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
                    />

                    {STEPS.map((step) => {
                        const isActive = step.id === currentStep;
                        const isCompleted = step.id < currentStep;

                        return (
                            <div key={step.id} className="flex flex-col items-center gap-2 bg-slate-50 px-2 cursor-pointer" onClick={() => setCurrentStep(step.id)}>
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-bold transition-all duration-300
                                        ${isActive ? 'border-publisher-primary bg-white text-publisher-primary scale-110 shadow-md' :
                                            isCompleted ? 'border-publisher-primary bg-publisher-primary text-white' :
                                                'border-slate-300 bg-white text-slate-400'}`}
                                >
                                    {isCompleted ? (
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        step.id
                                    )}
                                </div>
                                <div className="text-center">
                                    <p className={`text-sm font-bold ${isActive || isCompleted ? 'text-slate-900' : 'text-slate-400'}`}>{step.label}</p>
                                    <p className="text-xs text-slate-500 hidden md:block">{step.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Step Content */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 min-h-[400px]">
                {currentStep === 1 && <Step1SelectType onSelect={handleTypeSelect} />}
                {currentStep === 2 && <Step2Details type={contentType} data={formData} updateData={setFormData} />}
                {currentStep === 3 && <Step3Enhance data={formData} updateData={setFormData} />}
                {currentStep === 4 && <Step4Preview data={formData} type={contentType} />}
                {currentStep === 5 && <Step5Submit data={formData} />}
            </div>

            {/* Navigation Actions */}
            <div className="mt-8 flex justify-between">
                <button
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`px-6 py-2.5 rounded-lg font-medium border border-slate-300 text-slate-600 hover:bg-slate-50 transition-colors
                        ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Back
                </button>

                {currentStep < 5 ? (
                    <button
                        onClick={nextStep}
                        disabled={currentStep === 1 && !contentType}
                        className="px-6 py-2.5 rounded-lg font-medium bg-publisher-primary text-white hover:bg-publisher-primary-hover shadow-sm transition-all"
                    >
                        Next Step
                    </button>
                ) : (
                    <Link href="/publisher/dashboard" className="px-6 py-2.5 rounded-lg font-medium bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition-all">
                        Submit for Review
                    </Link>
                )}
            </div>
        </div>
    );
}

/* --- Step Components --- */

function Step1SelectType({ onSelect }: { onSelect: (t: string) => void }) {
    const types = [
        { id: 'article', title: 'News Article', icon: '📰' },
        { id: 'event', title: 'Event', icon: '📅' },
        { id: 'deal', title: 'Deal / Savings', icon: '🏷️' },
        { id: 'job', title: 'Job Listing', icon: '💼' },
    ];
    return (
        <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Select Content Type</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {types.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => onSelect(t.id)}
                        className="flex flex-col items-center gap-4 p-6 rounded-xl border border-slate-200 hover:border-publisher-primary hover:bg-publisher-primary/5 hover:scale-105 transition-all text-slate-700 hover:text-publisher-primary"
                    >
                        <span className="text-4xl">{t.icon}</span>
                        <span className="font-bold">{t.title}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

function Step2Details({ type, data, updateData }: { type: string; data: any; updateData: any }) {
    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-2 mb-6">
                <span className="bg-publisher-primary/10 text-publisher-primary px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide">{type}</span>
                <h2 className="text-2xl font-bold text-slate-900">Enter Details</h2>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Post Title</label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => updateData({ ...data, title: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-publisher-primary focus:ring-2 focus:ring-publisher-primary/20 outline-none transition-all"
                        placeholder="e.g. Summer Community Picnic"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Summary (Short Description)</label>
                    <textarea
                        value={data.summary}
                        onChange={(e) => updateData({ ...data, summary: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-publisher-primary focus:ring-2 focus:ring-publisher-primary/20 outline-none transition-all h-24 resize-none"
                        placeholder="Briefly describe what this post is about..."
                    />
                    <p className="text-right text-xs text-slate-400 mt-1">{data.summary.length}/280</p>
                </div>

                {/* Mock Rich Text Editor */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Detailed Content</label>
                    <div className="border border-slate-300 rounded-lg overflow-hidden focus-within:border-publisher-primary focus-within:ring-2 focus-within:ring-publisher-primary/20 transition-all mb-4">
                        <div className="bg-slate-50 border-b border-slate-200 p-2 flex gap-2">
                            <div className="w-6 h-6 bg-slate-200 rounded animate-pulse" />
                            <div className="w-6 h-6 bg-slate-200 rounded animate-pulse" />
                            <div className="w-1 h-6 bg-slate-300 mx-1" />
                            <div className="w-6 h-6 bg-slate-200 rounded animate-pulse" />
                        </div>
                        <textarea
                            value={data.content}
                            onChange={(e) => updateData({ ...data, content: e.target.value })}
                            className="w-full px-4 py-3 h-48 outline-none resize-none"
                            placeholder="Type your full story here..."
                        />
                    </div>
                </div>

                {/* File Upload */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Attachments</label>
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 hover:border-publisher-primary hover:bg-publisher-primary/5 transition-all text-center cursor-pointer group">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-publisher-primary/10 transition-colors">
                            <svg className="w-6 h-6 text-slate-400 group-hover:text-publisher-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                        </div>
                        <p className="text-sm font-medium text-slate-700">Click to upload or drag and drop</p>
                        <p className="text-xs text-slate-500 mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Step3Enhance({ data, updateData }: { data: any; updateData: any }) {
    const [isGeneratingText, setIsGeneratingText] = useState(false);
    const [textError, setTextError] = useState('');
    const [isGeneratingImage, setIsGeneratingImage] = useState(false);
    const [imagePrompt, setImagePrompt] = useState(data.title ? `Editorial illustration for: ${data.title}` : '');
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);

    const handleRewrite = async (tone: string) => {
        setIsGeneratingText(true);
        setTextError('');
        try {
            const prompt = `Rewrite the following summary to be more ${tone.toLowerCase()}:\n\n${data.summary || data.title}`;
            const { generateText } = await import('@/app/actions/ai-actions'); // Dynamic import to avoid server action issues if any
            const result = await generateText(prompt);

            if (result.error) {
                setTextError(result.error);
            } else if (result.text) {
                updateData({ ...data, summary: result.text });
            }
        } catch (e) {
            setTextError('Failed to generate text.');
        } finally {
            setIsGeneratingText(false);
        }
    };

    const handleGenerateImage = async () => {
        setIsGeneratingImage(true);
        try {
            const { generateImage } = await import('@/app/actions/ai-actions');
            const result = await generateImage(imagePrompt);
            if (result.success && result.imageUrl) {
                setGeneratedImage(result.imageUrl);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsGeneratingImage(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            {/* Left: Preview */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-4">Current Draft</h3>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                    <h4 className="font-bold text-lg text-slate-900 mb-2">{data.title || 'Untitled Post'}</h4>
                    <p className="text-slate-600 text-sm mb-4">{data.summary || 'No summary provided yet...'}</p>
                    <div className="h-32 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 text-sm overflow-hidden">
                        {generatedImage ? (
                            <img src={generatedImage} alt="Generated Preview" className="w-full h-full object-cover" />
                        ) : (
                            'Featured Image Placeholder'
                        )}
                    </div>
                </div>
            </div>

            {/* Right: AI Tools */}
            <div className="bg-publisher-primary/5 rounded-xl p-6 space-y-6">
                <div className="flex items-center gap-2 text-publisher-primary mb-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    <h3 className="font-bold text-lg">Nanno Banno Pro</h3>
                </div>

                <div className="space-y-4">
                    {/* Text Assistant */}
                    <div className="bg-white p-4 rounded-lg border border-publisher-accent shadow-sm">
                        <label className="text-sm font-medium text-slate-700 block mb-2">Text Assistant</label>
                        <p className="text-xs text-slate-500 mb-3">Rewrite or improve your summary using Gemini AI.</p>
                        <div className="flex gap-2 mb-3">
                            {['Professional', 'Casual', 'Punchy'].map((tone) => (
                                <button
                                    key={tone}
                                    onClick={() => handleRewrite(tone)}
                                    disabled={isGeneratingText}
                                    className="px-2 py-1 bg-white text-slate-600 text-xs font-bold rounded border border-slate-200 hover:border-publisher-primary hover:text-publisher-primary transition-colors"
                                >
                                    {tone}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => handleRewrite('Improve this summary')}
                            disabled={isGeneratingText}
                            className="w-full py-1.5 text-sm bg-publisher-primary text-white rounded hover:bg-publisher-primary-hover transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
                        >
                            {isGeneratingText ? (
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : 'Generate Rewrite'}
                        </button>
                        {textError && <p className="text-xs text-red-500 mt-2">{textError}</p>}
                    </div>

                    {/* Image Generation */}
                    <div className="bg-white p-4 rounded-lg border border-publisher-accent shadow-sm">
                        <label className="text-sm font-medium text-slate-700 block mb-2">Image Generation</label>
                        <p className="text-xs text-slate-500 mb-3">Generate a unique image for your article.</p>

                        <textarea
                            value={imagePrompt}
                            onChange={(e) => setImagePrompt(e.target.value)}
                            className="w-full text-sm p-3 border border-slate-200 rounded-lg mb-3 h-20 resize-none focus:border-publisher-primary/50 outline-none"
                            placeholder="Describe the image you want..."
                        />

                        <button
                            onClick={handleGenerateImage}
                            disabled={isGeneratingImage || !imagePrompt}
                            className="w-full py-2 text-sm font-medium bg-publisher-primary text-white rounded-lg hover:bg-publisher-primary-hover transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {isGeneratingImage ? (
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    Generate Image
                                </>
                            )}
                        </button>

                        {generatedImage && (
                            <div className="mt-3 rounded-lg overflow-hidden border border-slate-200 aspect-video relative group">
                                <img src={generatedImage} alt="Generated" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="px-3 py-1 bg-white text-xs font-bold rounded text-slate-900">Use This</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function Step4Preview({ data, type }: { data: any; type: string }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Feed Preview */}
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden max-w-xl mx-auto">
                    {/* Preview Header */}
                    <div className="px-4 py-3 flex items-center gap-3 border-b border-slate-50">
                        <div className="w-10 h-10 rounded-full bg-slate-200" />
                        <div>
                            <p className="font-bold text-sm text-slate-900">Jane Publisher</p>
                            <p className="text-xs text-slate-500">Just now • {type}</p>
                        </div>
                    </div>
                    {/* Preview Content */}
                    <div className="p-4">
                        <h2 className="text-xl font-bold text-slate-900 mb-2">{data.title || 'Your Title Here'}</h2>
                        <p className="text-slate-600 text-sm mb-4 leading-relaxed">{data.summary || 'Summary text will appear here...'}</p>
                        <div className="bg-slate-100 rounded-lg aspect-video flex items-center justify-center text-slate-400 mb-4">
                            Image Area
                        </div>
                        <div className="text-slate-900 text-sm">{data.content}</div>
                    </div>
                    {/* Preview Actions */}
                    <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex gap-4 text-slate-500 text-sm font-medium">
                        <span>❤️ Like</span>
                        <span>💬 Comment</span>
                        <span>↗️ Share</span>
                    </div>
                </div>
            </div>

            {/* Checklist */}
            <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm sticky top-4">
                    <h3 className="font-bold text-slate-900 mb-4">Publishing Checklist</h3>
                    <ul className="space-y-3">
                        <CheckItem label="Content drafted" checked={!!data.title && !!data.content} />
                        <CheckItem label="Summary added" checked={!!data.summary} />
                        <CheckItem label="Images selected" checked={false} />
                        <CheckItem label="SEO tags" checked={false} />
                        <CheckItem label="Visibility: Public" checked={true} />
                    </ul>
                </div>
            </div>
        </div>
    );
}

function CheckItem({ label, checked }: { label: string; checked: boolean }) {
    return (
        <li className="flex items-center gap-2 text-sm">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${checked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 text-transparent'}`}>
                ✓
            </div>
            <span className={checked ? 'text-slate-700' : 'text-slate-400'}>{label}</span>
        </li>
    );
}

function Step5Submit({ data }: { data: any }) {
    return (
        <div className="text-center max-w-lg mx-auto py-8">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">Ready to Submit?</h2>
            <p className="text-slate-500 mb-8">You are about to submit this content for review. It will be published once approved.</p>

            <div className="bg-slate-50 p-6 rounded-xl text-left border border-slate-200 mb-8">
                <h4 className="font-bold text-slate-900 mb-1">{data.title}</h4>
                <p className="text-sm text-slate-500">{data.summary}</p>
            </div>

            <textarea
                className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:border-publisher-primary outline-none mb-6 h-24 resize-none"
                placeholder="Add a note to the reviewer (optional)..."
            />
        </div>
    );
}
