import { Switch } from '@/components/ui/switch';

interface DangerToggleProps {
  isDanger: boolean;
  onToggle: (value: boolean) => void;
}

const DangerToggle = ({ isDanger, onToggle }: DangerToggleProps) => {
  return (
    <div className="fixed top-16 left-4 z-50 flex items-center gap-2 opacity-40 hover:opacity-100 transition-opacity">
      <Switch
        id="danger-mode"
        checked={isDanger}
        onCheckedChange={onToggle}
        className="data-[state=checked]:bg-danger"
      />
      <label 
        htmlFor="danger-mode" 
        className="text-xs font-medium text-muted-foreground cursor-pointer"
      >
        Simulate Danger
      </label>
    </div>
  );
};

export default DangerToggle;
