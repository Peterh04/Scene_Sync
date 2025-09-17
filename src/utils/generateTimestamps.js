export default function generateTimestamps(runtime) {
  if (runtime > 60) {
    const min = runtime % 60;
    const hour = Math.floor(runtime / 60);
    return `${hour}h ${min}min`;
  }
  return `${runtime}min`;
}
