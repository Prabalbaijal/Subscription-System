import Button from "./Button";
import toast from "react-hot-toast";
import { api } from "../api";

export default function SubscriptionTable({ subs, onCancelSuccess }) {
  const cancelSub = async (id) => {
    const toastId = toast.loading("Cancelling subscription...");

    try {
      await api.post(`/subscriptions/${id}/cancel`);
      toast.success("Subscription cancelled", { id: toastId });
      onCancelSuccess(); // 🔥 refresh data
    } catch (err) {
      toast.error(
        err.response?.data?.error || "Cancel failed",
        { id: toastId }
      );
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--border)] mt-4">
      <table className="w-full text-sm">
        <thead className="bg-[#0f172a]">
          <tr>
            <th className="px-4 py-3 text-left">Plan</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Start</th>
            <th className="px-4 py-3 text-left">End</th>
            <th className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {subs.map(s => (
            <tr
              key={s.id}
              className="border-t border-[var(--border)] hover:bg-[#0f172a]"
            >
              <td className="px-4 py-3">{s.plan_name}</td>
              <td className="px-4 py-3 capitalize">{s.status}</td>
              <td className="px-4 py-3">
                {new Date(s.start_date).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                {new Date(s.end_date).toLocaleDateString()}
              </td>

              <td className="px-4 py-3">
                {s.status === "active" ? (
                  <Button
                    onClick={() => cancelSub(s.id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Cancel
                  </Button>
                ) : (
                  <span className="text-gray-500">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
