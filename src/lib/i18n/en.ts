export const en = {
  app: { name: "IFU Builder" },
  common: {
    save: "Save",
    cancel: "Cancel",
    back: "Back",
    continue: "Continue",
    delete: "Delete",
    loading: "Loading…",
  },
  errors: {
    generic: "Something went wrong. Please try again.",
    unauthenticated: "Please log in to continue.",
    notFound: "We couldn't find that.",
    validation: "Please check the highlighted fields.",
    rateLimited: "Too many attempts. Please try again later.",
  },
  auth: {
    loginFailed: "Email or password is incorrect.",
    signupFailed: "We couldn't create that account. Try logging in instead.",
  },
} as const;

export type Messages = typeof en;
