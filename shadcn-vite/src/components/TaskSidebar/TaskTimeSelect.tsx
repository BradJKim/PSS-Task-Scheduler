import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select';

interface TimePickerProps {
    value: string; // Format: "HH:MM" (e.g., "15:30")
    onChange: (time: string) => void;
    className?: string;
}

interface TimeSelectProps {
    value: string;
    onValueChange: (value: string) => void;
    options: string[];
    placeholder: string;
}

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
const MINUTES = ['00', '15', '30', '45'];

const TimeSelect: React.FC<TimeSelectProps> = ({ value, onValueChange, options, placeholder }) => (
    <Select onValueChange={onValueChange} value={value}>
        <SelectTrigger>
            <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-neutral-900">
            {options.map((option) => (
                <SelectItem 
                    key={option} 
                    value={option} 
                    className="cursor-pointer px-4 py-2 hover:bg-neutral-700 rounded"
                >
                    {option}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
);

const TimePicker: React.FC<TimePickerProps> = ({ value, onChange, className = '' }) => {
    // Parse the time string
    const [hour, minute] = value ? value.split(':') : ['', ''];

    // Handlers for individual changes
    const handleHourChange = (newHour: string) => {
        onChange(`${newHour}:${minute}`);
    };

    const handleMinuteChange = (newMinute: string) => {
        onChange(`${hour}:${newMinute}`);
    };

    const selectConfigs = [
        {
            value: hour,
            onChange: handleHourChange,
            options: HOURS,
            placeholder: 'Hour',
        },
        {
            value: minute,
            onChange: handleMinuteChange,
            options: MINUTES,
            placeholder: 'Minute',
        },
    ];

    return (
        <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">End Time</label>
            <div className={`flex gap-2 ${className}`}>
                {selectConfigs.map((config, index) => (
                    <TimeSelect
                        key={index}
                        value={config.value}
                        onValueChange={config.onChange}
                        options={config.options}
                        placeholder={config.placeholder}
                    />
                ))}
            </div>
        </div>
    );
};

export default TimePicker;