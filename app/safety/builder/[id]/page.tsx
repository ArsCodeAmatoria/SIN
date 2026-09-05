"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BuilderApp } from "@/components/form-builder/BuilderApp";
import { getTemplate } from "@/lib/form-builder/templates";
import { getLocalForm } from "@/lib/form-builder/store";
import type { FormDef } from "@/lib/form-builder/types";

export default function BuilderFormPage() {
  const params = useParams<{ id: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [form, setForm] = useState<FormDef | null | undefined>(undefined);

  useEffect(() => {
    const t = getTemplate(id);
    if (t) {
      setForm(t);
      return;
    }
    setForm(getLocalForm(id) ?? null);
  }, [id]);

  if (form === undefined) {
    return (
      <article className="doc-body">
        <p className="mono steel">LOADING</p>
      </article>
    );
  }
  if (!form) {
    return (
      <article className="doc-body">
        <p className="mono steel">FORM BUILDER</p>
        <h1 className="display">NOT FOUND</h1>
        <p className="lede mt">That form is not on this device.</p>
      </article>
    );
  }
  return <BuilderApp initial={form} />;
}
