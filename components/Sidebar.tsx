"use client";

import React, { useState } from "react";
import { LayoutDashboard, Layout, Menu, Trello } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ReactElement;
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  {
    icon: <LayoutDashboard className="size-6" />,
    href: "/dashboard",
    label: "Dashboard",
  },
  {
    icon: <Layout className="size-6" />,
    href: "/layout",
    label: "Layout",
  },
];

// Separate mobile toggle component
const MobileMenuToggle = ({ onClick }: { onClick: () => void }) => (
  <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b z-50 sm:hidden">
    <button
      onClick={onClick}
      className="absolute top-1/2 -translate-y-1/2 left-4 p-2 hover:bg-gray-100 rounded-md"
      aria-label="Toggle Menu"
    >
      <Menu className="h-6 w-6" />
    </button>
  </div>
);

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Menu Button - Only visible below sm breakpoint */}
      <MobileMenuToggle onClick={() => setIsOpen(!isOpen)} />

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed top-0 h-screen bg-white border-r shadow-sm transition-all duration-300 z-40",
            // Mobile styles (below sm)
            "mt-16 sm:mt-0",
            isOpen ? "left-0 w-64" : "-left-full",
            // Desktop styles (sm and above)
            "sm:left-0",
            isOpen ? "sm:w-64" : "sm:w-20"
          )}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {/* Logo */}
          <div className="h-16 flex items-center px-5 my-5">
            <div className="w-full flex items-center text-blue-500">
              <div className="flex items-center justify-center w-8">
                <Trello className="h-8 w-8" />
              </div>
              <div
                className={cn(
                  "ml-3 font-semibold transition-all duration-300 overflow-hidden text-xl italic",
                  isOpen ? "w-40 opacity-100" : "w-0 opacity-0"
                )}
              >
                Trackify
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="space-y-2 px-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 p-2.5 rounded-md text-sm font-medium transition-all",
                    !isOpen && "justify-center",
                    isActive
                      ? "bg-gray-50 text-muted-foreground"
                      : "text-gray-500 hover:bg-gray-100 hover:text-muted-foreground"
                  )}
                >
                  <span
                    className={`flex-shrink-0 ${isActive && "text-blue-500"}`}
                  >
                    {item.icon}
                  </span>
                  <span
                    className={cn(
                      "transition-all duration-300 overflow-hidden text-base",
                      isOpen ? "w-32 opacity-100" : "w-0 opacity-0"
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Mobile Overlay - Only visible below sm breakpoint when sidebar is open */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-30 sm:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    </>
  );
};

export default Sidebar;
