// List of allowed ZIP codes
// In production, this would come from a database or API
const ALLOWED_ZIP_CODES: string[] = [
  // Add your allowed ZIP codes here
  // Example: '12345', '67890'
];

export function isValidZipCode(zipCode: string): boolean {
  // Basic validation: 5 digits
  const zipRegex = /^\d{5}$/;
  if (!zipRegex.test(zipCode)) {
    return false;
  }

  // If no allowed ZIP codes are set, accept all valid ZIP codes
  if (ALLOWED_ZIP_CODES.length === 0) {
    return true;
  }

  // Check if ZIP code is in allowed list
  return ALLOWED_ZIP_CODES.includes(zipCode);
}

