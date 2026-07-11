"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

type FormState = {
  name: string;
  email: string;
  message: string;
};

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("sending");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    backgroundColor: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    borderRadius: "8px",
    padding: "0.85rem 1rem",
    fontFamily: "var(--font-body)",
    fontSize: "0.9rem",
    color: "var(--color-text-primary)",
    outline: "none",
    transition: "border-color 0.2s ease",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "0.75rem",
    color: "var(--color-text-muted)",
    letterSpacing: "0.05em",
    marginBottom: "0.5rem",
    display: "block",
  };

  return (
    <div
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "16px",
        padding: "2rem",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {/* Name */}
        <div>
          <label style={labelStyle}>name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            style={inputStyle}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--color-violet)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "var(--color-border)";
            }}
          />
        </div>

        {/* Email */}
        <div>
          <label style={labelStyle}>email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            style={inputStyle}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--color-violet)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "var(--color-border)";
            }}
          />
        </div>

        {/* Message */}
        <div>
          <label style={labelStyle}>message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="What would you like to talk about?"
            rows={5}
            style={{
              ...inputStyle,
              resize: "vertical",
              minHeight: "120px",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--color-violet)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "var(--color-border)";
            }}
          />
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={status === "sending"}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.95rem",
            fontWeight: 600,
            padding: "0.85rem 2rem",
            borderRadius: "8px",
            backgroundColor:
              status === "success"
                ? "var(--color-success)"
                : "var(--color-violet)",
            color: "white",
            border: "none",
            cursor: status === "sending" ? "not-allowed" : "pointer",
            transition: "all 0.2s ease",
            opacity: status === "sending" ? 0.7 : 1,
            width: "100%",
          }}
          onMouseEnter={(e) => {
            if (status !== "sending") {
              e.currentTarget.style.backgroundColor =
                "var(--color-violet-light)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor =
              status === "success"
                ? "var(--color-success)"
                : "var(--color-violet)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {status === "idle" && "Send Message"}
          {status === "sending" && "Sending..."}
          {status === "success" && "Message Sent!"}
          {status === "error" && "Failed. Try Again."}
        </button>

        {/* Error message */}
        {status === "error" && (
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.85rem",
              color: "#ef4444",
              textAlign: "center",
            }}
          >
            Something went wrong. Email me directly at saifullaharshad110@gmail.com
          </p>
        )}
      </div>
    </div>
  );
}
