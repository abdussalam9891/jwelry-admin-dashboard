export default function CustomersPage() {
  const customers = [
    {
      id: 1,
      name: "Abdus",
      email: "abdus@gmail.com",
      orders: 14,
      spent: "₹1,88,447",
      status: "VIP",
      joined: "Jan 2026",
    },
    {
      id: 2,
      name: "Ayesha Khan",
      email: "ayesha@gmail.com",
      orders: 5,
      spent: "₹24,900",
      status: "Active",
      joined: "Mar 2026",
    },
    {
      id: 3,
      name: "Rahul Verma",
      email: "rahul@gmail.com",
      orders: 2,
      spent: "₹8,200",
      status: "New",
      joined: "May 2026",
    },
  ];

  const stats = [
    {
      title: "Total Customers",
      value: "1,284",
    },
    {
      title: "Returning Customers",
      value: "74%",
    },
    {
      title: "VIP Customers",
      value: "92",
    },
    {
      title: "Average Order Value",
      value: "₹12,440",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f6f4f4] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* TOP HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <p className="text-sm text-[#7b1e2b] font-medium mb-2">
              Customer Management
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-black">
              Customers
            </h1>

            <p className="text-black/55 mt-2 max-w-2xl leading-7">
              Manage customer relationships, monitor purchasing activity,
              analyze retention trends and handle support operations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button className="h-12 px-6 rounded-2xl border border-black/10 bg-surface font-medium hover:bg-black/5 transition">
              Export
            </button>

            <button className="h-12 px-6 rounded-2xl bg-[#7b1e2b] text-white font-medium hover:opacity-90 transition shadow-lg shadow-[#7b1e2b]/20">
              Add Customer
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((item) => (
            <div
              key={item.title}
              className="bg-surface rounded-3xl border border-black/5 p-6 shadow-sm"
            >
              <p className="text-sm text-black/45 font-medium mb-4 uppercase tracking-wide">
                {item.title}
              </p>

              <h2 className="text-4xl font-bold text-black">{item.value}</h2>
            </div>
          ))}
        </div>

        {/* SEARCH + FILTERS */}
        <div className="bg-surface border border-black/5 rounded-3xl p-4 md:p-5 shadow-sm">
          <div className="flex flex-col xl:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search customers by name, email or phone..."
                className="w-full h-14 rounded-2xl border border-black/10 bg-[#fafafa] px-5 outline-none focus:ring-2 focus:ring-[#7b1e2b]/20"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <select className="h-14 rounded-2xl border border-black/10 bg-surface px-4 outline-none min-w-[170px]">
                <option>All Status</option>
                <option>VIP</option>
                <option>Active</option>
                <option>New</option>
              </select>

              <select className="h-14 rounded-2xl border border-black/10 bg-surface px-4 outline-none min-w-[170px]">
                <option>Newest First</option>
                <option>Highest Spend</option>
                <option>Most Orders</option>
              </select>
            </div>
          </div>
        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden lg:block bg-surface border border-black/5 rounded-[2rem] overflow-hidden shadow-sm">
          <div className="grid grid-cols-6 gap-4 px-8 py-5 border-b border-black/5 text-xs uppercase tracking-[0.2em] text-black/40 font-semibold">
            <p>Customer</p>
            <p>Orders</p>
            <p>Spent</p>
            <p>Status</p>
            <p>Joined</p>
            <p className="text-right">Actions</p>
          </div>

          <div>
            {customers.map((customer) => (
              <div
                key={customer.id}
                className="grid grid-cols-6 gap-4 items-center px-8 py-6 border-b border-black/5 hover:bg-[#fafafa] transition"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-full bg-[#f5eaed] flex items-center justify-center font-semibold text-[#7b1e2b] shrink-0">
                    {customer.name.charAt(0)}
                  </div>

                  <div className="min-w-0">
                    <p className="font-semibold text-black truncate">
                      {customer.name}
                    </p>

                    <p className="text-sm text-black/50 truncate">
                      {customer.email}
                    </p>
                  </div>
                </div>

                <p className="font-medium text-black">{customer.orders}</p>

                <p className="font-semibold text-black">{customer.spent}</p>

                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                      customer.status === "VIP"
                        ? "bg-[#f8eef1] text-[#7b1e2b] border-[#edd8de]"
                        : customer.status === "Active"
                          ? "bg-[#eef7f1] text-[#127a3f] border-[#d7edde]"
                          : "bg-[#fff4e8] text-[#c77700] border-[#ffe1b4]"
                    }`}
                  >
                    {customer.status}
                  </span>
                </div>

                <p className="text-black/60 font-medium">{customer.joined}</p>

                <div className="flex justify-end">
                  <button className="h-11 px-5 rounded-xl border border-black/10 bg-surface hover:bg-black/5 transition font-medium">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MOBILE CARDS */}
        <div className="lg:hidden space-y-4">
          {customers.map((customer) => (
            <div
              key={customer.id}
              className="bg-surface rounded-[2rem] border border-black/5 p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-full bg-[#f5eaed] flex items-center justify-center font-semibold text-[#7b1e2b] shrink-0">
                    {customer.name.charAt(0)}
                  </div>

                  <div className="min-w-0">
                    <p className="font-semibold truncate">{customer.name}</p>

                    <p className="text-sm text-black/50 truncate">
                      {customer.email}
                    </p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#f8eef1] text-[#7b1e2b] border border-[#edd8de] shrink-0">
                  {customer.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <p className="text-xs uppercase tracking-wide text-black/40 mb-1">
                    Orders
                  </p>

                  <p className="font-semibold text-lg">{customer.orders}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-black/40 mb-1">
                    Total Spend
                  </p>

                  <p className="font-semibold text-lg truncate">
                    {customer.spent}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-black/40 mb-1">
                    Joined
                  </p>

                  <p className="text-sm font-medium text-black/65">
                    {customer.joined}
                  </p>
                </div>

                <button className="h-11 px-5 rounded-xl border border-black/10 bg-surface hover:bg-black/5 transition font-medium shrink-0">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
