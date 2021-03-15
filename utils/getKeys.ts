export default function getKeys(hashmap: any) {
  return hashmap ? Object.keys(hashmap).map((key) => Number(key)) : [];
}
