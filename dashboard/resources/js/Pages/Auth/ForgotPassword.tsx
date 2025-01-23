import { Button } from '@/Components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <DefaultLayout>
            <Head title="Forgot Password" />

            <div className={'flex flex-col gap-6'}>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            Forgot Password
                        </CardTitle>
                        <CardDescription>
                            Enter your email address and we'll send you a
                            password reset link
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit}>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        autoComplete="email"
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                        placeholder="name@example.com"
                                        tabIndex={1}
                                    />
                                    {errors.email && (
                                        <div className="text-sm text-red-500">
                                            {errors.email}
                                        </div>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={processing}
                                >
                                    {processing
                                        ? 'Sending link...'
                                        : 'Send Reset Link'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </DefaultLayout>
    );
}
