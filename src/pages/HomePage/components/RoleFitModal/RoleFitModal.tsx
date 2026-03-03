import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import "./RoleFitModal.styles.css";

interface RoleFitModalProps {
  trigger?: React.ReactNode;
}

export default function RoleFitModal({ trigger }: RoleFitModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [jobText, setJobText] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    setTimeout(() => textareaRef.current?.focus(), 50);

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  async function handleSubmit() {
    const trimmed = jobText.trim();
    if (!trimmed || isLoading) return;

    setIsLoading(true);
    setResult("");

    try {
      const res = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          botType: "role_fit",
          messages: [
            {
              role: "user",
              content: `Please evaluate whether Craig is a strong fit for this role:\n\n${trimmed}`,
            },
          ],
        }),
      });

      if (!res.ok) throw new Error("Request failed");
      const data = (await res.json()) as { content: string };
      setResult(data.content ?? "No response returned.");
    } catch {
      setResult("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleReset() {
    setJobText("");
    setResult("");
    setTimeout(() => textareaRef.current?.focus(), 50);
  }

  return (
    <>
      {trigger ? (
        <div onClick={() => setIsOpen(true)} style={{ cursor: "pointer" }}>
          {trigger}
        </div>
      ) : (
        <button className="role-fit-trigger" onClick={() => setIsOpen(true)}>
          Would Craig be a good fit for your role?
        </button>
      )}

      {isOpen && (
        <div
          className="role-fit-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div className="role-fit-modal" role="dialog" aria-modal="true">
            <div className="role-fit-modal-header">
              <div>
                <h2 className="role-fit-modal-title">Role Fit Evaluation</h2>
                <p className="role-fit-modal-subtitle">
                  Paste a job description and get an honest assessment of
                  Craig's fit.
                </p>
              </div>
              <button
                className="role-fit-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="role-fit-modal-body">
              {!result && (
                <>
                  <textarea
                    ref={textareaRef}
                    className="role-fit-textarea"
                    placeholder="Paste the job title, description, or key requirements here..."
                    value={jobText}
                    onChange={(e) => setJobText(e.target.value)}
                    disabled={isLoading}
                  />
                  <button
                    className="role-fit-submit"
                    onClick={handleSubmit}
                    disabled={isLoading || !jobText.trim()}
                  >
                    {isLoading ? "Evaluating..." : "Evaluate Fit"}
                  </button>
                </>
              )}

              {result && (
                <>
                  <div className="role-fit-result">
                    <ReactMarkdown>{result}</ReactMarkdown>
                  </div>
                  <button className="role-fit-reset" onClick={handleReset}>
                    Evaluate a different role
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
