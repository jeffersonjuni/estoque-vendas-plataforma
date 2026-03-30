import { getServerSession } from "next-auth";
import { authConfig } from "./auth-config";

export function getAuthSession() {
  return getServerSession(authConfig);
}