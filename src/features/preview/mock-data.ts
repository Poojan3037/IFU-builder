import type { SectionKey } from "@/features/ifu-wizard/types";

/** Filler text for sections/fields the demo document hasn't written yet, so the preview reads like a finished IFU. */
export const PREVIEW_FALLBACK_CONTENT: Partial<Record<SectionKey, Record<string, string>>> = {
  warnings_precautions: {
    residualRisks:
      "Residual risks include loosening, breakage or migration of the implant, delayed union, and local tissue reaction. To be used only by or under the supervision of a qualified healthcare professional.",
  },
  sterilisation: {
    statement:
      "Sterile unless package is opened or damaged. Do not use if the sterile barrier is compromised or the use-by date has passed. For single use only. Do not resterilise.",
  },
  implant_card: {
    patientInfo:
      "This screw stays in your body to hold the bone in place while it heals. Tell your doctor if you notice increasing pain, swelling or redness at the operation site. Carry your implant card and show it before any medical procedure.",
    implantCard:
      "The implant card records the device name, model OF-CS-35, lot number, date of implantation and the name of the hospital and surgeon. It is supplied with each pack and completed by the hospital.",
    mriSafety:
      "MR Conditional. A patient with this device can be scanned safely in a 1.5 T or 3 T MR system under the conditions given in the MRI safety information. Expected lifetime: the device is intended to remain implanted permanently unless removal is clinically indicated.",
  },
  storage: {
    handling: "Keep dry and away from direct sunlight. Do not freeze. Handle the pouch with care to avoid puncturing the sterile barrier.",
  },
  disposal: {
    disposal:
      "Dispose of used or explanted devices and contaminated packaging as bio-medical waste in accordance with the Bio-Medical Waste Management Rules, 2016. Unopened outer cartons may be recycled as paper waste.",
  },
  vigilance: {
    reporting:
      "Report any serious incident involving this device to Sanjeevani MedTech Pvt. Ltd. at care@sanjeevanimedtech.in or +91 40 4012 3456, and to the Materiovigilance Programme of India (MvPI), Indian Pharmacopoeia Commission, via the MvPI helpline 1800-180-3024 or the online Medical Device Adverse Event Reporting Form.",
  },
};

export const STERILISATION_METHOD_LABELS: Record<string, string> = {
  EO: "ethylene oxide",
  GAMMA: "gamma irradiation",
  STEAM: "moist heat (steam)",
  E_BEAM: "electron beam irradiation",
};
