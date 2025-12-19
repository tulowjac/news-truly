import React from "react";
import { PLANS } from "@/lib/mock-data";

export default function BillingPage() {
    return (
        <div className="max-w-5xl mx-auto space-y-10">
            <div>
                <h1 className="text-3xl font-serif font-bold text-slate-900">Billing & Subscription</h1>
                <p className="text-slate-500 mt-1">Manage your plan and billing details.</p>
            </div>

            {/* Current Plan Card */}
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                    <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wide">Current Plan</h2>
                    <p className="text-3xl font-bold text-slate-900 mt-1">Free Tier</p>
                </div>
                <button className="text-publisher-primary hover:text-publisher-primary-hover font-medium">
                    Manage Subscription
                </button>
            </div>

            <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900">Available Plans</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {PLANS.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative bg-white p-8 rounded-xl border flex flex-col h-full
                                ${plan.highlight
                                    ? 'border-publisher-primary ring-1 ring-publisher-primary/20 shadow-md'
                                    : 'border-slate-200 shadow-sm'}`}
                        >
                            {plan.highlight && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-publisher-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                    Recommended
                                </span>
                            )}
                            <div className="mb-6">
                                <h3 className={`font-bold text-lg ${plan.highlight ? 'text-publisher-primary' : 'text-slate-900'}`}>
                                    {plan.name}
                                </h3>
                                <div className="mt-2 flex items-baseline">
                                    {typeof plan.price === 'number' ? (
                                        <>
                                            <span className="text-4xl font-bold text-slate-900">${plan.price}</span>
                                            <span className="text-slate-500 ml-1">/mo</span>
                                        </>
                                    ) : (
                                        <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                                    )}
                                </div>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                                        <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full py-2.5 rounded-lg font-medium transition-all duration-200
                                ${plan.highlight
                                    ? 'bg-publisher-primary text-white hover:bg-publisher-primary-hover shadow-sm'
                                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'}`}>
                                {plan.cta}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
