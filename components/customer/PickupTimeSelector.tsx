'use client';

import { useState, useEffect } from 'react';
import { getAvailableTimeSlots, checkOrderCutoff } from '@/lib/utils/orderCutoff';

interface PickupTimeSelectorProps {
  selectedDate: string;
  selectedTime: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
}

export default function PickupTimeSelector({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
}: PickupTimeSelectorProps) {
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const minDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (selectedDate) {
      const date = new Date(selectedDate);
      const times = getAvailableTimeSlots(date);
      setAvailableTimes(times);
      
      // Reset time if current selection is not available
      if (selectedTime && !times.includes(selectedTime)) {
        onTimeChange('');
      }
    }
  }, [selectedDate, selectedTime, onTimeChange]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Pickup Date</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
          min={minDate}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          required
        />
      </div>

      {selectedDate && (
        <div>
          <label className="block text-sm font-medium mb-2">Pickup Time</label>
          {availableTimes.length > 0 ? (
            <select
              value={selectedTime}
              onChange={(e) => onTimeChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Select a time</option>
              {availableTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          ) : (
            <p className="text-sm text-gray-500">
              No available times for this date. Please select another date.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

