import { TattooType } from '@/types/booking'

// Available time slots
export const TIME_SLOTS = [
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', 
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30', '19:00',
]

// Duration options in minutes
export interface DurationOption {
  value: number
  label: string
}

export const DURATION_OPTIONS: DurationOption[] = [
  { value: 30, label: '30 minutes - Quick Consultation' },
  { value: 60, label: '1 hour - Small Tattoo' },
  { value: 120, label: '2 hours - Medium Tattoo' },
  { value: 240, label: '4 hours - Large Tattoo' },
  { value: 480, label: '8 hours - Full Day Session' },
]

// Tattoo types
export interface TattooTypeOption {
  value: TattooType
  label: string
}

export const TATTOO_TYPES: TattooTypeOption[] = [
  { value: 'NEW_TATTOO', label: 'New Tattoo' },
  { value: 'TOUCH_UP', label: 'Touch-Up' },
  { value: 'COVER_UP', label: 'Cover-Up' },
  { value: 'CONSULTATION', label: 'Consultation Only' },
]

// Body parts
export const BODY_PARTS = [
  'Arm', 'Forearm', 'Bicep', 'Shoulder', 'Back', 'Chest',
  'Stomach', 'Thigh', 'Calf', 'Ankle', 'Foot', 'Hand',
  'Neck', 'Head', 'Face', 'Ribs', 'Hip', 'Other',
]
