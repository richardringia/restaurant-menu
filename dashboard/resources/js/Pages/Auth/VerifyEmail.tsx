import { Button } from '@/Components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <DefaultLayout>
            <Head title="Email Verification" />

            <div className={'flex flex-col gap-6'}>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Verify Email</CardTitle>
                        <CardDescription>
                            Thanks for signing up! Before getting started, could
                            you verify your email address by clicking on the
                            link we just emailed to you? If you didn't receive
                            the email, we will gladly send you another.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {status === 'verification-link-sent' && (
                            <div className="mb-4 text-sm font-medium text-green-600">
                                A new verification link has been sent to the
                                email address you provided during registration.
                            </div>
                        )}

                        <form onSubmit={submit}>
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center justify-between">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full"
                                    >
                                        {processing
                                            ? 'Sending...'
                                            : 'Resend Verification Email'}
                                    </Button>
                                </div>

                                <div className="text-center">
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="text-sm text-gray-600 underline underline-offset-4 hover:text-gray-900"
                                    >
                                        Log Out
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </DefaultLayout>
    );
}
