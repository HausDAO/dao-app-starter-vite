import { CustomFormLego } from "./fieldConfig";
import { APP_FIELD } from "./fields";
import { APP_TX } from "./tx";

export const APP_FORM: Record<string, CustomFormLego> = {
  CREATEJAR: {
    id: "CREATEJAR",
    title: "Create Jar (coming soon)",
    subtitle: "Choose from a variety of jar types",
    description: "A cookie jar is a jar that holds cookies.",
    requiredFields: { title: true },
    log: true,
    tx: APP_TX.CREATEJAR,
    fields: [APP_FIELD.TITLE, APP_FIELD.JARTYPE],
  },
};
