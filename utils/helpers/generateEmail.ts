export function generateRandomEmail(domain: string = 'gmail.com') {
  const randomString = Math.random().toString(36).substring(2, 10); // 'f4k1z9xq'
  return `popovich.vitaliy+${randomString}@${domain}`;
}