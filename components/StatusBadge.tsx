import { CaseStatusValue } from '@/lib/graph';

interface StatusBadgeProps {
  status: CaseStatusValue | string;
}

const STATUS_STYLES: Record<string, string> = {
  New: 'bg-blue-100 text-blue-800 border-blue-300',
  'In Review': 'bg-amber-100 text-amber-800 border-amber-300',
  Referred: 'bg-amber-100 text-amber-800 border-amber-300',
  Escalated: 'bg-red-100 text-red-800 border-red-300',
  Resolved: 'bg-green-100 text-green-800 border-green-300',
  Closed: 'bg-green-100 text-green-800 border-green-300',
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const style = STATUS_STYLES[status] ?? 'bg-gray-100 text-gray-800 border-gray-300';

  return (
    <span className={`inline-block rounded-full border px-4 py-1 text-sm font-bold ${style}`}>
      {status}
    </span>
  );
}
