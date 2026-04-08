"use client"

import Link from 'next/link'
import Image from "next/image"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function MedialaneIcon() {
    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="flex items-center space-x-2">
                <Link href="/">
                    <div className="w-[256px] h-[256px]" />
                </Link>
            </div>
        )
    }

    return (
        <div className="flex items-center space-x-2">
            <Link href="/" className="transition-opacity hover:opacity-80 drop-shadow-md">
                <Image
                    src="/icon.png"
                    alt="Medialane"
                    width={256}
                    height={256}
                    priority
                />
            </Link>
        </div>
    )
}