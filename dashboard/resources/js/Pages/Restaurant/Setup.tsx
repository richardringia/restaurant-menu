import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';

export default function Setup() {
    return (
        <GuestLayout>
            <Head title="Restaurant Setup" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h1 className="mb-4 text-2xl font-semibold">
                                Restaurant Setup
                            </h1>
                            <p>Please set up your restaurant to continue.</p>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
