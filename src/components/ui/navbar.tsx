'use client';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { useEffect, useState, useRef } from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
// Simple logo component for the navbar
const Logo = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg
    viewBox="0 0 734 638"
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinejoin: "round",
      strokeMiterlimit: 2,
    }}
    fill='currentColor'
    width={"1em"}
    height={"1em"}
    strokeWidth={10}
    {...props}
  >
    <path
      d="m480.973 119.859-.003.001c-12.961 3.64-22.295 9.281-31.861 19.508-14.589 15.597-21.055 38.155-15.582 64.404-24.015 7.389-36.236 18.554-44.163 33.116l-.001.002c-6.95 12.771-9.094 32.236-4.597 47.572 2.784 9.492 9.106 21.155 17.708 31.698-7.172 4.29-12.448 8.858-17.279 14.133-10.336 11.286-15.459 23.132-16.645 37.909-1.111 13.83 3.313 31.077 12.662 45.077 6.806 10.191 22.511 25.444 35.085 33.652h.001c7.106 4.639 14.229 8.128 15.455 8.55l-1.551-.562 22.937 10.249q1.378.619 2.812 1.096c74.057 24.633 134.902 32.835 182.416 30.975 18.507-.725 31.67-7.998 42.367-18.316 6.849-6.608 11.283-16.056 13.011-25.562 1.729-9.512.761-18.428.761-18.428a30 30 0 0 0-.549-3.386c-.877-3.953-1.852-8.225-2.835-12.417 23.057-4.202 42.519-11.942 59.198-23.023l.002-.001c26.939-17.9 43.239-41.239 51.797-75.667v-.002c2.314-9.31 3.054-14.812 3.061-33.427.006-18.022-.72-24.053-2.898-33.322-6.678-28.432-17.841-49.949-39.224-74.561-7.489-8.621-25.097-23.729-35.969-30.763h-.001c-12.04-7.789-30.864-16.787-44.337-21.2-6.566-2.152-17.842-5.102-25.059-6.55-11.425-2.292-17.133-2.856-36.791-2.79-19.371.064-25.671.731-35.852 2.898-11.809 2.514-24.571 6.51-34.547 10.616-9.54-4.574-21.977-9.469-28.697-11.131-13.069-3.233-31.163-3.062-40.832-.348"
      style={{
        fill: "#fff",
      }}
      transform="translate(-618.371 -197.744)scale(1.67861)"
    />
    <path d="M202.51 51.592c-12.42 3.488-21.32 8.965-30.487 18.765-20.632 22.057-21.315 57.403-1.885 97.47 3.26 6.723 5.583 12.566 5.163 12.986-.418.42-9.397 2.244-19.949 4.055-43.942 7.54-64.977 18.287-76.217 38.936-6.113 11.233-7.61 28.392-3.654 41.881 3.73 12.719 13.5 28.523 25.988 42.037 11.633 12.588 33.84 30.093 45.14 35.584 3.95 1.918 7.18 4.035 7.18 4.703 0 .666-7.743 3.562-17.205 6.432-40.305 12.23-57.754 21.02-71.49 36.018-9.245 10.094-13.913 20.65-14.974 33.866-1.086 13.523 3.854 30.209 12.996 43.898 8.618 12.905 28.721 31.992 44.644 42.386 6.854 4.474 13.372 8.439 14.483 8.81 1.293.43 40.53 18.068 40.53 18.068 117.146 38.966 213.31 52.42 288.47 49.477 16.786-.658 28.657-7.41 38.36-16.77 10.44-10.07 8.097-32.707 8.097-32.707-4.405-19.85-10.315-44.69-13.134-55.2s-5.126-19.315-5.126-19.567 7.366-.957 16.366-1.566c48-3.255 86.435-14.898 117.65-35.635 34.589-22.984 55.106-53.229 66.094-97.433 3.049-12.266 3.653-19.546 3.661-44.069.009-24.044-.632-32.117-3.538-44.483-9.308-39.63-25.107-69.496-54.912-103.802-10.354-11.918-34.763-32.726-49.793-42.45-17.063-11.039-43.738-23.798-62.832-30.053-9.52-3.118-25.87-7.387-36.332-9.485-16.07-3.225-24.111-3.8-51.758-3.708-26.97.089-35.761.752-49.937 3.77-21.235 4.52-44.745 12.29-59.211 19.569l-10.95 5.51-10.033-5.967c-11.66-6.934-36.65-17.442-48.384-20.344-13.773-3.408-32.832-3.843-43.021-.982m9.192 36.897c-8.333 2.916-13.574 8.798-16.081 18.042-1.551 5.72-1.405 9.521.747 19.485 1.468 6.807 5.045 17.525 7.946 23.818l5.273 11.441 7.203-9.55c7.256-9.623 31.411-33.84 43.282-43.395l6.406-5.155-7.245-4.208c-8.84-5.135-25.031-10.82-34.102-11.973-3.739-.475-9.691.188-13.43 1.495m177.094 1.506c-22.61 4.007-39.081 9.437-61.27 20.194-32.727 15.868-55.9 33.708-76.11 58.59-31.834 39.199-44.929 71.671-51.543 127.828-.65 5.54-1.388 32.733-1.634 60.43-.366 40.95-1.093 54.435-3.895 72.18-1.895 12.002-13.472 61.042-11.597 67.99 7.565 28.021 277.457 84.926 273.532 40.28-3.464-39.419-16.4-73.216-19.233-76.796-.913-1.153-4.128-2.098-7.144-2.098-5.12 0-29.905-4.127-36.498-6.075-5.916-1.75-12.89-9.255-13.975-15.037-2.091-11.15 6.366-22.537 16.728-22.527 2.875.003 12.782 1.547 22.015 3.432 11.3 2.307 26.737 3.752 47.24 4.424 24.171.792 34.733.392 51.197-1.94 11.41-1.617 27-4.746 34.646-6.957 16.313-4.714 39.035-15.566 47.367-22.623l5.875-4.977-6.714 1.254c-10.835 2.023-50.971 1.398-64.627-1.005-19.225-3.384-51.818-14.616-66.535-22.928-7.26-4.1-16.03-10.443-19.493-14.096-5.13-5.412-6.295-7.89-6.295-13.393 0-8.84 6.652-16.583 15.446-17.982 5.298-.84 8.147.14 19.304 6.653 15.865 9.26 33.202 16.227 53.377 21.447 13.033 3.374 19.029 3.9 43.644 3.828 23.843-.071 30.727-.682 41.856-3.715 7.327-1.996 15.141-4.821 17.363-6.278 9.585-6.28 16.501-35.783 14.915-63.635-1.618-28.429-10.941-57.63-26.695-83.61-20.637-34.035-52.04-61.959-91.083-80.994-19.6-9.556-36.797-15.662-56.657-20.117-16.552-3.711-66.523-4.758-83.507-1.747m-10.072 116.124c-15.95 6.91-25.24 24.817-21.531 41.504 2.326 10.463 8.969 18.903 18.693 23.75 10.263 5.114 21 5.486 30.535 1.062 7.85-3.643 16.667-12.442 19.202-19.162 2.745-7.28 2.06-21.372-1.402-28.847-8.023-17.333-28.617-25.619-45.497-18.307m-213.88 15.97c-13.372 1.948-33.374 7.543-41.134 11.5-3.485 1.779-7.671 5.27-9.303 7.761-6.412 9.786.421 26.73 17.793 44.122 7.425 7.433 25.181 20.367 27.96 20.367.835 0 2.012-8.12 2.615-18.045 1.047-17.243 6.296-43.256 11.898-58.963 3.01-8.448 3.048-8.672 1.36-8.396-.694.112-5.728.856-11.189 1.653m-25.322 170.11c-24.314 8.383-36.051 14.57-43.69 23.024-10.544 11.67-9.89 20.882 2.635 37.106 8.616 11.161 21.812 22.49 35.335 30.336l7.706 4.472 4.435-14.692c8.39-27.796 15.651-69.47 14.288-81.995l-.565-5.197z" />
  </svg>
    
  );
};
// Hamburger icon component
const HamburgerIcon = ({ className, ...props }: React.SVGAttributes<SVGElement>) => (
  <svg
    className={cn('pointer-events-none', className)}
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 12L20 12"
      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
    />
    <path
      d="M4 12H20"
      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
    />
    <path
      d="M4 12H20"
      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
    />
  </svg>
);
// Types
export interface Navbar01NavLink {
  href: string;
  label: string;
  active?: boolean;
}
export interface Navbar01Props extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  logoHref?: string;
  navigationLinks?: Navbar01NavLink[];
  signInText?: string;
  signInHref?: string;
  ctaText?: string;
  ctaHref?: string;
  onSignInClick?: () => void;
  onCtaClick?: () => void;
}
// Default navigation links
const defaultNavigationLinks: Navbar01NavLink[] = [
  { href: '#', label: 'Home', active: true },
  { href: '#features', label: 'Features' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#about', label: 'About' },
];
export const Navbar01 = React.forwardRef<HTMLElement, Navbar01Props>(
  (
    {
      className,
      logo = <Logo />,
      logoHref = '#',
      navigationLinks = defaultNavigationLinks,
      signInText = 'Sign In',
      signInHref = '#signin',
      ctaText = 'Get Started',
      ctaHref = '#get-started',
      onSignInClick,
      onCtaClick,
      ...props
    },
    ref
  ) => {
    const [isMobile, setIsMobile] = useState(false);
    const [entered, setEntered] = useState(false);
    const containerRef = useRef<HTMLElement>(null);
    useEffect(() => {
      const checkWidth = () => {
        if (containerRef.current) {
          const width = containerRef.current.offsetWidth;
          setIsMobile(width < 768); // 768px is md breakpoint
        }
      };
      checkWidth();
      const resizeObserver = new ResizeObserver(checkWidth);
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }
      return () => {
        resizeObserver.disconnect();
      };
    }, []);
    useEffect(() => {
      const id = requestAnimationFrame(() => setEntered(true));
      return () => cancelAnimationFrame(id);
    }, []);

    const buildClickHandler = (cb?: () => void) => (event: React.MouseEvent) => {
      if (!cb) return;
      event.preventDefault();
      cb();
    };

    // Combine refs
    const combinedRef = React.useCallback((node: HTMLElement | null) => {
      containerRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    }, [ref]);
    return (
      <header
        ref={combinedRef}
        className={cn(
          'fixed z-50 w-full inset-x-0 px-6 top-[max(env(safe-area-inset-top),0px)]',
          className
        )}
        style={{ transform: 'translateZ(0)', willChange: 'transform' }}
        {...props}
      >
        <div
          className="container mx-auto flex h-16 max-w-4xl xl:max-w-7xl items-center justify-between gap-4 rounded-2xl supports-[backdrop-filter]:bg-background/10 supports-[backdrop-filter]:dark:bg-background/30 backdrop-blur-xl border border-border/10 dark:border-border/5 p-4 shadow-xl bg-background/95 px-4 md:px-6 [&_*]:no-underline transition-[margin-top] duration-500 ease-in-out"
          style={{ marginTop: entered ? '20px' : '-10rem'}}
        >
          {/* Left side */}
          <div className="flex items-center gap-2">
            {/* Mobile menu trigger */}
            {isMobile && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="group h-9 w-9 hover:bg-accent hover:text-accent-foreground"
                    variant="ghost"
                    size="icon"
                  >
                    <HamburgerIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-48 p-2">
                <NavigationMenu className="w-full max-w-none justify-start [&>div]:w-full [&>div>ul]:w-full">
                  <NavigationMenuList className="flex-col items-start gap-1 w-full">
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index} className="w-full">
                        <NavigationMenuLink
                          href={link.href}
                          className={cn(
                            "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer no-underline",
                            link.active 
                              ? "bg-accent text-accent-foreground" 
                              : "text-foreground/80"
                          )}
                        >
                          {link.label}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
                </PopoverContent>
              </Popover>
            )}
            {/* Main nav */}
            <div className="flex items-center gap-6">
              <a 
                href={logoHref}
                className="flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors cursor-pointer"
              >
                <div className="text-2xl">
                  {logo}
                </div>
                <span className="hidden font-bold text-xl sm:inline-block">dinowalls</span>
              </a>
              {/* Navigation menu */}
              {!isMobile && (
                <NavigationMenu className="flex">
                <NavigationMenuList className="gap-1">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuLink
                        href={link.href}
                        className={cn(
                          "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer no-underline",
                          link.active 
                            ? "bg-accent text-accent-foreground" 
                            : "text-foreground/80 hover:text-foreground"
                        )}
                      >
                        {link.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
                </NavigationMenu>
              )}
            </div>
          </div>
          {/* Right side */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              asChild
              onClick={buildClickHandler(onSignInClick)}
            >
              <a href={signInHref}>{signInText}</a>
            </Button>
            <Button
              size="sm"
              className="text-sm font-medium px-4 h-9 rounded-md shadow-sm"
              asChild
              onClick={buildClickHandler(onCtaClick)}
            >
              <a href={ctaHref}>{ctaText}</a>
            </Button>
          </div>
        </div>
      </header>
    );
  }
);
Navbar01.displayName = 'Navbar01';
export { Logo, HamburgerIcon };
