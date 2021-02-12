export default function getKeys(hashmap: any) {
  return Object.keys(hashmap).map((key) => Number(key));
}
