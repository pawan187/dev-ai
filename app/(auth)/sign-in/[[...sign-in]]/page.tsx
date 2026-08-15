import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="w-1/2 bg-[#111827] flex flex-col items-center justify-center px-8 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-[#eaf2ff] mb-2">
              dev ai
            </h1>
            <p className="text-sm text-[#8ea3c7]">
              Sign in to your account to continue
            </p>
          </div>
          
          <SignIn
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-transparent shadow-none",
                formButtonPrimary:
                  "bg-[#7aa2ff] hover:bg-[#6a8fe6] text-white font-medium",
                formFieldInput:
                  "bg-[#1d2940] border border-[#263548] text-[#eaf2ff] placeholder-[#8ea3c7]",
                footerAction: "text-[#8ea3c7]",
                footerActionLink: "text-[#7aa2ff] hover:text-[#8eb8ff]",
              },
            }}
          />
        </div>
      </div>

      {/* Right Panel - Content */}
      <div className="w-1/2 bg-[#0b1020] flex flex-col items-center justify-center px-8 py-12">
        <div className="max-w-sm text-center">
          <div className="mb-8">
            <svg
              className="w-12 h-12 mx-auto mb-4 text-[#7aa2ff]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <blockquote className="mb-8">
            <p className="text-lg font-semibold text-[#eaf2ff] leading-relaxed mb-6">
              "Build AI-powered applications with unprecedented speed and control. 
              dev ai gives you the tools to create, iterate, and deploy intelligently."
            </p>
            <footer>
              <p className="text-sm text-[#c9d6ee] font-medium">
                Platform by dev ai
              </p>
              <p className="text-xs text-[#8ea3c7]">
                AI-focused development platform
              </p>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
