import Link from 'next/link';

export default function RegisterPage() {
    return (
        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-xl text-center">
            <h2 className="text-xl font-bold mb-6">Create an Account</h2>

            <div className="space-y-4">
                <Link href="/subscribe" className="block w-full py-4 border-2 border-slate-100 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all group">
                    <div className="text-2xl mb-1">📖</div>
                    <div className="font-bold text-slate-900">I am a Reader</div>
                    <div className="text-sm text-slate-500">Get personalized news for free</div>
                </Link>

                <Link href="/publisher/onboarding" className="block w-full py-4 border-2 border-slate-100 rounded-xl hover:border-publisher-primary hover:bg-blue-50 transition-all group">
                    <div className="text-2xl mb-1">📢</div>
                    <div className="font-bold text-slate-900">I am a Publisher</div>
                    <div className="text-sm text-slate-500">Post news, events, and deals</div>
                </Link>
            </div>

            <div className="mt-6 text-center text-sm text-slate-500">
                Already have an account? <Link href="/login" className="text-blue-600 font-bold hover:underline">Sign in</Link>
            </div>
        </div>
    );
}
