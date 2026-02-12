interface StatusBarProps {
  isConnected: boolean;
  batteryLevel: number;
}

const StatusBar = ({ isConnected, batteryLevel }: StatusBarProps) => {
  return (
    <div className="status-bar flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-lg">{isConnected ? '🟢' : '🔴'}</span>
        <span className="text-sm font-medium text-foreground">
          {isConnected ? 'BLE Connected' : 'Disconnected'}
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-lg">🔋</span>
        <span className="text-sm font-medium text-foreground">
          {batteryLevel}%
        </span>
      </div>
    </div>
  );
};

export default StatusBar;
