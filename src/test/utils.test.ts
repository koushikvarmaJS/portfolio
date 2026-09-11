import { describe, it, expect } from "vitest";
import { getPublicPath } from "@/lib/utils";

describe("getPublicPath", () => {
  it("prefixes the base path onto local public/ assets", () => {
    expect(getPublicPath("/IMG_1911.jpg")).toBe(`${import.meta.env.BASE_URL}IMG_1911.jpg`);
    expect(getPublicPath("gibli.png")).toBe(`${import.meta.env.BASE_URL}gibli.png`);
  });

  it("leaves externally hosted URLs untouched", () => {
    const s3 = "https://personal-bucket-kb.s3.us-east-1.amazonaws.com/koushik_resume.pdf";
    expect(getPublicPath(s3)).toBe(s3);
    expect(getPublicPath("http://example.com/a.pdf")).toBe("http://example.com/a.pdf");
    expect(getPublicPath("//cdn.example.com/a.png")).toBe("//cdn.example.com/a.png");
  });

  it("does not mangle data URIs", () => {
    const uri = "data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=";
    expect(getPublicPath(uri)).toBe(uri);
  });
});
