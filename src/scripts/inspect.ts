// Features call inspect() when someone uses them; the inspection log listens.
import type { InspectionId } from "../data/inspections";

export const inspect = (id: InspectionId) => {
  document.dispatchEvent(new CustomEvent<InspectionId>("inspect", { detail: id }));
};
