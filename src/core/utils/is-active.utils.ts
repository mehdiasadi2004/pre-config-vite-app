export const isActive = (pathname: string, path?: string) =>
  path
    ? path == "/panel/profile/edit"
      ? pathname.includes("panel/profile")
      : pathname.includes(path)
    : false;

