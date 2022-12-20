/* eslint-disable import/prefer-default-export */
export function GetTime(time: string) {
  const Time = new Date(time);
  return `${Time.getDate()}-${Time.getMonth() + 1}-${Time.getFullYear()}`;
}
