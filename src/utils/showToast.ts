import { toast } from "sonner";

export const showToast = (
  type: "success" | "error" | "info",
  title: string,
  description?: string,
) => {
  toast[type](title, { description });
};
