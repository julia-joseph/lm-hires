export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
      @ {year} Lingomentor GmbH. All rights reserved.
    </footer>
  );
}
