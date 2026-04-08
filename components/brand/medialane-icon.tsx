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
            <div className="flex items-center">
                <div className="w-7 h-7" />
            </div>
        )
    }

    return (
        <div className="flex items-center">
            <Link href="/" className="transition-opacity hover:opacity-80">
                <Image
                    src="/medialane-icon.png"
                    alt="Medialane"
                    width={28}
                    height={28}
                    priority
                />
            </Link>
        </div>
    )
}