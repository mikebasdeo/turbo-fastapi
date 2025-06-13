const SampleReport = () => {
  return (
    <div className="space-y-6 text-white">
      {/* Text Block */}
      <section>
        <h2 className="text-2xl font-bold mb-1">📈 Q2 Revenue Highlights</h2>
        <p className="text-gray-300">
          In Q2, the company experienced significant growth across all
          verticals, with a 24% increase in recurring revenue.
        </p>
      </section>

      {/* Image Block */}
      <section>
        <h3 className="text-xl font-semibold mb-1">🖼️ Team Photo</h3>
        <div className="w-full h-48 bg-gray-700 rounded flex items-center justify-center">
          <span className="text-4xl">📸</span>
        </div>
      </section>

      {/* Table Block */}
      <section>
        <h3 className="text-xl font-semibold mb-1">
          📊 Department Performance
        </h3>
        <table className="w-full text-sm border-collapse border border-gray-600">
          <thead>
            <tr className="bg-gray-700">
              <th className="border border-gray-600 p-2">Dept</th>
              <th className="border border-gray-600 p-2">Revenue</th>
              <th className="border border-gray-600 p-2">Growth</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-600 p-2">Sales</td>
              <td className="border border-gray-600 p-2">$120K</td>
              <td className="border border-gray-600 p-2">+18%</td>
            </tr>
            <tr>
              <td className="border border-gray-600 p-2">Marketing</td>
              <td className="border border-gray-600 p-2">$85K</td>
              <td className="border border-gray-600 p-2">+12%</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Graph Block (placeholder) */}
      <section>
        <h3 className="text-xl font-semibold mb-1">📉 Monthly Users</h3>
        <div className="bg-gray-800 p-4 rounded">
          <svg
            viewBox="0 0 100 50"
            className="w-full h-32 text-blue-400 stroke-current fill-none"
          >
            <polyline
              points="0,40 20,35 40,30 60,20 80,10 100,5"
              strokeWidth="2"
            />
          </svg>
          <div className="text-sm text-gray-300 mt-2 flex justify-between">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export { SampleReport };
