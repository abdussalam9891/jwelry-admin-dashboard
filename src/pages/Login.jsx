import logo from "../assets/icon/logo.png"


export default function Login() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B0B0C] text-white">

      {/*  ambient gradients */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-120px] left-[-120px] w-[380px] h-[380px] rounded-full bg-[#6B1A2A]/30 blur-3xl" />

        <div className="absolute bottom-[-150px] right-[-100px] w-[420px] h-[420px] rounded-full bg-[#D4AF37]/10 blur-3xl" />

      </div>

      {/*  grid overlay */}
      <div
        className="
          absolute inset-0 opacity-[0.03]
          [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
          [background-size:60px_60px]
        "
      />

      {/*  content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">

        <div
          className="
            w-full
            max-w-[460px]
            rounded-[32px]
            border border-white/10
            bg-white/[0.04]
            backdrop-blur-2xl
            shadow-[0_20px_80px_rgba(0,0,0,0.45)]
            p-10
          "
        >

          {/*  logo */}
<div className="flex items-center gap-4 mb-10">

  <img
    src={logo}
    alt="Gemora"
    className="
      w-20
      h-20
      object-contain
      drop-shadow-[0_4px_20px_rgba(255,255,255,0.08)]
    "
  />

  <div>

    <h1
      className="
        text-[1.05rem]
        font-semibold
        tracking-[0.18em]
        text-white
      "
    >
      GEMORA
    </h1>

    <p
      className="
        text-xs
        uppercase
        tracking-[0.22em]
        text-white/35
        mt-1
      "
    >
      Admin Console
    </p>

  </div>

</div>

          {/*  heading */}
          <div className="mb-8">

            <h2
              className="
                text-[2rem]
                leading-tight
                font-semibold
                tracking-[-0.03em]
              "
            >
              Welcome back
            </h2>

            <p className="text-white/50 text-sm mt-3 leading-relaxed">
              Sign in securely to manage products,
              inventory, orders and customer operations.
            </p>

          </div>

          {/*  login button */}
          <button
          onClick={() => {

    window.location.href =
      "http://localhost:5000/api/v1/auth/google/admin";

  }}
            className="
              group
              relative
              w-full
              overflow-hidden
              rounded-2xl
              bg-[#6B1A2A]
              px-5
              py-4
              font-medium
              transition-all
              duration-300
              hover:scale-[1.01]
              hover:bg-[#7A1D30]
              active:scale-[0.99]
            "
          >

            <div
              className="
                absolute inset-0
                opacity-0
                group-hover:opacity-100
                transition
                duration-300
                bg-gradient-to-r
                from-transparent
                via-white/10
                to-transparent
                translate-x-[-100%]
                group-hover:translate-x-[100%]
              "
            />

            <span className="relative flex items-center justify-center gap-3">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="w-5 h-5"
              >
                <path
                  fill="#FFC107"
                  d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"
                />
              </svg>

              Continue with Google

            </span>

          </button>

          {/*  footer */}
          <div
            className="
              mt-8
              pt-6
              border-t
              border-white/10
              flex
              items-center
              justify-between
              text-xs
              text-white/35
            "
          >

            <span>
              Protected Admin Access
            </span>

            <span>
              v1.0
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}
