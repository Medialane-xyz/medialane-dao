"use client"

import Link from 'next/link'
import Image from "next/image"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function MedialaneLogo() {
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
          <div className="w-[196px] h-[34px]" />
        </Link>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-2">
      <Link href="/" className="transition-opacity hover:opacity-80 drop-shadow-md">
        {resolvedTheme === "dark" ? (
          <Image
            src="/medialane-light-logo.png"
            alt="Medialane"
            width={196}
            height={34}
            priority
          />
        ) : (
          <Image
            src="/medialane-dark-logo.png"
            alt="Medialane"
            width={196}
            height={34}
            priority
          />
        )}
      </Link>
    </div>
  )
}