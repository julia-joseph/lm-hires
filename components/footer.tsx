"use client";

export function Footer() {
  return (
    <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs h-10">
      @ {new Date().getFullYear()} Lingomentor GmbH. All rights reserved.
    </footer>
  );
}
