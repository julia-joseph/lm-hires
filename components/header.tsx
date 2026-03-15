import { hasEnvVars } from "@/lib/utils";
import { Suspense } from "react";
import { AuthButton } from "./auth-button";
import { EnvVarWarning } from "./env-var-warning";
import { ThemeSwitcher } from "./theme-switcher";
import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-7xl flex justify-between items-center p-3 px-5 text-sm">
        <div className="flex gap-5 items-center font-semibold">
          <Link href={"/"} className="flex items-center gap-2">
            <Image
              alt="Lingomentor Logo"
              src="/logo.svg"
              width={110}
              height={40}
              className="logo-image"
            />{" "}
            <h1 className="text-xl font-light uppercase tracking-widest">
              Careers
            </h1>
          </Link>
        </div>
        {/* <ThemeSwitcher /> */}

        {!hasEnvVars ? (
          <EnvVarWarning />
        ) : (
          <Suspense>
            <AuthButton />
          </Suspense>
        )}
      </div>
    </nav>
  );
}
