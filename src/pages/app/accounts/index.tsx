import { useRouter } from 'next/router';
import { useEffect } from 'react'

export default function Accounts() {
    const router = useRouter();
    useEffect(() => {
        location.href = "/app/accounts/wallet-activity";
    }, [router])
    return null
}
