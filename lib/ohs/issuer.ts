export type Issuer = {
  name: string;
  signedBy: string;
  title: string;
  logoDataUrl: string;
  signatureDataUrl: string;
  signatureTyped: string;
};

const KEY = "proven-issuer-v1";

export const EMPTY_ISSUER: Issuer = {
  name: "",
  signedBy: "",
  title: "",
  logoDataUrl: "",
  signatureDataUrl: "",
  signatureTyped: "",
};

export function loadIssuer(): Issuer {
  if (typeof window === "undefined") return EMPTY_ISSUER;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return EMPTY_ISSUER;
    const parsed = JSON.parse(raw) as Partial<Issuer>;
    return { ...EMPTY_ISSUER, ...parsed };
  } catch {
    return EMPTY_ISSUER;
  }
}

export function saveIssuer(issuer: Issuer) {
  localStorage.setItem(KEY, JSON.stringify(issuer));
  return issuer;
}

export function issuerHasBrand(issuer: Issuer) {
  return Boolean(issuer.name || issuer.logoDataUrl);
}

export function issuerHasSign(issuer: Issuer) {
  return Boolean(
    issuer.signedBy || issuer.signatureDataUrl || issuer.signatureTyped,
  );
}

export function fileToDataUrl(file: File, max = 480): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(img.width * scale));
      canvas.height = Math.max(1, Math.round(img.height * scale));
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("canvas"));
        return;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("image"));
    };
    img.src = url;
  });
}
