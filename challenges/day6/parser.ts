export type TemporaryMap = {
  [key: string]: { children: string[] }
}

export const parseInput = (input: string[]) => {
  return input.reduce((res, item): TemporaryMap => {
    const [orbited, object] = item.split(')');
    if (res[orbited]) {
      res[orbited].children.push(object);
    } else {
      res[orbited] = { children: [object] };
    }
    return res;
  }, {} as TemporaryMap);
}
