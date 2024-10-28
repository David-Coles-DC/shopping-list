import SignUpForm from '@/components/forms/SignUp';

export default function SignUp() {
    return <main className={'relative h-full pt-14'}>
        <div className={'absolute left-1/2 transform -translate-x-1/2'}>
            <div>
                <SignUpForm />
            </div>
        </div>
    </main>
}