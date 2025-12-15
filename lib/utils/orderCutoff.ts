import { addHours, setHours, setMinutes, format } from 'date-fns';

interface BusinessHours {
  open: string; // "09:00"
  close: string; // "17:00"
  cutoffHours: number; // Hours before opening that orders must be placed
}

const DEFAULT_BUSINESS_HOURS: BusinessHours = {
  open: '09:00',
  close: '17:00',
  cutoffHours: 2, // Orders must be placed 2 hours before opening
};

export function checkOrderCutoff(
  selectedDate: Date,
  selectedTime: string,
  businessHours: BusinessHours = DEFAULT_BUSINESS_HOURS
): boolean {
  const now = new Date();
  const [hours, minutes] = selectedTime.split(':').map(Number);
  const pickupDateTime = setMinutes(setHours(selectedDate, hours), minutes);

  // Check if pickup time is in the past
  if (pickupDateTime < now) {
    return false;
  }

  // Calculate cutoff time (business open time - cutoff hours)
  const [openHours, openMinutes] = businessHours.open.split(':').map(Number);
  const openTime = setMinutes(setHours(selectedDate, openHours), openMinutes);
  const cutoffTime = addHours(openTime, -businessHours.cutoffHours);

  // Check if current time is after cutoff (meaning it's too late to order)
  return now > cutoffTime;
}

export function getAvailableTimeSlots(
  selectedDate: Date,
  businessHours: BusinessHours = DEFAULT_BUSINESS_HOURS
): string[] {
  const slots: string[] = [];
  const [openHours, openMinutes] = businessHours.open.split(':').map(Number);
  const [closeHours, closeMinutes] = businessHours.close.split(':').map(Number);

  const startTime = setMinutes(setHours(selectedDate, openHours), openMinutes);
  const endTime = setMinutes(setHours(selectedDate, closeHours), closeMinutes);

  let currentTime = startTime;
  const intervalMinutes = 30; // 30-minute intervals

  while (currentTime < endTime) {
    slots.push(format(currentTime, 'HH:mm'));
    currentTime = addHours(currentTime, intervalMinutes / 60);
  }

  return slots;
}

