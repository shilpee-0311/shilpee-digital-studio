"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  LogOut,
  Search,
  Filter,
  Download,
  Star,
  RefreshCw,
  Archive,
  ExternalLink,
  Mail,
  Phone,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Send,
  Loader2,
  X,
  MessageSquare,
} from "lucide-react";
import { SERVICE_NAMES, ENQUIRY_STATUSES } from "@/lib/validations";

interface Note {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  serviceType: string;
  budgetRange: string | null;
  timeline: string | null;
  message: string;
  status: (typeof ENQUIRY_STATUSES)[number];
  isStarred: boolean;
  isArchived: boolean;
  source: string;
  createdAt: string;
  notes: Note[];
}

interface Stats {
  total: number;
  newCount: number;
  reviewingCount: number;
  quotedCount: number;
  inProgressCount: number;
  completedCount: number;
  archivedCount: number;
  starredCount: number;
}

const STATUS_COLORS: Record<string, string> = {
  NEW: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  REVIEWING: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  QUOTED: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  IN_PROGRESS: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  COMPLETED: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  ARCHIVED: "bg-slate-500/20 text-slate-300 border-slate-500/30",
};

export function AdminDashboardClient({ username }: { username: string }) {
  const router = useRouter();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    newCount: 0,
    reviewingCount: 0,
    quotedCount: 0,
    inProgressCount: 0,
    completedCount: 0,
    archivedCount: 0,
    starredCount: 0,
  });

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [starredOnly, setStarredOnly] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  // Selected enquiry for detail modal
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [newNoteContent, setNewNoteContent] = useState("");
  const [addingNote, setAddingNote] = useState(false);

  const [isPending, startTransition] = useTransition();

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.set("search", searchTerm);
      if (statusFilter !== "ALL") params.set("status", statusFilter);
      if (starredOnly) params.set("starred", "true");
      if (showArchived) params.set("archived", "true");

      const response = await fetch(`/api/admin/enquiries?${params.toString()}`);
      if (response.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await response.json();
      if (data.success) {
        setEnquiries(data.enquiries);
        setStats(data.stats);
        // Refresh selected enquiry if open
        if (selectedEnquiry) {
          const fresh = data.enquiries.find((e: Enquiry) => e.id === selectedEnquiry.id);
          if (fresh) setSelectedEnquiry(fresh);
        }
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, starredOnly, showArchived]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchEnquiries();
  };

  const handleSignOut = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      if (data.success) {
        setEnquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: data.enquiry.status } : item))
        );
        if (selectedEnquiry?.id === id) {
          setSelectedEnquiry((prev) => (prev ? { ...prev, status: data.enquiry.status } : null));
        }
        fetchEnquiries();
      }
    } catch (err) {
      console.error("Update status error:", err);
    }
  };

  const toggleStar = async (id: string, current: boolean) => {
    try {
      const response = await fetch(`/api/admin/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isStarred: !current }),
      });
      const data = await response.json();
      if (data.success) {
        setEnquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, isStarred: !current } : item))
        );
        if (selectedEnquiry?.id === id) {
          setSelectedEnquiry((prev) => (prev ? { ...prev, isStarred: !current } : null));
        }
      }
    } catch (err) {
      console.error("Star error:", err);
    }
  };

  const toggleArchive = async (id: string, current: boolean) => {
    try {
      const response = await fetch(`/api/admin/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isArchived: !current }),
      });
      const data = await response.json();
      if (data.success) {
        fetchEnquiries();
        if (selectedEnquiry?.id === id) {
          setSelectedEnquiry(null);
        }
      }
    } catch (err) {
      console.error("Archive error:", err);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry || !newNoteContent.trim()) return;

    setAddingNote(true);
    try {
      const response = await fetch(`/api/admin/enquiries/${selectedEnquiry.id}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newNoteContent.trim() }),
      });

      const data = await response.json();
      if (data.success) {
        setSelectedEnquiry((prev) =>
          prev
            ? {
                ...prev,
                notes: [data.note, ...prev.notes],
              }
            : null
        );
        setNewNoteContent("");
        fetchEnquiries();
      }
    } catch (err) {
      console.error("Add note error:", err);
    } finally {
      setAddingNote(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 text-lavender-100">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-navy-900/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600 text-white shadow-md shadow-purple-600/30">
              <ShieldCheck size={18} aria-hidden />
            </div>
            <div>
              <p className="text-sm font-bold tracking-tight text-white">
                Shilpee Digital Studio
              </p>
              <p className="text-[10px] uppercase tracking-widest text-purple-400">
                Admin Enquiry Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 sm:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-lavender-200">
                Active Admin: <strong className="text-white">{username}</strong>
              </span>
            </div>

            <a
              href="/admin/blog"
              className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-950/60 px-3 py-1.5 text-lavender-100 transition-colors hover:border-purple-400 hover:text-white"
            >
              <FileText size={13} aria-hidden />
              <span>Manage Blog</span>
            </a>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-lavender-200 transition-colors hover:text-white"
            >
              <span>View Site</span>
              <ExternalLink size={13} aria-hidden />
            </a>

            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3.5 py-1.5 text-xs font-semibold text-red-300 transition-colors hover:bg-red-500/20"
            >
              <LogOut size={13} aria-hidden />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* KPI Metric Cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          <div className="rounded-2xl border border-white/10 bg-navy-900 p-5">
            <p className="text-xs uppercase tracking-wider text-lavender-200/70">
              Total Inquiries
            </p>
            <p className="font-display mt-2 text-3xl font-bold text-white">{stats.total}</p>
            <p className="mt-1 text-[11px] text-lavender-200/60">Non-archived briefs</p>
          </div>

          <div className="rounded-2xl border border-blue-500/30 bg-blue-950/20 p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-wider text-blue-300">New</p>
              {stats.newCount > 0 ? (
                <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
              ) : null}
            </div>
            <p className="font-display mt-2 text-3xl font-bold text-blue-200">{stats.newCount}</p>
            <p className="mt-1 text-[11px] text-blue-300/70">Awaiting initial review</p>
          </div>

          <div className="rounded-2xl border border-amber-500/30 bg-amber-950/20 p-5">
            <p className="text-xs uppercase tracking-wider text-amber-300">In Review</p>
            <p className="font-display mt-2 text-3xl font-bold text-amber-200">
              {stats.reviewingCount}
            </p>
            <p className="mt-1 text-[11px] text-amber-300/70">Requirements scoping</p>
          </div>

          <div className="rounded-2xl border border-purple-500/30 bg-purple-950/20 p-5">
            <p className="text-xs uppercase tracking-wider text-purple-300">Quoted</p>
            <p className="font-display mt-2 text-3xl font-bold text-purple-200">{stats.quotedCount}</p>
            <p className="mt-1 text-[11px] text-purple-300/70">Proposals delivered</p>
          </div>

          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-5">
            <p className="text-xs uppercase tracking-wider text-emerald-300">Completed</p>
            <p className="font-display mt-2 text-3xl font-bold text-emerald-200">
              {stats.completedCount}
            </p>
            <p className="mt-1 text-[11px] text-emerald-300/70">Successfully closed</p>
          </div>
        </div>

        {/* Toolbar: Search, Filters & Export */}
        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-navy-900 p-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-lavender-200/50">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Search by client name, email, or message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-navy-850 py-2.5 pl-10 pr-4 text-xs text-white placeholder:text-lavender-200/40 focus:border-purple-500 focus:bg-navy-800 focus:outline-none"
            />
          </form>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setShowArchived(false);
                setStarredOnly(!starredOnly);
              }}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors ${
                starredOnly
                  ? "border-amber-400 bg-amber-400/20 text-amber-300"
                  : "border-white/10 bg-white/5 text-lavender-200 hover:text-white"
              }`}
            >
              <Star size={14} className={starredOnly ? "fill-amber-400 text-amber-400" : ""} />
              <span>Starred ({stats.starredCount})</span>
            </button>

            <button
              onClick={() => {
                setStarredOnly(false);
                setShowArchived(!showArchived);
              }}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors ${
                showArchived
                  ? "border-purple-500 bg-purple-500/20 text-purple-300"
                  : "border-white/10 bg-white/5 text-lavender-200 hover:text-white"
              }`}
            >
              <Archive size={14} />
              <span>Archived ({stats.archivedCount})</span>
            </button>

            <button
              onClick={() => fetchEnquiries()}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-lavender-200 hover:text-white"
              title="Refresh Enquiries"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              <span>Refresh</span>
            </button>

            <a
              href="/api/admin/enquiries/export"
              download
              className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-3.5 py-2 text-xs font-semibold text-white shadow-md shadow-purple-900/40 transition-colors hover:bg-purple-500"
            >
              <Download size={14} />
              <span>Export CSV</span>
            </a>
          </div>
        </div>

        {/* Status Filter Tabs */}
        {!showArchived ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {["ALL", "NEW", "REVIEWING", "QUOTED", "IN_PROGRESS", "COMPLETED"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  statusFilter === st
                    ? "bg-purple-600 text-white"
                    : "border border-white/10 bg-white/5 text-lavender-200 hover:text-white"
                }`}
              >
                {st === "ALL" ? "All Active" : st.replace("_", " ")}
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-4 flex items-center justify-between rounded-xl bg-white/5 px-4 py-2 text-xs text-lavender-200">
            <span>Viewing Archived Enquiries</span>
            <button
              onClick={() => setShowArchived(false)}
              className="font-semibold text-purple-400 hover:text-purple-300"
            >
              Return to Active Enquiries
            </button>
          </div>
        )}

        {/* Enquiries Table */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-navy-900 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/10 bg-navy-850 text-lavender-200/70">
                <tr>
                  <th className="py-3.5 pl-4 pr-2 w-10">★</th>
                  <th className="py-3.5 px-3">Date</th>
                  <th className="py-3.5 px-3">Client Contact</th>
                  <th className="py-3.5 px-3">Service</th>
                  <th className="py-3.5 px-3">Budget & Timeline</th>
                  <th className="py-3.5 px-3">Status</th>
                  <th className="py-3.5 px-3 text-right pr-6">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {enquiries.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-lavender-200/60">
                      {loading ? (
                        <div className="inline-flex items-center gap-2">
                          <Loader2 size={16} className="animate-spin text-purple-400" />
                          <span>Loading enquiries...</span>
                        </div>
                      ) : (
                        <p>No enquiries match your current filters.</p>
                      )}
                    </td>
                  </tr>
                ) : (
                  enquiries.map((item) => {
                    const friendlyService =
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      (SERVICE_NAMES as any)[item.serviceType] || item.serviceType;
                    const dateFormatted = new Date(item.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });

                    return (
                      <tr
                        key={item.id}
                        className="transition-colors hover:bg-white/[0.02]"
                      >
                        {/* Star Button */}
                        <td className="py-4 pl-4 pr-2">
                          <button
                            onClick={() => toggleStar(item.id, item.isStarred)}
                            className="text-lavender-200/40 hover:text-amber-400"
                            title={item.isStarred ? "Unstar" : "Star"}
                          >
                            <Star
                              size={16}
                              className={
                                item.isStarred
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-lavender-200/40"
                              }
                            />
                          </button>
                        </td>

                        {/* Date */}
                        <td className="py-4 px-3 text-lavender-200/80 whitespace-nowrap">
                          {dateFormatted}
                        </td>

                        {/* Client Info */}
                        <td className="py-4 px-3">
                          <p className="font-semibold text-white">{item.name}</p>
                          <div className="mt-1 flex flex-col gap-0.5 text-lavender-200/70">
                            <a
                              href={`mailto:${item.email}`}
                              className="inline-flex items-center gap-1 hover:text-purple-300"
                            >
                              <Mail size={12} />
                              <span>{item.email}</span>
                            </a>
                            {item.phone ? (
                              <span className="inline-flex items-center gap-1">
                                <Phone size={12} />
                                <span>{item.phone}</span>
                              </span>
                            ) : null}
                          </div>
                        </td>

                        {/* Service Category */}
                        <td className="py-4 px-3">
                          <span className="inline-flex rounded-lg border border-purple-500/20 bg-purple-600/10 px-2.5 py-1 text-[11px] font-medium text-purple-300">
                            {friendlyService}
                          </span>
                        </td>

                        {/* Budget & Timeline */}
                        <td className="py-4 px-3 text-lavender-200/80 whitespace-nowrap">
                          <p className="font-medium text-white">{item.budgetRange || "Flexible"}</p>
                          <p className="mt-0.5 text-[11px] text-lavender-200/60">
                            {item.timeline || "Flexible"}
                          </p>
                        </td>

                        {/* Status Dropdown */}
                        <td className="py-4 px-3">
                          <select
                            value={item.status}
                            onChange={(e) => updateStatus(item.id, e.target.value)}
                            className={`rounded-lg border px-2.5 py-1 text-xs font-semibold focus:outline-none ${
                              STATUS_COLORS[item.status] || "bg-navy-800 text-white"
                            }`}
                          >
                            {ENQUIRY_STATUSES.map((st) => (
                              <option key={st} value={st} className="bg-navy-900 text-white">
                                {st.replace("_", " ")}
                              </option>
                            ))}
                          </select>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-3 text-right pr-6 whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedEnquiry(item)}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:border-purple-400 hover:bg-purple-600/20"
                            >
                              <FileText size={13} />
                              <span>Details & Notes ({item.notes.length})</span>
                            </button>

                            <button
                              onClick={() => toggleArchive(item.id, item.isArchived)}
                              className="inline-flex items-center rounded-lg border border-white/10 bg-white/5 p-1.5 text-lavender-200/60 transition-colors hover:text-white"
                              title={item.isArchived ? "Unarchive" : "Archive"}
                            >
                              <Archive size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Slide-over Detail & Notes Modal */}
      {selectedEnquiry ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col rounded-3xl border border-white/15 bg-navy-900 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 p-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                  Enquiry Dossier
                </span>
                <h2 className="font-display mt-1 text-xl font-bold text-white">
                  {selectedEnquiry.name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="rounded-full p-2 text-lavender-200/60 hover:bg-white/10 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Contact & Status Details */}
              <div className="grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-navy-850 p-4 text-xs">
                <div>
                  <p className="text-lavender-200/60">Email</p>
                  <a
                    href={`mailto:${selectedEnquiry.email}`}
                    className="font-medium text-white hover:text-purple-300"
                  >
                    {selectedEnquiry.email}
                  </a>
                </div>
                <div>
                  <p className="text-lavender-200/60">Phone</p>
                  <p className="font-medium text-white">
                    {selectedEnquiry.phone || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-lavender-200/60">Service Category</p>
                  <p className="font-medium text-purple-300">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(SERVICE_NAMES as any)[selectedEnquiry.serviceType] ||
                      selectedEnquiry.serviceType}
                  </p>
                </div>
                <div>
                  <p className="text-lavender-200/60">Budget / Timeline</p>
                  <p className="font-medium text-white">
                    {selectedEnquiry.budgetRange || "Flexible"} •{" "}
                    {selectedEnquiry.timeline || "Flexible"}
                  </p>
                </div>
              </div>

              {/* Status Update Bar */}
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-navy-850 px-4 py-3 text-xs">
                <span className="font-semibold text-white">Current Pipeline Status:</span>
                <select
                  value={selectedEnquiry.status}
                  onChange={(e) => updateStatus(selectedEnquiry.id, e.target.value)}
                  className={`rounded-lg border px-3 py-1 text-xs font-semibold focus:outline-none ${
                    STATUS_COLORS[selectedEnquiry.status]
                  }`}
                >
                  {ENQUIRY_STATUSES.map((st) => (
                    <option key={st} value={st} className="bg-navy-900 text-white">
                      {st.replace("_", " ")}
                    </option>
                  ))}
                </select>
              </div>

              {/* Client Brief Message */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                  Client Project Brief
                </h3>
                <div className="mt-2 rounded-2xl border border-white/10 bg-navy-850 p-4 text-xs leading-relaxed text-lavender-100 whitespace-pre-wrap">
                  {selectedEnquiry.message}
                </div>
              </div>

              {/* Private Notes Section */}
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                    Internal Follow-Up Notes ({selectedEnquiry.notes.length})
                  </h3>
                  <span className="text-[11px] text-lavender-200/50">
                    Private to studio team
                  </span>
                </div>

                {/* Add Note Form */}
                <form onSubmit={handleAddNote} className="mt-3 space-y-2">
                  <textarea
                    rows={2}
                    placeholder="Add an internal follow-up note (e.g. Called client, agreed on ₹45k scope, deposit pending)..."
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-navy-850 p-3 text-xs text-white placeholder:text-lavender-200/40 focus:border-purple-500 focus:bg-navy-800 focus:outline-none"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={addingNote || !newNoteContent.trim()}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow transition-colors hover:bg-purple-500 disabled:opacity-50"
                    >
                      {addingNote ? (
                        <Loader2 size={13} className="animate-spin" />
                      ) : (
                        <Send size={13} />
                      )}
                      <span>Post Internal Note</span>
                    </button>
                  </div>
                </form>

                {/* Notes List */}
                <div className="mt-4 space-y-2.5">
                  {selectedEnquiry.notes.length === 0 ? (
                    <p className="text-xs text-lavender-200/50 italic">
                      No internal notes recorded yet.
                    </p>
                  ) : (
                    selectedEnquiry.notes.map((note) => (
                      <div
                        key={note.id}
                        className="rounded-xl border border-white/5 bg-white/[0.03] p-3 text-xs"
                      >
                        <div className="flex items-center justify-between text-[11px] text-lavender-200/60">
                          <span className="font-semibold text-purple-300">{note.author}</span>
                          <span>
                            {new Date(note.createdAt).toLocaleString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <p className="mt-1 text-lavender-100 leading-relaxed whitespace-pre-wrap">
                          {note.content}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-white/10 p-4 flex justify-between items-center text-xs">
              <span className="text-lavender-200/50 font-mono">
                ID: {selectedEnquiry.id.slice(0, 8)}...
              </span>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-semibold text-white hover:bg-white/10"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
