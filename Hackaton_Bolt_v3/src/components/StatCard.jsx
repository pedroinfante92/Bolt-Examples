export default function StatCard({ icon: Icon, label, value, subValue, color = "blue" }) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    green: "bg-green-50 text-green-600 border-green-200",
    red: "bg-red-50 text-red-600 border-red-200",
    yellow: "bg-yellow-50 text-yellow-600 border-yellow-200"
  };

  return (
    <div className={`rounded-lg border-2 p-6 transition-all hover:shadow-md ${colorClasses[color]}`}>
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-full bg-white">
          <Icon size={28} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium opacity-80">{label}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {subValue && <p className="text-sm mt-1 opacity-70">{subValue}</p>}
        </div>
      </div>
    </div>
  );
}
