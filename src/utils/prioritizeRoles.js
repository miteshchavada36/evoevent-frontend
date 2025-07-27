export const prioritizeRoles = (users) => {
  const priorityRoles = ["Member Secretary", "Additional Regional Coordinator"];

  return users.sort((a, b) => {
    const aRole = a?.Role?.name || "";
    const bRole = b?.Role?.name || "";

    const aPriority = priorityRoles.includes(aRole) ? 1 : 0;
    const bPriority = priorityRoles.includes(bRole) ? 1 : 0;

    if (aPriority !== bPriority) {
      return bPriority - aPriority;
    }

    return a.first_name.localeCompare(b.first_name);
  });
};
