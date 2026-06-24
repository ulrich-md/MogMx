import { useRef, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import { Check, WhatsappLogo } from "@phosphor-icons/react";
import { Button } from "../ui/Button";
import { projectTypes, whatsappHref } from "@/lib/site";

type Values = {
  nombre: string;
  empresa: string;
  correo: string;
  telefono: string;
  tipo: string;
  mensaje: string;
};
type Errors = Partial<Record<keyof Values, string>>;
type Status = "idle" | "submitting" | "success";

const ERROR = "#C0362C"; // functional error color (not the brand accent)

const slugToType: Record<string, string> = {
  "maquila-agua-mineral": "Maquila de agua mineral",
  embotellado: "Embotellado de agua purificada",
  "marca-privada": "Marca privada / private label",
  "desarrollo-formulacion": "Desarrollo de producto",
  "lineas-envasado": "Otro",
  "etiquetado-empaque": "Otro",
};

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.nombre.trim()) e.nombre = "Escribe tu nombre.";
  if (!v.correo.trim()) e.correo = "Escribe tu correo.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.correo))
    e.correo = "Revisa el formato del correo.";
  if (v.telefono.trim() && v.telefono.replace(/\D/g, "").length < 7)
    e.telefono = "Revisa el número de teléfono.";
  if (!v.mensaje.trim()) e.mensaje = "Cuéntanos brevemente tu proyecto.";
  return e;
}

const inputBase =
  "w-full rounded-input border bg-white px-4 py-3 text-[15px] text-navy placeholder:text-slate/70 transition-colors focus:outline-none focus:ring-2";

function Field({
  id,
  label,
  required,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-navy">
        {label}
        {required ? (
          <span className="text-blue-deep" aria-hidden="true">
            {" "}
            *
          </span>
        ) : null}
      </label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 text-[13px] font-medium"
          style={{ color: ERROR }}
        >
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-[13px] text-slate">{hint}</p>
      ) : null}
    </div>
  );
}

export function QuoteForm() {
  const [params] = useSearchParams();
  const presetTipo =
    slugToType[params.get("servicio") ?? ""] ?? projectTypes[0];

  const [values, setValues] = useState<Values>({
    nombre: "",
    empresa: "",
    correo: "",
    telefono: "",
    tipo: presetTipo,
    mensaje: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const update =
    (k: keyof Values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setValues((s) => ({ ...s, [k]: e.target.value }));

  const onBlur = (k: keyof Values) => () =>
    setErrors(validate({ ...values }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    const firstInvalid = Object.keys(errs)[0];
    if (firstInvalid) {
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
        ?.focus();
      return;
    }
    setStatus("submitting");
    // Simulated submit (no backend). // EDITABLE: conectar a tu endpoint / email.
    window.setTimeout(() => setStatus("success"), 1200);
  };

  if (status === "success") {
    return (
      <div className="rounded-card bg-white p-8 text-center shadow-soft ring-1 ring-line sm:p-10">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-mist text-blue">
          <Check size={28} weight="bold" />
        </span>
        <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-navy">
          ¡Gracias! Recibimos tu solicitud
        </h3>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-slate">
          Un miembro de nuestro equipo te contactará para preparar tu cotización.
          Si lo prefieres, escríbenos directo por WhatsApp.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button
            href={whatsappHref("Hola, acabo de enviar una solicitud de cotización.")}
            target="_blank"
            variant="primary"
          >
            <span className="inline-flex items-center gap-2">
              <WhatsappLogo size={18} weight="fill" />
              Escribir por WhatsApp
            </span>
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setStatus("idle");
              setValues({
                nombre: "",
                empresa: "",
                correo: "",
                telefono: "",
                tipo: presetTipo,
                mensaje: "",
              });
            }}
          >
            Enviar otra solicitud
          </Button>
        </div>
      </div>
    );
  }

  const ring = (k: keyof Values) =>
    errors[k]
      ? "border-[#C0362C] focus:ring-[#C0362C]/25"
      : "border-line focus:border-aqua focus:ring-aqua/25";

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="rounded-card bg-white p-6 shadow-soft ring-1 ring-line sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="nombre" label="Nombre" required error={errors.nombre}>
          <input
            id="nombre"
            name="nombre"
            type="text"
            autoComplete="name"
            value={values.nombre}
            onChange={update("nombre")}
            onBlur={onBlur("nombre")}
            aria-invalid={!!errors.nombre}
            aria-describedby={errors.nombre ? "nombre-error" : undefined}
            placeholder="Tu nombre"
            className={`${inputBase} ${ring("nombre")}`}
          />
        </Field>

        <Field id="empresa" label="Empresa" hint="Opcional">
          <input
            id="empresa"
            name="empresa"
            type="text"
            autoComplete="organization"
            value={values.empresa}
            onChange={update("empresa")}
            placeholder="Nombre de tu empresa o marca"
            className={`${inputBase} ${ring("empresa")}`}
          />
        </Field>

        <Field id="correo" label="Correo" required error={errors.correo}>
          <input
            id="correo"
            name="correo"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.correo}
            onChange={update("correo")}
            onBlur={onBlur("correo")}
            aria-invalid={!!errors.correo}
            aria-describedby={errors.correo ? "correo-error" : undefined}
            placeholder="tu@empresa.com"
            className={`${inputBase} ${ring("correo")}`}
          />
        </Field>

        <Field
          id="telefono"
          label="Teléfono"
          error={errors.telefono}
          hint={errors.telefono ? undefined : "Opcional"}
        >
          <input
            id="telefono"
            name="telefono"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.telefono}
            onChange={update("telefono")}
            onBlur={onBlur("telefono")}
            aria-invalid={!!errors.telefono}
            aria-describedby={errors.telefono ? "telefono-error" : undefined}
            placeholder="+52 238 000 0000"
            className={`${inputBase} ${ring("telefono")}`}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field id="tipo" label="Tipo de proyecto">
          <select
            id="tipo"
            name="tipo"
            value={values.tipo}
            onChange={update("tipo")}
            className={`${inputBase} ${ring("tipo")} appearance-none bg-[length:18px] bg-[right_1rem_center] bg-no-repeat pr-12`}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 256 256' fill='%235B6B78'%3E%3Cpath d='M213.66 101.66l-80 80a8 8 0 0 1-11.32 0l-80-80a8 8 0 0 1 11.32-11.32L128 164.69l74.34-74.35a8 8 0 0 1 11.32 11.32Z'/%3E%3C/svg%3E\")",
            }}
          >
            {projectTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field id="mensaje" label="Mensaje" required error={errors.mensaje}>
          <textarea
            id="mensaje"
            name="mensaje"
            rows={5}
            value={values.mensaje}
            onChange={update("mensaje")}
            onBlur={onBlur("mensaje")}
            aria-invalid={!!errors.mensaje}
            aria-describedby={errors.mensaje ? "mensaje-error" : undefined}
            placeholder="Cuéntanos sobre tu marca, tipo de agua, formato y volumen estimado."
            className={`${inputBase} ${ring("mensaje")} resize-y`}
          />
        </Field>
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" withArrow disabled={status === "submitting"}>
          {status === "submitting" ? "Enviando..." : "Enviar solicitud"}
        </Button>
        {/* EDITABLE: enlazar aviso de privacidad real */}
        <p className="max-w-xs text-[12.5px] leading-relaxed text-slate">
          Al enviar, aceptas que te contactemos sobre tu solicitud.
        </p>
      </div>
    </form>
  );
}
