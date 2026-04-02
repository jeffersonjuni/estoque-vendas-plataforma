import clsx from "clsx";
import { CheckCircle2, XCircle } from "lucide-react";

import { getPasswordValidation } from "@/lib/password-validation";

type PasswordRequirementsProps = {
  password: string;
};

export function PasswordRequirements({
  password,
}: PasswordRequirementsProps) {
  const validation = getPasswordValidation(password);

  const items = [
    {
      label: "Pelo menos 8 caracteres",
      valid: validation.minLength,
    },
    {
      label: "Uma letra maiúscula",
      valid: validation.uppercase,
    },
    {
      label: "Um número",
      valid: validation.number,
    },
    {
      label: "Um caractere especial",
      valid: validation.specialChar,
    },
  ];

  return (
    <div className="rounded-xl border border-border bg-muted/40 p-4">
      <p className="mb-3 text-sm font-medium text-foreground">
        Requisitos da senha
      </p>

      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.label}
            className={clsx(
              "flex items-center gap-2 text-sm",
              item.valid ? "text-success" : "text-muted-foreground"
            )}
          >
            {item.valid ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <XCircle className="h-4 w-4" />
            )}
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}