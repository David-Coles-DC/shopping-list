import LogInForm from '@/components/forms/LogIn';

export default function LogIn() {
    return <main className={'relative h-full pt-14'}>
        <div className={'absolute left-1/2 transform -translate-x-1/2'}>
            <div>
                <LogInForm/>
            </div>
        </div>
    </main>
}