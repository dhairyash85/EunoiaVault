"use client";

import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/next";
import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Provider } from "react-redux";

import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { JokeOfTheDay } from "@/components/joke-of-the-day";
import { ChainbotPopup } from "@/components/ChainbotPopup";
import store from "@/redux/store";
import useWalletLogin from "@/hooks/useWalletLogin";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

// --- Helper Components for Icons ---
const BurgerIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    height="1.2em"
    width="1.2em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    height="1.2em"
    width="1.2em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// --- Navigation Items Array ---
const navItems = [
  { href: "/", label: "Home" },
  { href: "/input", label: "Check-In" },
  { href: "/chatbot", label: "AI Chat" },
  { href: "/calendar", label: "Calendar" },
  { href: "/meditation", label: "Meditation" },
  { href: "/stake", label: "Stake" },
  { href: "/fitbit", label: "Fitbit" },
  { href: "/mini-games", label: "Mini Games" },
  { href: "/events", label: "Events" },
  { href: "/helpline", label: "Helpline" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const { connectWallet } = useWalletLogin();
  useEffect(() => {
    connectWallet();
  }, [connectWallet]);

  return (
    <html lang="en" suppressHydrationWarning>
      <Provider store={store}>
        <ClerkProvider>
          <body
            className={`${inter.className} min-h-screen bg-cover bg-center`}
          >
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <div className="flex flex-col min-h-screen px-4">
                <header className="sticky top-0 z-40 w-full border-b backdrop-blur ">
                  <div className="container flex justify-between items-center h-16 mx-auto px-1 gap-6 md:gap-10">
                    <Link href="/" className="flex items-center space-x-2">
                      <Image
                        src="/logo.png"
                        width={50}
                        height={50}
                        alt="Eunoia Vault Logo"
                      />
                      <span className="inline-block font-bold text-xl">
                        Eunoia Vault
                      </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex gap-6">
                      {navItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`flex items-center text-sm font-medium text-muted-foreground hover:text-primary ${
                            isActive(item.href)
                              ? "border-b-2 border-primary"
                              : ""
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </nav>

                    {/* Right side controls */}
                    <div className="flex items-center gap-4">
                      <ModeToggle />
                      <div className="hidden md:block">
                        <SignedOut>
                          <SignInButton mode="modal">
                            <Button variant="outline">Sign In</Button>
                          </SignInButton>
                        </SignedOut>
                        <SignedIn>
                          <UserButton />
                        </SignedIn>
                      </div>
                      {/* Mobile Menu Button */}
                      <div className="md:hidden">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setIsMenuOpen(true)}
                        >
                          <BurgerIcon />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </header>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                  <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm md:hidden animate-in fade-in-20">
                    <div className="container flex flex-col items-center justify-center h-full">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 right-4"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <CloseIcon />
                        <span className="sr-only">Close menu</span>
                      </Button>

                      <nav className="flex flex-col items-center gap-6 text-lg">
                        {navItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className={`font-medium hover:text-primary ${
                              isActive(item.href)
                                ? "text-primary"
                                : "text-muted-foreground"
                            }`}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </nav>
                      <div className="mt-8">
                        <SignedOut>
                          <SignInButton mode="modal">
                            <Button
                              variant="outline"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Sign In
                            </Button>
                          </SignInButton>
                        </SignedOut>
                        <SignedIn>
                          <UserButton afterSignOutUrl="/" />
                        </SignedIn>
                      </div>
                    </div>
                  </div>
                )}

                <main className="flex-1">
                  <div className="container w-full mx-auto h-full pt-6 md:pt-12 pb-16">
                    {children}
                    <Analytics />
                  </div>
                </main>

                <footer className="py-6 md:px-8 md:py-0">
                  <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                      Built with care by Chaggots. Always seek professional help
                      in crisis situations.
                    </p>
                  </div>
                </footer>
              </div>
              <ChainbotPopup />
              <JokeOfTheDay />
            </ThemeProvider>
          </body>
          <Toaster />
        </ClerkProvider>
      </Provider>
    </html>
  );
}
