import type { SectionKey } from "@/features/ifu-wizard/types";

export interface MockSectionContent {
  isComplete: boolean;
  fields: Record<string, string>;
}

/** Demo document content; keys missing here are "not started". */
export const MOCK_SECTION_CONTENT: Partial<Record<SectionKey, MockSectionContent>> = {
  device_description: {
    isComplete: true,
    fields: {
      description:
        "The OrthoFix Cortical Bone Screw is a sterile, single-use, self-tapping screw for internal fixation of long-bone fractures. It is used together with OrthoFix locking and non-locking plates.",
      components: "One (1) cortical bone screw, 3.5 mm diameter, supplied in a double sterile barrier pouch.",
      materials: "Titanium alloy Ti-6Al-4V ELI conforming to ISO 5832-3.",
    },
  },
  intended_use: {
    isComplete: true,
    fields: {
      intendedUse:
        "The device is intended for fixation of fractures, osteotomies and non-unions of long bones, used with compatible OrthoFix bone plates.",
      intendedUser: "Orthopaedic and trauma surgeons trained in internal fixation techniques.",
      population: "Adult patients with skeletally mature bone.",
    },
  },
  indications_contraindications: {
    isComplete: true,
    fields: {
      indications: "Fractures of the humerus, radius, ulna, femur and tibia requiring internal fixation; osteotomies; non-unions and mal-unions.",
      contraindications:
        "Active or suspected infection at the implant site; known sensitivity to titanium alloy; insufficient bone quantity or quality to support the implant.",
    },
  },
  warnings_precautions: {
    isComplete: true,
    fields: {
      warnings:
        "For single use only. Do not reuse. Reuse may cause device failure or cross-infection. Do not use if the package is opened or damaged.",
      precautions: "Use only with compatible OrthoFix instruments and plates. Do not bend or modify the screw.",
      residualRisks: "",
    },
  },
  instructions_for_use: {
    isComplete: true,
    fields: {
      preparation: "Inspect the sterile pouch for damage and check the use-by date before opening.",
      steps:
        "1. Pre-drill using the 2.5 mm drill bit and drill guide.\n2. Measure screw length with the depth gauge.\n3. Insert the screw using the hexagonal screwdriver until the head seats on the plate.",
      afterUse: "Dispose of packaging as per local regulations.",
    },
  },
  sterilisation: {
    isComplete: false,
    fields: { statement: "Sterile unless package is opened or damaged. Do not resterilise." },
  },
};

export const MOCK_STRUCTURED = {
  storage: { tempMin: 15, tempMax: 30, humidity: 75, lightSensitive: false },
  sterilisationMethod: "GAMMA",
  shelfLifeMonths: 60,
} as const;
