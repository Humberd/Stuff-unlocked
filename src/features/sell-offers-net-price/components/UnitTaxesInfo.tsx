import {
  type ExternalProperty,
  useExternalProperty,
} from "../../../hooks/external-property";
import type { MountOptions } from "../../../utils/render";
import type { UnitTaxes } from "../sell-offers-scope";

export const unitTaxesInfoMountOptions: MountOptions = {
  tagName: "span",
  position: "append",
};

export const UnitTaxesInfo = (props: {
  unitTaxes: ExternalProperty<UnitTaxes | undefined>;
}) => {
  const unitTaxes = useExternalProperty(props.unitTaxes);
  // The game shows the tax per unit itself
  return (
    <>
      <br />
      <span>Net / unit: </span>
      <span>{unitTaxes?.net.toFixed(4)}</span>
      <br />
    </>
  );
};
