"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/store/useAppStore";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { menuOpen, setMenuOpen, activeSection, setActiveSection } = useAppStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    handleResize();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [setMenuOpen]);

  useEffect(() => {
    const sections = ["about", "experience", "projects", "skills", "contact"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [setActiveSection]);

  const headerStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    transition: "all 0.3s ease",
    backgroundColor: scrolled ? "rgba(10, 10, 15, 0.85)" : "transparent",
    backdropFilter: scrolled ? "blur(12px)" : "none",
    borderBottom: scrolled
      ? "1px solid var(--color-border)"
      : "1px solid transparent",
  };

  const navStyle: React.CSSProperties = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1.5rem",
    height: "70px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const logoStyle: React.CSSProperties = {
    fontFamily: "var(--font-heading)",
    fontSize: "1.25rem",
    fontWeight: 700,
    color: "var(--color-violet)",
    textDecoration: "none",
    letterSpacing: "-0.02em",
  };

  const dotStyle: React.CSSProperties = {
    color: "var(--color-cyan)",
  };

  const desktopLinksStyle: React.CSSProperties = {
    display: "flex",
    gap: "2rem",
    listStyle: "none",
    alignItems: "center",
    margin: 0,
    padding: 0,
  };

  const resumeBtnStyle: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontSize: "0.85rem",
    fontWeight: 500,
    padding: "0.5rem 1.25rem",
    borderRadius: "6px",
    border: "1px solid var(--color-violet)",
    color: "var(--color-violet)",
    textDecoration: "none",
    transition: "all 0.2s ease",
    backgroundColor: "transparent",
  };

  const hamburgerLineStyle: React.CSSProperties = {
    display: "block",
    width: "24px",
    height: "2px",
    backgroundColor: "var(--color-text-primary)",
    borderRadius: "2px",
    transition: "all 0.3s ease",
  };

  const mobilMenuStyle: React.CSSProperties = {
    backgroundColor: "rgba(10, 10, 15, 0.97)",
    backdropFilter: "blur(12px)",
    borderTop: "1px solid var(--color-border)",
    padding: "1.5rem",
  };

  const mobileListStyle: React.CSSProperties = {
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
    margin: 0,
    padding: 0,
  };

  return (
    <header style={headerStyle}>
      <nav style={navStyle}>

        <a href="#hero" style={logoStyle}>
          Saif<span style={dotStyle}>.</span>
        </a>

        {!isMobile && (
          <ul style={desktopLinksStyle}>
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              const linkStyle: React.CSSProperties = {
                fontFamily: "var(--font-body)",
                fontSize: "0.9rem",
                fontWeight: 500,
                textDecoration: "none",
                color: isActive
                  ? "var(--color-violet-light)"
                  : "var(--color-text-secondary)",
                transition: "color 0.2s ease",
              };
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    style={linkStyle}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color =
                        "var(--color-text-primary)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = isActive
                        ? "var(--color-violet-light)"
                        : "var(--color-text-secondary)";
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        )}

        {!isMobile && (
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={resumeBtnStyle}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.backgroundColor = "var(--color-violet)";
              el.style.color = "white";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.backgroundColor = "transparent";
              el.style.color = "var(--color-violet)";
            }}
          >
            Resume
          </a>
        )}

        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
            aria-label="Toggle menu"
          >
            <span
              style={{
                ...hamburgerLineStyle,
                transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
              }}
            />
            <span
              style={{
                ...hamburgerLineStyle,
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                ...hamburgerLineStyle,
                transform: menuOpen
                  ? "translateY(-7px) rotate(-45deg)"
                  : "none",
              }}
            />
          </button>
        )}
      </nav>

      {isMobile && menuOpen && (
        <div style={mobilMenuStyle}>
          <ul style={mobileListStyle}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: "var(--color-text-secondary)",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  padding: "0.5rem 1.25rem",
                  borderRadius: "6px",
                  border: "1px solid var(--color-violet)",
                  color: "var(--color-violet)",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                }}
              >
                Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
